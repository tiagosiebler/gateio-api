import WebSocket from 'isomorphic-ws';

import { BaseWebsocketClient, EmittableEvent } from './lib/BaseWSClient.js';
import { neverGuard } from './lib/misc-util.js';
import { MessageEventLike } from './lib/requestUtils.js';
import { signMessage } from './lib/webCryptoAPI.js';
import {
  WS_BASE_URL_MAP,
  WS_KEY_MAP,
  WsKey,
  WsMarket,
  WsTopicRequest,
} from './lib/websocket/websocket-util.js';
import {
  WsOperation,
  WsRequestOperationGate,
} from './types/websockets/requests.js';

export const WS_LOGGER_CATEGORY = { category: 'gate-ws' };

/** Any WS keys in this list will trigger auth on connect, if credentials are available */
const PRIVATE_WS_KEYS: WsKey[] = [];

/** Any WS keys in this list will ALWAYS skip the authentication process, even if credentials are available */
export const PUBLIC_WS_KEYS: WsKey[] = [];

/**
 * WS topics are always a string for gate. Some exchanges use complex objects
 */
export type WsTopic = string;

// /**
//  * Used to split sub/unsub logic by websocket connection. Groups & dedupes requests into per-WsKey arrays
//  */
// function arrangeTopicsIntoWsKeyGroups(
//   requestOperations: WsRequest<WsTopic, WsOperation>[],
// ): Record<WsKey, WsRequest<WsTopic, WsOperation>[]> {
//   const topicsByWsKey: Record<WsKey, WsRequest<WsTopic, WsOperation>[]> = {
//     [WS_KEY_MAP.spotV4]: [],
//     [WS_KEY_MAP.perpFuturesUSDTV4]: [],
//     [WS_KEY_MAP.perpFuturesBTCV4]: [],
//     [WS_KEY_MAP.deliveryFuturesUSDTV4]: [],
//     [WS_KEY_MAP.deliveryFuturesBTCV4]: [],
//     [WS_KEY_MAP.optionsV4]: [],
//     [WS_KEY_MAP.announcementsV4]: [],
//   };

//   for (const request of requestOperations) {
//     const wsKeyForTopic = request.wsKey;

//     const requestsForWsKey = topicsByWsKey[wsKeyForTopic];

//     const requestAlreadyInList = requestsForWsKey.find((p) =>
//       isDeepObjectMatch(p, request),
//     );
//     if (!requestAlreadyInList) {
//       requestsForWsKey.push(request);
//     }
//   }

//   return topicsByWsKey;
// }

export class WebsocketClient extends BaseWebsocketClient<WsKey> {
  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<WebSocket | undefined>[] {
    return [
      this.connect(WS_KEY_MAP.spotV4),
      this.connect(WS_KEY_MAP.perpFuturesUSDTV4),
      this.connect(WS_KEY_MAP.deliveryFuturesUSDTV4),
      this.connect(WS_KEY_MAP.optionsV4),
      this.connect(WS_KEY_MAP.announcementsV4),
    ];
  }

  /**
   * Request subscription to one or more topics. Pass topics as either an array of strings, or array of objects (if the topic has parameters).
   * Objects should be formatted as {topic: string, params: object}.
   *
   * - Subscriptions are automatically routed to the correct websocket connection.
   * - Authentication/connection is automatic.
   * - Resubscribe after network issues is automatic.
   *
   * Call `unsubscribe(topics)` to remove topics
   */
  public subscribe(
    requests: (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ) {
    if (requests.length) {
      this.subscribeTopicsForWsKey(requests, wsKey);
    }
  }

  /**
   * Unsubscribe from one or more topics. Similar to subscribe() but in reverse.
   *
   * - Requests are automatically routed to the correct websocket connection.
   * - These topics will be removed from the topic cache, so they won't be subscribed to again.
   */
  public unsubscribe(
    requests: (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ) {
    if (requests.length) {
      this.unsubscribeTopicsForWsKey(requests, wsKey);
    }
  }

  /**
   *
   * Internal methods
   *
   */

  protected sendPingEvent(wsKey: WsKey) {
    return this.tryWsSend(wsKey, '{"event":"ping"}');
  }

  protected sendPongEvent(wsKey: WsKey) {
    return this.tryWsSend(wsKey, '{"event":"pong"}');
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

  /**
   * Parse incoming events into categories
   */
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
  protected isPrivateTopicRequest(request: WsTopicRequest<string>): boolean {
    const topicName = request?.topic?.toLowerCase();
    if (!topicName) {
      return false;
    }

    const privateTopics = [
      'todo',
      'todo',
      'todo',
      'todo',
      'todo',
      'todo',
      'todo',
    ];

    if (topicName && privateTopics.includes(topicName)) {
      return true;
    }

    return false;
  }

  /**
   * Not in use for gate.io
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getWsKeyForTopic(_topic: WsTopic): WsKey {
    return 'announcementsV4';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getWsMarketForWsKey(_wsKey: WsKey): WsMarket {
    return 'all';
  }

  /**
   * Not in use for gate.io
   */
  protected getPrivateWSKeys(): WsKey[] {
    return PRIVATE_WS_KEYS;
  }

  protected getWsUrl(wsKey: WsKey): string {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const useTestnet = this.options.useTestnet;
    const networkKey = useTestnet ? 'testnet' : 'livenet';

    const baseUrl = WS_BASE_URL_MAP[wsKey][networkKey];
    return baseUrl;
  }

  /** Force subscription requests to be sent in smaller batches, if a number is returned */
  protected getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
    switch (wsKey) {
      // case 'publicV1':
      // case 'privateV1': {
      //   // Return a number if there's a limit on the number of sub topics per rq
      //   return 1;
      // }
      default: {
        return 1;
        // throw neverGuard(wsKey, `getWsKeyForTopic(): Unhandled wsKey`);
      }
    }
  }

  /**
   * Map one or more topics into fully prepared "subscribe request" events (already stringified and ready to send)
   */
  protected getWsOperationEventsForTopics(
    topics: WsTopicRequest<string>[],
    wsKey: WsKey,
    operation: WsOperation,
  ): string[] {
    // console.log(new Date(), `called getWsSubscribeEventsForTopics()`, topics);
    // console.trace();
    if (!topics.length) {
      return [];
    }

    // Events that are ready to send (usually stringified JSON)
    const jsonStringEvents: string[] = [];

    const market = this.getWsMarketForWsKey(wsKey);
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
          operation,
          batch,
        );

        for (const event of subscribeRequestEvents) {
          jsonStringEvents.push(JSON.stringify(event));
        }
      }

      return jsonStringEvents;
    }

    const subscribeRequestEvents = this.getWsRequestEvent(
      market,
      operation,
      topics,
    );

    for (const event of subscribeRequestEvents) {
      jsonStringEvents.push(JSON.stringify(event));
    }
    return jsonStringEvents;
  }

  /**
   * @returns a correctly structured events for performing an operation over WS. This can vary per exchange spec.
   */
  private getWsRequestEvent(
    market: WsMarket,
    operation: WsOperation,
    requests: WsTopicRequest<string>[],
  ): WsRequestOperationGate<WsTopic>[] {
    const timeInSeconds = +(Date.now() / 1000).toFixed(0);
    switch (market) {
      case 'all': {
        return requests.map((request) => {
          const wsRequestEvent: WsRequestOperationGate<WsTopic> = {
            time: timeInSeconds,
            channel: request.topic,
            event: operation,
            // payload: 'todo',
          };

          if (request.params) {
            wsRequestEvent.payload = request.params;
          }

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
    if (!this.options.apiKey || !this.options.apiSecret) {
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
}
