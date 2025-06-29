import { DefaultLogger } from './lib/logger.js';
import { WS_KEY_MAP } from './lib/websocket/websocket-util.js';
import { WSClientConfigurableOptions } from './types/websockets/client.js';
import {
  WSAPIFuturesOrder,
  WSAPIFuturesOrderAmendReq,
  WSAPIFuturesOrderBatchPlaceRespItem,
  WSAPIFuturesOrderCancelCPReq,
  WSAPIFuturesOrderCancelIdsRespItem,
  WSAPIFuturesOrderCancelReq,
  WSAPIFuturesOrderListReq,
  WSAPIFuturesOrderPlaceReq,
  WSAPIFuturesOrderStatusReq,
  WSAPIResponse,
  WSAPISpotOrder,
  WSAPISpotOrderAmendReq,
  WSAPISpotOrderCancelCPReq,
  WSAPISpotOrderCancelIdsReq,
  WSAPISpotOrderCancelIdsRespItem,
  WSAPISpotOrderCancelReq,
  WSAPISpotOrderListReq,
  WSAPISpotOrderPlaceReq,
  WSAPISpotOrderStatusReq,
  WSAPIWsKey,
} from './types/websockets/wsAPI.js';
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
   */
  submitNewSpotOrder(
    params: WSAPISpotOrderPlaceReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPISpotOrder>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.spotV4,
      'spot.order_place',
      params,
    );
  }

  /**
   * Cancel a spot order
   */
  cancelSpotOrder(
    params: WSAPISpotOrderCancelReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPISpotOrder>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.spotV4,
      'spot.order_cancel',
      params,
    );
  }

  /**
   * Cancel all spot orders with the given id list
   */
  cancelSpotOrderById(
    params: WSAPISpotOrderCancelIdsReq[],
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPISpotOrderCancelIdsRespItem[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.spotV4,
      'spot.order_cancel_ids',
      params,
    );
  }

  /**
   * Cancel a spot order for a given symbol
   */
  cancelSpotOrderForSymbol(
    params: WSAPISpotOrderCancelCPReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPISpotOrder[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.spotV4,
      'spot.order_cancel_cp',
      params,
    );
  }

  /**
   * Update a spot order
   */
  updateSpotOrder(
    params: WSAPISpotOrderAmendReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPISpotOrder>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.spotV4,
      'spot.order_amend',
      params,
    );
  }

  /**
   * Get the status of a spot order
   */
  getSpotOrderStatus(
    params: WSAPISpotOrderStatusReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPISpotOrder>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.spotV4,
      'spot.order_status',
      params,
    );
  }

  /**
   * Get all spot orders
   */
  getSpotOrders(
    params: WSAPISpotOrderListReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPISpotOrder[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.spotV4,
      'spot.order_list',
      params,
    );
  }

  /*
   *
   * Futures - Trading requests
   *
   */

  /**
   * Submit a futures order
   */
  submitNewFuturesOrder(
    params: WSAPIFuturesOrderPlaceReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIFuturesOrder>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.perpFuturesUSDTV4 || WS_KEY_MAP.perpFuturesBTCV4,
      'futures.order_place',
      params,
    );
  }

  /**
   * Submit a batch of futures orders
   */
  submitNewFuturesBatchOrder(
    params: WSAPIFuturesOrderPlaceReq[],
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIFuturesOrderBatchPlaceRespItem[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.perpFuturesUSDTV4 || WS_KEY_MAP.perpFuturesBTCV4,
      'futures.order_batch_place',
      params,
    );
  }

  /**
   * Cancel a futures order
   */
  cancelFuturesOrder(
    params: WSAPIFuturesOrderCancelReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIFuturesOrder>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.perpFuturesUSDTV4 || WS_KEY_MAP.perpFuturesBTCV4,
      'futures.order_cancel',
      params,
    );
  }

  /**
   * Cancel futures orders by id list
   */
  cancelFuturesOrderById(
    params: string[],
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIFuturesOrderCancelIdsRespItem[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.perpFuturesUSDTV4 || WS_KEY_MAP.perpFuturesBTCV4,
      'futures.order_cancel_ids',
      params,
    );
  }

  /**
   * Cancel all open futures orders
   */
  cancelFuturesAllOpenOrders(
    params: WSAPIFuturesOrderCancelCPReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIFuturesOrder[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.perpFuturesUSDTV4 || WS_KEY_MAP.perpFuturesBTCV4,
      'futures.order_cancel_cp',
      params,
    );
  }

  /**
   * Update a futures order
   */
  updateFuturesOrder(
    params: WSAPIFuturesOrderAmendReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIFuturesOrder>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.perpFuturesUSDTV4 || WS_KEY_MAP.perpFuturesBTCV4,
      'futures.order_amend',
      params,
    );
  }

  /**
   * Get all futures orders
   */
  getFuturesOrders(
    params: WSAPIFuturesOrderListReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIFuturesOrder[]>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.perpFuturesUSDTV4 || WS_KEY_MAP.perpFuturesBTCV4,
      'futures.order_list',
      params,
    );
  }

  /**
   * Get futures order status
   */
  getFuturesOrderStatus(
    params: WSAPIFuturesOrderStatusReq,
    wsKey?: WSAPIWsKey,
  ): Promise<WSAPIResponse<WSAPIFuturesOrder>> {
    return this.wsClient.sendWSAPIRequest(
      wsKey || WS_KEY_MAP.perpFuturesUSDTV4 || WS_KEY_MAP.perpFuturesBTCV4,
      'futures.order_status',
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
