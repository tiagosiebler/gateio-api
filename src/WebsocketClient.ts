import { BaseWebsocketClient, EmittableEvent } from './lib/BaseWSClient.js';
import { neverGuard } from './lib/misc-util.js';
import { CHANNEL_ID, MessageEventLike } from './lib/requestUtils.js';
import {
  SignAlgorithm,
  SignEncodeMethod,
  signMessage,
} from './lib/webCryptoAPI.js';
import {
  getPrivateFuturesTopics,
  getPrivateOptionsTopics,
  getPrivateSpotTopics,
  getPromiseRefForWSAPIRequest,
  WS_BASE_URL_MAP,
  WS_KEY_MAP,
  WsKey,
  WsMarket,
  WsTopicRequest,
} from './lib/websocket/websocket-util.js';
import { WSConnectedResult } from './lib/websocket/WsStore.types.js';
import {
  WSAPIRequest,
  WsOperation,
  WsRequestOperationGate,
  WsRequestPing,
} from './types/websockets/requests.js';
import {
  WsAPITopicRequestParamMap,
  WsAPITopicResponseMap,
  WsAPIWsKeyTopicMap,
} from './types/websockets/wsAPI.js';

export const WS_LOGGER_CATEGORY = { category: 'gate-ws' };

/**
 * WS topics are always a string for gate. Some exchanges use complex objects
 */
export type WsTopic = string;

export class WebsocketClient extends BaseWebsocketClient<WsKey> {
  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library.
   *
   * Returns array of promises that individually resolve when each connection is successfully opened.
   */
  public connectAll(): Promise<WSConnectedResult | undefined>[] {
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
   * WS API Methods - similar to the REST API, but via WebSockets
   */

  /**
   * Send a Websocket API event on a connection. Returns a promise that resolves on reply.
   *
   * Returned promise is rejected if an exception is detected in the reply OR the connection disconnects for any reason (even if automatic reconnect will happen).
   *
   * After a fresh connection, you should always send a login request first.
   *
   * If you authenticated once and you're reconnected later (e.g. connection temporarily lost), the SDK will by default automatically:
   * - Detect you were authenticated to the WS API before
   * - Try to re-authenticate (up to 5 times, in case something (bad timestamp) goes wrong)
   * - If it succeeds, it will emit the 'authenticated' event.
   * - If it fails and gives up, it will emit an 'exception' event (type: 'wsapi.auth', reason: detailed text).
   *
   * You can turn off the automatic re-auth WS API logic using `reauthWSAPIOnReconnect: false` in the WSClient config.
   *
   * @param wsKey - The connection this event is for (e.g. "spotV4" | "perpFuturesUSDTV4" | "perpFuturesBTCV4" | "deliveryFuturesUSDTV4" | "deliveryFuturesBTCV4" | "optionsV4")
   * @param channel - The channel this event is for (e.g. "spot.login" to authenticate)
   * @param params - Any request parameters for the payload (contents of req_param in the docs). Signature generation is automatic, only send parameters such as order ID as per the docs.
   * @returns Promise - tries to resolve with async WS API response. Rejects if disconnected or exception is seen in async WS API response
   */

  // This overload allows the caller to omit the 3rd param, if it isn't required (e.g. for the login call)
  async sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap,
    TWSChannel extends WsAPIWsKeyTopicMap[TWSKey] = WsAPIWsKeyTopicMap[TWSKey],
    TWSParams extends
      WsAPITopicRequestParamMap[TWSChannel] = WsAPITopicRequestParamMap[TWSChannel],
    TWSAPIResponse extends
      | WsAPITopicResponseMap[TWSChannel]
      | object = WsAPITopicResponseMap[TWSChannel],
  >(
    wsKey: TWSKey,
    channel: TWSChannel,
    ...params: TWSParams extends undefined ? [] : [TWSParams]
  ): Promise<TWSAPIResponse>;

  async sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap = keyof WsAPIWsKeyTopicMap,
    TWSChannel extends WsAPIWsKeyTopicMap[TWSKey] = WsAPIWsKeyTopicMap[TWSKey],
    TWSParams extends
      WsAPITopicRequestParamMap[TWSChannel] = WsAPITopicRequestParamMap[TWSChannel],
    TWSAPIResponse = object,
  >(wsKey: TWSKey, channel: TWSChannel, params?: TWSParams): Promise<any> {
    this.logger.trace(`sendWSAPIRequest(): assert "${wsKey}" is connected`);
    await this.assertIsConnected(wsKey);

    const signTimestamp = Date.now() + this.options.recvWindow;
    const timeInSeconds = +(signTimestamp / 1000).toFixed(0);

    const requestEvent: WSAPIRequest<WsAPITopicRequestParamMap[TWSChannel]> = {
      time: timeInSeconds,
      // id: timeInSeconds,
      channel,
      event: 'api',
      payload: {
        req_id: this.getNewRequestId(),
        req_header: {
          'X-Gate-Channel-Id': CHANNEL_ID,
        },
        api_key: this.options.apiKey,
        req_param: params ? params : '',
        timestamp: `${timeInSeconds}`,
      },
    };

    // Sign request
    const signedEvent = await this.signWSAPIRequest(requestEvent);

    // Store deferred promise
    const promiseRef = getPromiseRefForWSAPIRequest(requestEvent);

    const deferredPromise =
      this.getWsStore().createDeferredPromise<TWSAPIResponse>(
        wsKey,
        promiseRef,
        false,
      );

    // Send event
    this.tryWsSend(wsKey, JSON.stringify(signedEvent));

    this.logger.trace(`sendWSAPIRequest(): sent ${channel} event`);

    // Return deferred promise, so caller can await this call
    return deferredPromise.promise!;
  }

  /**
   *
   * Internal methods - not intended for public use
   *
   */

  protected getWsUrl(wsKey: WsKey): string {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const useTestnet = this.options.useTestnet;
    const networkKey = useTestnet ? 'testnet' : 'livenet';

    const baseUrl = WS_BASE_URL_MAP[wsKey][networkKey];
    return baseUrl;
  }

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

    const signTimestamp = Date.now() + this.options.recvWindow;
    const timeInS = (signTimestamp / 1000).toFixed(0);
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
        throw new Error('Cannot send PONG, no wsKey provided');
      }
      const wsState = this.getWsStore().get(wsKey);
      if (!wsState || !wsState?.ws) {
        throw new Error(`Cannot send pong, ${wsKey} socket not connected yet`);
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

  // NOT IN USE for gate.io, pings for gate are protocol layer pings
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
   * Parse incoming events into categories, before emitting to the user
   */
  protected resolveEmittableEvents(
    wsKey: WsKey,
    event: MessageEventLike,
  ): EmittableEvent[] {
    const results: EmittableEvent[] = [];

    try {
      const parsed = JSON.parse(event.data);

      const responseEvents = ['subscribe', 'unsubscribe'];
      const authenticatedEvents = ['auth'];

      const eventHeaders = parsed?.header;
      const eventChannel = eventHeaders?.channel;
      const eventType =
        parsed.channel.includes('obu') === true
          ? 'update'
          : eventHeaders?.event;
      const eventStatusCode = eventHeaders?.status;
      const requestId = parsed?.request_id;

      const promiseRef = [eventChannel, requestId].join('_');

      const eventAction =
        parsed.channel.includes('obu') === true
          ? 'update'
          : parsed?.event || parsed.action || parsed?.header.data;

      if (eventType === 'api') {
        const isError = eventStatusCode !== '200';

        // WS API Exception
        if (isError) {
          try {
            this.getWsStore().rejectDeferredPromise(
              wsKey,
              promiseRef,
              {
                wsKey,
                ...parsed,
              },
              true,
            );
          } catch (e) {
            this.logger.error(`Exception trying to reject WSAPI promise`, {
              wsKey,
              promiseRef,
              parsedEvent: parsed,
            });
          }

          results.push({
            eventType: 'exception',
            event: parsed,
          });
          return results;
        }

        // WS API Success
        try {
          this.getWsStore().resolveDeferredPromise(
            wsKey,
            promiseRef,
            {
              wsKey,
              ...parsed,
            },
            true,
          );
        } catch (e) {
          this.logger.error(`Exception trying to resolve WSAPI promise`, {
            wsKey,
            promiseRef,
            parsedEvent: parsed,
          });
        }

        if (eventChannel.includes('.login')) {
          results.push({
            eventType: 'authenticated',
            event: {
              ...parsed,
              isWSAPI: true,
              WSAPIAuthChannel: eventChannel,
            },
          });
        }

        results.push({
          eventType: 'response',
          event: parsed,
        });
        return results;
      }

      if (typeof eventAction === 'string') {
        if (parsed.success === false) {
          results.push({
            eventType: 'exception',
            event: parsed,
          });
          return results;
        }

        // Most events use "event: 'update'" for topic updates
        // The legacy "futures.order_book" topic uses "all" for this field
        if (['update', 'all'].includes(eventAction)) {
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

        this.logger.error(
          `!! Unhandled string event type "${eventAction}. Defaulting to "update" channel...`,
          parsed,
        );
      } else {
        // TODO: test meee
        this.logger.error(
          `!! Unhandled non-string event type "${eventAction}. Defaulting to "update" channel...`,
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

      case 'perpFuturesBTCV4':
      case 'perpFuturesUSDTV4':
      case 'deliveryFuturesBTCV4':
      case 'deliveryFuturesUSDTV4':
        return getPrivateFuturesTopics().includes(topicName);

      case 'optionsV4':
        return getPrivateOptionsTopics().includes(topicName);

      // No private announcements channels
      case 'announcementsV4':
        return false;

      default:
        throw neverGuard(wsKey, `Unhandled WsKey "${wsKey}"`);
    }
  }

  /**
   * Not in use for gate.io
   */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getWsMarketForWsKey(_wsKey: WsKey): WsMarket {
    return 'all';
  }

  /**
   * Not in use for gate.io
   */
  protected getPrivateWSKeys(): WsKey[] {
    return [];
  }

  /** Force subscription requests to be sent in smaller batches, if a number is returned */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getMaxTopicsPerSubscribeEvent(_wsKey: WsKey): number | null {
    return 1;
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
   * @returns one or more correctly structured request events for performing a operations over WS. This can vary per exchange spec.
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
          const signTimestamp = Date.now() + this.options.recvWindow;
          const timeInSeconds = +(signTimestamp / 1000).toFixed(0);

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

            wsRequestEvents.push({
              ...wsEvent,
              auth: {
                method: 'api_key',
                KEY: this.options.apiKey,
                SIGN: sign,
              },
            });
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

    const signature = await this.signMessage(
      signMessageInput,
      this.options.apiSecret,
      'hex',
      'SHA-512',
    );

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
   *
   * @param requestEvent
   * @returns A signed updated WS API request object, ready to be sent
   */
  private async signWSAPIRequest<TRequestParams = object>(
    requestEvent: WSAPIRequest<TRequestParams>,
  ): Promise<WSAPIRequest<TRequestParams>> {
    if (!this.options.apiSecret) {
      throw new Error(`API Secret missing`);
    }

    const payload = requestEvent.payload;

    const toSign = [
      requestEvent.event,
      requestEvent.channel,
      JSON.stringify(payload.req_param),
      requestEvent.time,
    ].join('\n');

    const signEncoding: SignEncodeMethod = 'hex';
    const signAlgoritm: SignAlgorithm = 'SHA-512';

    return {
      ...requestEvent,
      payload: {
        ...requestEvent.payload,
        req_header: {
          'X-Gate-Channel-Id': CHANNEL_ID,
        },
        signature: await this.signMessage(
          toSign,
          this.options.apiSecret,
          signEncoding,
          signAlgoritm,
        ),
      },
    };
  }
}
