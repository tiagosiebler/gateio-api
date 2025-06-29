import { WsKey } from '../../lib/websocket/websocket-util.js';

export type SpotWSAPITopic =
  | 'spot.login'
  | 'spot.order_place'
  | 'spot.order_cancel'
  | 'spot.order_cancel_ids'
  | 'spot.order_cancel_cp'
  | 'spot.order_amend'
  | 'spot.order_status'
  | 'spot.order_list';

export type FuturesWSAPITopic =
  | 'futures.login'
  | 'futures.order_place'
  | 'futures.order_batch_place'
  | 'futures.order_cancel'
  | 'futures.order_cancel_cp'
  | 'futures.order_amend'
  | 'futures.order_list'
  | 'futures.order_status'
  | 'futures.order_cancel_ids';

export type WSAPITopic = SpotWSAPITopic | FuturesWSAPITopic;
export type WSAPIWsKey = keyof WsAPIWsKeyTopicMap;

export interface WsAPIWsKeyTopicMap {
  spotV4: SpotWSAPITopic;
  perpFuturesUSDTV4: FuturesWSAPITopic;
  perpFuturesBTCV4: FuturesWSAPITopic;
  deliveryFuturesUSDTV4: FuturesWSAPITopic;
  deliveryFuturesBTCV4: FuturesWSAPITopic;
  // optionsV4: never;
  // announcementsV4: never;
}

// ====================================
// Request Parameter Mapping
// ====================================

export interface WsAPITopicRequestParamMap {
  'spot.login': undefined;
  'futures.login': undefined;

  'spot.order_place': WSAPISpotOrderPlaceReq;
  'spot.order_cancel': WSAPISpotOrderCancelReq;
  'spot.order_cancel_ids': WSAPISpotOrderCancelIdsReq[];
  'spot.order_cancel_cp': WSAPISpotOrderCancelCPReq;
  'spot.order_amend': WSAPISpotOrderAmendReq;
  'spot.order_status': WSAPISpotOrderStatusReq;
  'spot.order_list': WSAPISpotOrderListReq;

  'futures.order_place': WSAPIFuturesOrderPlaceReq;
  'futures.order_batch_place': WSAPIFuturesOrderPlaceReq[];
  'futures.order_cancel': WSAPIFuturesOrderCancelReq;
  'futures.order_cancel_ids': string[];
  'futures.order_cancel_cp': WSAPIFuturesOrderCancelCPReq;
  'futures.order_amend': WSAPIFuturesOrderAmendReq;
  'futures.order_list': WSAPIFuturesOrderListReq;
  'futures.order_status': WSAPIFuturesOrderStatusReq;
}

export type WsAPITopicRequestParams =
  WsAPITopicRequestParamMap[keyof WsAPITopicRequestParamMap];

// ====================================
// Response Headers and Base Response
// ====================================

export interface WSAPIResponseHeader<TChannel extends WSAPITopic> {
  /** String timestamp as ms */
  response_time: string;
  /** Status of WS API call. "200" if successful, else exception is thrown */
  status: '200' | string;
  channel: TChannel;
  event: 'api';
  client_id: string;
}

export interface WSAPILoginResponse {
  api_key: string;
  uid: string;
}

export interface WSAPIOrderStatusResponse {
  left: string;
  update_time: string;
  amount: string;
  create_time: string;
  price: string;
  finish_as: string;
  time_in_force: string;
  currency_pair: string;
  type: string;
  account: string;
  side: string;
  amend_text: string;
  text: string;
  status: string;
  iceberg: string;
  avg_deal_price: string;
  filled_total: string;
  id: string;
  fill_price: string;
  update_time_ms: number;
  create_time_ms: number;
}

export type WSAPIResponseData = WSAPILoginResponse | WSAPIOrderStatusResponse;

// ====================================
// Response Type Mapping
// ====================================

export interface WsAPITopicResponseMap {
  'spot.login': WSAPIResponse<WSAPILoginResponse, 'spot.login'>;
  'futures.login': WSAPIResponse<WSAPILoginResponse, 'futures.login'>;

  'spot.order_place': WSAPIResponse<WSAPISpotOrder, 'spot.order_place'>;
  'spot.order_cancel': WSAPIResponse<WSAPISpotOrder, 'spot.order_cancel'>;
  'spot.order_cancel_ids': WSAPIResponse<
    WSAPISpotOrderCancelIdsRespItem[],
    'spot.order_cancel_ids'
  >;
  'spot.order_cancel_cp': WSAPIResponse<
    WSAPISpotOrder[],
    'spot.order_cancel_cp'
  >;
  'spot.order_amend': WSAPIResponse<WSAPISpotOrder, 'spot.order_amend'>;
  'spot.order_status': WSAPIResponse<WSAPISpotOrder, 'spot.order_status'>;
  'spot.order_list': WSAPIResponse<WSAPISpotOrder[], 'spot.order_list'>;

  'futures.order_place': WSAPIResponse<
    WSAPIFuturesOrder,
    'futures.order_place'
  >;
  'futures.order_batch_place': WSAPIResponse<
    WSAPIFuturesOrderBatchPlaceRespItem[],
    'futures.order_batch_place'
  >;
  'futures.order_cancel': WSAPIResponse<
    WSAPIFuturesOrder,
    'futures.order_cancel'
  >;
  'futures.order_cancel_ids': WSAPIResponse<
    WSAPIFuturesOrderCancelIdsRespItem[],
    'futures.order_cancel_ids'
  >;
  'futures.order_cancel_cp': WSAPIResponse<
    WSAPIFuturesOrder[],
    'futures.order_cancel_cp'
  >;
  'futures.order_amend': WSAPIResponse<
    WSAPIFuturesOrder,
    'futures.order_amend'
  >;
  'futures.order_list': WSAPIResponse<
    WSAPIFuturesOrder[],
    'futures.order_list'
  >;
  'futures.order_status': WSAPIResponse<
    WSAPIFuturesOrder,
    'futures.order_status'
  >;
}
export interface WSAPIResponse<
  TResponseData extends object = WSAPIResponseData | object,
  TChannel extends WSAPITopic = WSAPITopic,
> {
  wsKey: WsKey;
  header: WSAPIResponseHeader<TChannel>;
  data: {
    result: TResponseData;
  };
  /** Auto-generated */
  request_id: string;
}

// export interface WsAPIResponseMap<TChannel extends WSAPITopic = WSAPITopic> {
//   'spot.login': WSAPIResponse<WSAPILoginResponse, TChannel>;
//   'futures.login': WSAPIResponse<WSAPILoginResponse, TChannel>;
//   string: object;
// }

// ====================================
// Spot WebSocket API Request Types
// ====================================

export interface WSAPISpotOrderPlaceReq {
  text?: string;
  currency_pair: string;
  type?: 'limit' | 'market';
  account?: 'spot' | 'margin' | 'unified' | 'cross_margin';
  side: 'buy' | 'sell';
  amount: string;
  price?: string;
  time_in_force?: 'gtc' | 'ioc' | 'poc' | 'fok';
  iceberg?: string;
  auto_borrow?: boolean;
  auto_repay?: boolean;
  stp_act?: 'cn' | 'co' | 'cb';
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}

export interface WSAPISpotOrderCancelReq {
  order_id: string;
  currency_pair: string;
  account?: string;
}

export interface WSAPISpotOrderCancelIdsReq {
  currency_pair: string;
  id: string;
  account?: string;
}

export interface WSAPISpotOrderCancelCPReq {
  currency_pair: string;
  side?: 'buy' | 'sell';
  account?: string;
}

export interface WSAPISpotOrderAmendReq {
  amount?: string;
  price?: string;
  amend_text?: string;
  order_id: string;
  currency_pair: string;
  account?: string;
}

export interface WSAPISpotOrderStatusReq {
  order_id: string;
  currency_pair: string;
  account?: string;
}

export interface WSAPISpotOrderListReq {
  currency_pair: string;
  status: 'open' | 'finished';
  page?: number;
  limit?: number;
  account?: string;
  from?: number;
  to?: number;
  side?: 'buy' | 'sell';
}

// ====================================
// Futures WebSocket API Request Types
// ====================================

export interface WSAPIFuturesOrderPlaceReq {
  contract: string;
  size: number;
  iceberg?: number;
  price?: string;
  close?: boolean;
  reduce_only?: boolean;
  tif?: 'gtc' | 'ioc' | 'poc' | 'fok';
  text?: string;
  auto_size?: 'close_long' | 'close_short';
  stp_act?: 'cn' | 'co' | 'cb';
}

export interface WSAPIFuturesOrderCancelReq {
  order_id: string;
}

export interface WSAPIFuturesOrderCancelCPReq {
  contract: string;
  side?: 'bid' | 'ask';
}

export interface WSAPIFuturesOrderAmendReq {
  order_id: string;
  price?: string;
  size?: number;
  amend_text?: string;
}

export interface WSAPIFuturesOrderListReq {
  contract: string;
  status: 'open' | 'finished';
  limit?: number;
  offset?: number;
  last_id?: string;
  count_total?: number;
}

export interface WSAPIFuturesOrderStatusReq {
  order_id: string;
}

// ====================================
// Spot WebSocket API Response Types
// ====================================

export interface WSAPISpotOrder {
  id: string;
  text: string;
  amend_text: string;
  create_time: string;
  update_time: string;
  create_time_ms: number;
  update_time_ms: number;
  status: string;
  currency_pair: string;
  type: string;
  account: string;
  side: string;
  amount: string;
  price: string;
  time_in_force: string;
  iceberg: string;
  left: string;
  fill_price?: string;
  filled_amount?: string;
  filled_total: string;
  avg_deal_price?: string;
  fee: string;
  fee_currency: string;
  point_fee: string;
  gt_fee: string;
  gt_maker_fee?: string;
  gt_taker_fee?: string;
  gt_discount?: boolean;
  rebated_fee: string;
  rebated_fee_currency: string;
  stp_id?: number;
  stp_act?: string;
  finish_as: string;
}

export interface WSAPISpotOrderCancelIdsRespItem {
  currency_pair: string;
  id: string;
  succeeded: boolean;
}

// ====================================
// Futures WebSocket API Response Types
// ====================================

export interface WSAPIFuturesOrder {
  id: number;
  user: number;
  create_time: number;
  finish_time?: number;
  update_time?: number;
  finish_as?: string;
  status: string;
  contract: string;
  size: number;
  price: string;
  tif: string;
  left?: number;
  fill_price: string;
  text: string;
  tkfr: string;
  mkfr: string;
  stp_id?: number;
  stp_act?: string;
  amend_text?: string;
}

export interface WSAPIFuturesOrderBatchPlaceRespItem extends WSAPIFuturesOrder {
  succeeded: boolean;
}

export interface WSAPIFuturesOrderCancelIdsRespItem {
  id: string;
  user_id: number;
  succeeded?: boolean;
  message?: string;
}
