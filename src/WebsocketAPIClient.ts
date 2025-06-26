import { DefaultLogger } from './lib/logger.js';
import { WS_KEY_MAP } from './lib/websocket/websocket-util.js';
import { WSClientConfigurableOptions } from './types/websockets/client.js';
import { WSAPIResponse, WSAPIWsKey } from './types/websockets/wsAPI.js';
import { WebsocketClient } from './WebsocketClient.js';

/**
 * Configurable options specific to only the REST-like WebsocketAPIClient
 */
export interface WSAPIClientConfigurableOptions {
  /**
   * Default: true
   *
   * Attach default event listeners, which will console log any high level
   * events (opened/reconnecting/reconnected/etc).
   *
   * If you disable this, you should set your own event listeners
   * on the embedded WS Client `wsApiClient.getWSClient().on(....)`.
   */
  attachEventListeners: boolean;
}

/**
 * This is a minimal Websocket API wrapper around the WebsocketClient.
 *
 * Some methods support passing in a custom "wsKey". This is a reference to which WS connection should
 * be used to transmit that message. This is only useful if you wish to use an alternative wss
 * domain that is supported by the SDK.
 *
 * Note: To use testnet, don't set the wsKey - use `testnet: true` in
 * the constructor instead.
 *
 * Note: You can also directly use the sendWSAPIRequest() method to make WS API calls, but some
 * may find the below methods slightly more intuitive.
 *
 * Refer to the WS API promises example for a more detailed example on using sendWSAPIRequest() directly:
 * https://github.com/tiagosiebler/binance/blob/master/examples/WebSockets/ws-api-raw-promises.ts#L108
 */
export class WebsocketAPIClient {
  private wsClient: WebsocketClient;

  private options: WSClientConfigurableOptions & WSAPIClientConfigurableOptions;

  constructor(
    options?: WSClientConfigurableOptions &
      Partial<WSAPIClientConfigurableOptions>,
    logger?: DefaultLogger,
  ) {
    this.wsClient = new WebsocketClient(options, logger);

    this.options = {
      attachEventListeners: true,
      ...options,
    };

    this.setupDefaultEventListeners();
  }

  public getWSClient(): WebsocketClient {
    return this.wsClient;
  }

  public setTimeOffsetMs(newOffset: number): void {
    return this.getWSClient().setTimeOffsetMs(newOffset);
  }

  /*
   *
   * SPOT - Trading requests
   *
   */

  /**
   * Submit a spot order
   *
   * TODO: check SpotWSAPITopic and FuturesWSAPITopic for a list of supported ws api commands
   *
   * docs: https://www.gate.com/docs/developers/apiv4/ws/en/#websocket-api
   *
   * is it only spot and futures?
   *
   * do they overlap (can we just make one submitNewOrder fn) or do we need one function per product group (submitNewSpotOrder vs submitNewFuturesOrder)?
   */
  submitNewSpotOrder(
    params: any,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<any>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.spotV4,
      'spot.order_place',
      params,
    );
  }

  /**
   *
   *
   *
   *
   *
   *
   *
   * Private methods for handling some of the convenience/automation provided by the WS API Client
   *
   *
   *
   *
   *
   *
   *
   */

  private setupDefaultEventListeners() {
    if (this.options.attachEventListeners) {
      /**
       * General event handlers for monitoring the WebsocketClient
       */
      this.wsClient
        .on('open', (data) => {
          console.log(new Date(), 'ws connected', data.wsKey);
        })
        .on('reconnect', ({ wsKey }) => {
          console.log(new Date(), 'ws automatically reconnecting.... ', wsKey);
        })
        .on('reconnected', (data) => {
          console.log(new Date(), 'ws has reconnected ', data?.wsKey);
        })
        .on('authenticated', (data) => {
          console.info(new Date(), 'ws has authenticated ', data?.wsKey);
        })
        .on('exception', (data) => {
          console.error(new Date(), 'ws exception: ', JSON.stringify(data));
        });
    }
  }
}
