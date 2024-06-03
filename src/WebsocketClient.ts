import WebSocket from 'isomorphic-ws';

import { BaseWebsocketClient, EmittableEvent } from './lib/BaseWSClient.js';
import { neverGuard } from './lib/misc-util.js';
import { MessageEventLike } from './lib/requestUtils.js';
import {
  SignAlgorithm,
  SignEncodeMethod,
  signMessage,
} from './lib/webCryptoAPI.js';
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
  WsRequestPing,
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

function getPrivateSpotTopics(): string[] {
  // Consumeable channels for spot
  const privateSpotTopics = [
    'spot.orders',
    'spot.usertrades',
    'spot.balances',
    'spot.margin_balances',
    'spot.funding_balances',
    'spot.cross_balances',
    'spot.priceorders',
  ];

  // WebSocket API for spot
  const privateSpotWSAPITopics = [
    'spot.login',
    'spot.order_place',
    'spot.order_cancel',
    'spot.order_cancel_ids',
    'spot.order_cancel_cp',
    'spot.order_amend',
    'spot.order_status',
  ];

  return [...privateSpotTopics, ...privateSpotWSAPITopics];
}

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
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ) {
    if (!Array.isArray(requests)) {
      this.subscribeTopicsForWsKey([requests], wsKey);
      return;
    }

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
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ) {
    if (!Array.isArray(requests)) {
      this.unsubscribeTopicsForWsKey([requests], wsKey);
      return;
    }

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
    let pingChannel: WsRequestPing['channel'];

    switch (wsKey) {
      case 'deliveryFuturesBTCV4':
      case 'deliveryFuturesUSDTV4':
      case 'perpFuturesBTCV4':
      case 'perpFuturesUSDTV4': {
        pingChannel = 'futures.ping';
        break;
      }
      case 'announcementsV4': {
        pingChannel = 'announcement.ping';
        break;
      }
      case 'optionsV4': {
        pingChannel = 'options.ping';
        break;
      }
      case 'spotV4': {
        pingChannel = 'spot.ping';
        break;
      }
      default: {
        throw neverGuard(wsKey, `Unhandled WsKey "${wsKey}"`);
      }
    }

    const timeInMs = Date.now();
    const timeInS = (timeInMs / 1000).toFixed(0);
    return this.tryWsSend(
      wsKey,
      `{ "time": ${timeInS}, "channel": "${pingChannel}" }`,
    );
  }

  protected sendPongEvent(wsKey: WsKey) {
    try {
      this.logger.trace(`Sending upstream ws PONG: `, {
        ...WS_LOGGER_CATEGORY,
        wsMessage: 'PONG',
        wsKey,
      });
      if (!wsKey) {
        throw new Error(
          'Cannot send PONG due to no known websocket for this wsKey',
        );
      }
      const wsState = this.getWsStore().get(wsKey);
      if (!wsState || !wsState?.ws) {
        throw new Error(
          `${wsKey} socket not connected yet, call "connectAll()" first then try again when the "open" event arrives`,
        );
      }

      // Send a protocol layer pong
      wsState.ws.pong();
    } catch (e) {
      this.logger.error(`Failed to send WS PONG`, {
        ...WS_LOGGER_CATEGORY,
        wsMessage: 'PONG',
        wsKey,
        exception: e,
      });
    }
  }

  // Unused, pings for gate are protocol layer pings
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected isWsPing(_msg: any): boolean {
    return false;
  }

  protected isWsPong(msg: any): boolean {
    if (typeof msg?.data === 'string' && msg.data.includes('.pong"')) {
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

        if (eventAction === 'update') {
          results.push({
            eventType: 'update',
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
  protected isPrivateTopicRequest(
    request: WsTopicRequest<string>,
    wsKey: WsKey,
  ): boolean {
    const topicName = request?.topic?.toLowerCase();
    if (!topicName) {
      return false;
    }

    switch (wsKey) {
      case 'spotV4':
        return getPrivateSpotTopics().includes(topicName);

      // TODO:
      case 'announcementsV4':
      case 'deliveryFuturesBTCV4':
      case 'deliveryFuturesUSDTV4':
      case 'optionsV4':
      case 'perpFuturesBTCV4':
      case 'perpFuturesUSDTV4':
        return getPrivateSpotTopics().includes(topicName);

      default:
        throw neverGuard(wsKey, `Unhandled WsKey "${wsKey}"`);
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
  protected async getWsOperationEventsForTopics(
    topics: WsTopicRequest<string>[],
    wsKey: WsKey,
    operation: WsOperation,
  ): Promise<string[]> {
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
        const subscribeRequestEvents = await this.getWsRequestEvents(
          market,
          operation,
          batch,
          wsKey,
        );

        for (const event of subscribeRequestEvents) {
          jsonStringEvents.push(JSON.stringify(event));
        }
      }

      return jsonStringEvents;
    }

    const subscribeRequestEvents = await this.getWsRequestEvents(
      market,
      operation,
      topics,
      wsKey,
    );

    for (const event of subscribeRequestEvents) {
      jsonStringEvents.push(JSON.stringify(event));
    }
    return jsonStringEvents;
  }

  /**
   * @returns a correctly structured events for performing an operation over WS. This can vary per exchange spec.
   */
  private async getWsRequestEvents(
    market: WsMarket,
    operation: WsOperation,
    requests: WsTopicRequest<string>[],
    wsKey: WsKey,
  ): Promise<WsRequestOperationGate<WsTopic>[]> {
    const wsRequestEvents: WsRequestOperationGate<WsTopic>[] = [];
    const wsRequestBuildingErrors: unknown[] = [];

    switch (market) {
      case 'all': {
        for (const request of requests) {
          const timeInSeconds = +(Date.now() / 1000).toFixed(0);

          const wsEvent: WsRequestOperationGate<WsTopic> = {
            time: timeInSeconds,
            channel: request.topic,
            event: operation,
          };

          if (request.payload) {
            wsEvent.payload = request.payload;
          }

          if (!this.isPrivateTopicRequest(request, wsKey)) {
            wsRequestEvents.push(wsEvent);
            continue;
          }

          // If private topic request, build auth part for request

          // No key or secret, push event as failed
          if (!this.options.apiKey || !this.options.apiSecret) {
            wsRequestBuildingErrors.push({
              error: `apiKey or apiSecret missing from config`,
              operation,
              event: wsEvent,
            });
            continue;
          }

          const signAlgoritm: SignAlgorithm = 'SHA-512';
          const signEncoding: SignEncodeMethod = 'hex';

          const signInput = `channel=${wsEvent.channel}&event=${wsEvent.event}&time=${timeInSeconds}`;

          try {
            const sign = await this.signMessage(
              signInput,
              this.options.apiSecret,
              signEncoding,
              signAlgoritm,
            );

            wsEvent.auth = {
              method: 'api_key',
              KEY: this.options.apiKey,
              SIGN: sign,
            };

            wsRequestEvents.push(wsEvent);
          } catch (e) {
            wsRequestBuildingErrors.push({
              error: `exception during sign`,
              errorTrace: e,
              operation,
              event: wsEvent,
            });
          }
        }
        break;
      }
      default: {
        throw neverGuard(market, `Unhandled market "${market}"`);
      }
    }

    if (wsRequestBuildingErrors.length) {
      const label =
        wsRequestBuildingErrors.length === requests.length ? 'all' : 'some';
      this.logger.error(
        `Failed to build/send ${wsRequestBuildingErrors.length} event(s) for ${label} WS requests due to exceptions`,
        {
          ...WS_LOGGER_CATEGORY,
          wsRequestBuildingErrors,
          wsRequestBuildingErrorsStringified: JSON.stringify(
            wsRequestBuildingErrors,
            null,
            2,
          ),
        },
      );
    }

    return wsRequestEvents;
  }

  private async signMessage(
    paramsStr: string,
    secret: string,
    method: 'hex' | 'base64',
    algorithm: SignAlgorithm,
  ): Promise<string> {
    if (typeof this.options.customSignMessageFn === 'function') {
      return this.options.customSignMessageFn(paramsStr, secret);
    }
    return await signMessage(paramsStr, secret, method, algorithm);
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
