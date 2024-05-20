import WebSocket from 'isomorphic-ws';

import { BaseWebsocketClient, EmittableEvent } from './lib/BaseWSClient.js';
import { neverGuard } from './lib/misc-util.js';
import { MessageEventLike } from './lib/requestUtils.js';
import { signMessage } from './lib/webCryptoAPI.js';
import {
  WS_BASE_URL_MAP,
  WS_KEY_MAP,
  WsKey,
} from './lib/websocket/websocket-util.js';
import { WsMarket } from './types/websockets/client.js';
import {
  WsOperation,
  WsRequestOperation,
} from './types/websockets/requests.js';

export const WS_LOGGER_CATEGORY = { category: 'woo-ws' };

/** Any WS keys in this list will trigger auth on connect, if credentials are available */
const PRIVATE_WS_KEYS: WsKey[] = [WS_KEY_MAP.privateV1];

/** Any WS keys in this list will ALWAYS skip the authentication process, even if credentials are available */
export const PUBLIC_WS_KEYS: WsKey[] = [WS_KEY_MAP.publicV1];

/**
 * WS topics are always a string for woo. Some exchanges use complex objects
 */
export type WsTopic =
  | 'balance'
  | 'executionreport'
  | 'algoexecutionreportv2'
  | 'position'
  | 'marginassignment';

export class WebsocketClient extends BaseWebsocketClient<
  WsMarket,
  WsKey,
  WsTopic
> {
  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<WebSocket | undefined>[] {
    return [
      this.connect(WS_KEY_MAP.publicV1),
      this.connect(WS_KEY_MAP.privateV1),
    ];
  }

  /**
   * Request subscription to one or more topics.
   *
   * - Subscriptions are automatically routed to the correct websocket connection.
   * - Authentication/connection is automatic.
   * - Resubscribe after network issues is automatic.
   *
   * Call `unsubscribe(topics)` to remove topics
   */
  public subscribe(topics: WsTopic[]) {
    const topicsByWsKey = this.arrangeTopicsIntoWsKeyGroups(topics);

    for (const untypedWsKey in topicsByWsKey) {
      const typedWsKey = untypedWsKey as WsKey;
      const topics = topicsByWsKey[typedWsKey];

      if (topics.length) {
        this.subscribeTopicsForWsKey(topics, typedWsKey);
      }
    }
  }

  /**
   * Unsubscribe from one or more topics.
   *
   * - Requests are automatically routed to the correct websocket connection.
   * - These topics will be removed from the topic cache, so they won't be subscribed to again.
   */
  public unsubscribe(topics: WsTopic[]) {
    const topicsByWsKey = this.arrangeTopicsIntoWsKeyGroups(topics);

    for (const untypedWsKey in topicsByWsKey) {
      const typedWsKey = untypedWsKey as WsKey;
      const topics = topicsByWsKey[typedWsKey];

      if (topics.length) {
        this.unsubscribeTopicsForWsKey(topics, typedWsKey);
      }
    }
  }

  /**
   *
   * Internal methods
   *
   */

  protected sendPingEvent(wsKey: WsKey) {
    switch (wsKey) {
      case WS_KEY_MAP.publicV1:
      case WS_KEY_MAP.privateV1: {
        return this.tryWsSend(wsKey, '{"event":"ping"}');
      }
      default: {
        throw neverGuard(wsKey, `Unhandled ping format: "${wsKey}"`);
      }
    }
  }

  protected sendPongEvent(wsKey: WsKey) {
    switch (wsKey) {
      case WS_KEY_MAP.publicV1:
      case WS_KEY_MAP.privateV1: {
        return this.tryWsSend(wsKey, '{"event":"pong"}');
      }
      default: {
        throw neverGuard(wsKey, `Unhandled ping format: "${wsKey}"`);
      }
    }
  }

  protected isWsPing(msg: any): boolean {
    if (typeof msg?.data === 'string' && msg.data.includes('"event":"ping"')) {
      return true;
    }
    // this.logger.info(`Not a ping: `, {
    //   data: msg?.data,
    //   type: typeof msg?.data,
    // });

    return false;
  }

  protected isWsPong(msg: any): boolean {
    if (typeof msg?.data === 'string' && msg.data.includes('"event":"pong"')) {
      return true;
    }

    return false;
  }

  protected resolveEmittableEvents(event: MessageEventLike): EmittableEvent[] {
    const results: EmittableEvent[] = [];

    try {
      const parsed = JSON.parse(event.data);

      const responseEvents = ['subscribe', 'unsubscribe'];
      const authenticatedEvents = ['auth'];

      const eventAction = parsed.event || parsed.action;
      if (typeof eventAction === 'string') {
        if (parsed.success === false) {
          results.push({
            eventType: 'exception',
            event: parsed,
          });
          return results;
        }

        // These are request/reply pattern events (e.g. after subscribing to topics or authenticating)
        if (responseEvents.includes(eventAction)) {
          results.push({
            eventType: 'response',
            event: parsed,
          });
          return results;
        }

        // Request/reply pattern for authentication success
        if (authenticatedEvents.includes(eventAction)) {
          results.push({
            eventType: 'authenticated',
            event: parsed,
          });
          return results;
        }

        // if (eventAction === 'ping') {
        //   this.logger.trace('Received ping - preparing pong', {
        //     ...WS_LOGGER_CATEGORY,
        //     wsKey,
        //   });
        //   this.sendPongEvent(wsKey, ws);
        //   return;
        // }

        this.logger.error(
          `!! Unhandled string event type "${eventAction}. Defaulting to "update" channel...`,
          parsed,
        );
      }

      results.push({
        eventType: 'update',
        event: parsed,
      });
    } catch (e) {
      results.push({
        event: {
          message: 'Failed to parse event data due to exception',
          exception: e,
          eventData: event.data,
        },
        eventType: 'exception',
      });

      this.logger.error(`Failed to parse event data due to exception: `, {
        exception: e,
        eventData: event.data,
      });
    }

    return results;
  }

  /**
   * Determines if a topic is for a private channel, using a hardcoded list of strings
   */
  protected isPrivateChannel(topic: WsTopic): boolean {
    const topicName = topic.toLowerCase();
    const privateTopics = [
      'balance',
      'executionreport',
      'algoexecutionreportv2',
      'position',
      'marginassignment',
    ];

    if (topicName && privateTopics.includes(topicName)) {
      return true;
    }

    return false;
  }

  protected getWsKeyForMarket(_market: WsMarket, isPrivate: boolean): WsKey {
    return isPrivate ? WS_KEY_MAP.privateV1 : WS_KEY_MAP.publicV1;
  }

  protected getWsMarketForWsKey(key: WsKey): WsMarket {
    switch (key) {
      case 'publicV1':
      case 'privateV1': {
        return 'all';
      }
      default: {
        throw neverGuard(key, `Unhandled ws key "${key}"`);
      }
    }
  }

  protected getWsKeyForTopic(topic: WsTopic): WsKey {
    const market = this.getMarketForTopic(topic);
    const isPrivateTopic = this.isPrivateChannel(topic);

    return this.getWsKeyForMarket(market, isPrivateTopic);
  }

  protected getPrivateWSKeys(): WsKey[] {
    return PRIVATE_WS_KEYS;
  }

  protected getWsUrl(wsKey: WsKey): string {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const applicationId = this.options.apiApplicationId;
    const networkKey = 'livenet';

    switch (wsKey) {
      case WS_KEY_MAP.publicV1: {
        return WS_BASE_URL_MAP.publicV1.all[networkKey] + '/' + applicationId;
      }
      case WS_KEY_MAP.privateV1: {
        return WS_BASE_URL_MAP.privateV1.all[networkKey] + '/' + applicationId;
      }
      default: {
        this.logger.error('getWsUrl(): Unhandled wsKey: ', {
          ...WS_LOGGER_CATEGORY,
          wsKey,
        });
        throw neverGuard(wsKey, `getWsUrl(): Unhandled wsKey`);
      }
    }
  }

  /** Force subscription requests to be sent in smaller batches, if a number is returned */
  protected getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
    switch (wsKey) {
      case 'publicV1':
      case 'privateV1': {
        // Return a number if there's a limit on the number of sub topics per rq
        return 1;
      }
      default: {
        throw neverGuard(wsKey, `getWsKeyForTopic(): Unhandled wsKey`);
      }
    }
  }

  /**
   * Map one or more topics into fully prepared "subscribe request" events (already stringified and ready to send)
   */
  protected getWsSubscribeEventsForTopics(
    topics: WsTopic[],
    wsKey: WsKey,
  ): string[] {
    // console.log(new Date(), `called getWsSubscribeEventsForTopics()`, topics);
    // console.trace();
    if (!topics.length) {
      return [];
    }

    const market = this.getWsMarketForWsKey(wsKey);

    const subscribeEvents: string[] = [];

    const maxTopicsPerEvent = this.getMaxTopicsPerSubscribeEvent(wsKey);
    if (
      maxTopicsPerEvent &&
      maxTopicsPerEvent !== null &&
      topics.length > maxTopicsPerEvent
    ) {
      for (let i = 0; i < topics.length; i += maxTopicsPerEvent) {
        const batch = topics.slice(i, i + maxTopicsPerEvent);
        const subscribeRequestEvents = this.getWsRequestEvent(
          market,
          'subscribe',
          batch,
        );

        for (const event of subscribeRequestEvents) {
          subscribeEvents.push(JSON.stringify(event));
        }
      }

      return subscribeEvents;
    }

    const subscribeRequestEvents = this.getWsRequestEvent(
      market,
      'subscribe',
      topics,
    );

    for (const event of subscribeRequestEvents) {
      subscribeEvents.push(JSON.stringify(event));
    }
    return subscribeEvents;
  }

  /**
   * Map one or more topics into fully prepared "unsubscribe request" events (already stringified and ready to send)
   */
  protected getWsUnsubscribeEventsForTopics(
    topics: WsTopic[],
    wsKey: WsKey,
  ): string[] {
    if (!topics.length) {
      return [];
    }

    const market = this.getWsMarketForWsKey(wsKey);

    const subscribeEvents: string[] = [];

    const maxTopicsPerEvent = this.getMaxTopicsPerSubscribeEvent(wsKey);
    if (
      maxTopicsPerEvent &&
      maxTopicsPerEvent !== null &&
      topics.length > maxTopicsPerEvent
    ) {
      for (let i = 0; i < topics.length; i += maxTopicsPerEvent) {
        const batch = topics.slice(i, i + maxTopicsPerEvent);
        const subscribeRequestEvents = this.getWsRequestEvent(
          market,
          'unsubscribe',
          batch,
        );

        for (const event of subscribeRequestEvents) {
          subscribeEvents.push(JSON.stringify(event));
        }
      }

      return subscribeEvents;
    }

    const subscribeRequestEvents = this.getWsRequestEvent(
      market,
      'unsubscribe',
      topics,
    );
    for (const event of subscribeRequestEvents) {
      subscribeEvents.push(JSON.stringify(event));
    }
    return subscribeEvents;
  }

  /**
   * @returns a correctly structured events for performing an operation over WS. This can vary per exchange spec.
   */
  private getWsRequestEvent(
    market: WsMarket,
    operation: WsOperation,
    topics: WsTopic[],
  ): WsRequestOperation<WsTopic>[] {
    switch (market) {
      case 'all': {
        return topics.map((topic) => {
          const wsRequestEvent: WsRequestOperation<WsTopic> = {
            id: `${operation}_${topic}`,
            event: operation,
            topic: topic,
          };

          return wsRequestEvent;
        });
      }
      default: {
        throw neverGuard(market, `Unhandled market "${market}"`);
      }
    }
  }

  protected async getWsAuthRequestEvent(wsKey: WsKey): Promise<object> {
    const market = this.getWsMarketForWsKey(wsKey);
    if (
      !this.options.apiKey ||
      !this.options.apiSecret ||
      !this.options.apiApplicationId
    ) {
      throw new Error(
        `Cannot auth - missing api key, secret or memo in config`,
      );
    }

    const signTimestamp = Date.now() + this.options.recvWindow;
    const signMessageInput = `|${signTimestamp}`;

    let signature: string;
    if (typeof this.options.customSignMessageFn === 'function') {
      signature = await this.options.customSignMessageFn(
        signMessageInput,
        this.options.apiSecret,
      );
    } else {
      signature = await signMessage(
        signMessageInput,
        this.options.apiSecret,
        'hex',
        'SHA-512',
      );
    }

    switch (market) {
      case 'all': {
        const wsRequestEvent = {
          id: 'auth' + signTimestamp,
          event: 'auth',
          params: {
            apikey: this.options.apiKey,
            sign: signature,
            timestamp: signTimestamp,
          },
        };

        return wsRequestEvent;
      }
      default: {
        throw neverGuard(market, `Unhandled market "${market}"`);
      }
    }
  }

  /**
   * This exchange API is split into "markets" that behave differently (different base URLs).
   * The market can easily be resolved using the topic name.
   */
  private getMarketForTopic(topic: string): WsMarket {
    return 'all';

    throw new Error(`Could not resolve "market" for topic: "${topic}"`);
  }

  /**
   * Used to split sub/unsub logic by websocket connection
   */
  private arrangeTopicsIntoWsKeyGroups(
    topics: WsTopic[],
  ): Record<WsKey, WsTopic[]> {
    const topicsByWsKey: Record<WsKey, WsTopic[]> = {
      privateV1: [],
      publicV1: [],
    };

    for (const untypedTopic of topics) {
      const topic = untypedTopic as WsTopic;
      const wsKeyForTopic = this.getWsKeyForTopic(topic);

      const wsKeyTopicList = topicsByWsKey[wsKeyForTopic];
      if (!wsKeyTopicList.includes(topic)) {
        wsKeyTopicList.push(topic);
      }
    }

    return topicsByWsKey;
  }
}
