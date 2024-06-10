import { WsKey } from '../../lib/websocket/websocket-util';
import {
  GetFuturesOrdersReq,
  SubmitFuturesOrderReq,
  UpdateFuturesOrderReq,
} from '../request/futures';
import {
  DeleteSpotOrderReq,
  SubmitSpotOrderReq,
  UpdateSpotOrderReq,
} from '../request/spot';
import { CancelBatchOrder, GetSingleOrderReq } from '../shared';

export type SpotWSAPITopic =
  | 'spot.login'
  | 'spot.order_place'
  | 'spot.order_cancel'
  | 'spot.order_cancel_ids'
  | 'spot.order_cancel_cp'
  | 'spot.order_amend'
  | 'spot.order_status';

export type FuturesWSAPITopic =
  | 'futures.login'
  | 'futures.order_place'
  | 'futures.order_batch_place'
  | 'futures.order_cancel'
  | 'futures.order_cancel_cp'
  | 'futures.order_amend'
  | 'futures.order_list'
  | 'futures.order_status';

export type WSAPITopic = SpotWSAPITopic | FuturesWSAPITopic;

export interface WsAPIWsKeyTopicMap {
  spotV4: SpotWSAPITopic;
  perpFuturesUSDTV4: FuturesWSAPITopic;
  perpFuturesBTCV4: FuturesWSAPITopic;
  deliveryFuturesUSDTV4: FuturesWSAPITopic;
  deliveryFuturesBTCV4: FuturesWSAPITopic;
  // optionsV4: never;
  // announcementsV4: never;
}

export type WsAPIRequestsTopicMap = {
  'spot.login': undefined;
  'spot.order_place': SubmitSpotOrderReq;
  'spot.order_cancel': DeleteSpotOrderReq;
  'spot.order_cancel_ids': CancelBatchOrder[];
  'spot.order_cancel_cp': DeleteSpotOrderReq[];
  'spot.order_amend': UpdateSpotOrderReq;
  'spot.order_status': GetSingleOrderReq;
  'futures.login': undefined;
  'futures.order_place': Omit<SubmitFuturesOrderReq, 'settle'>; // doesn't seem like "settle" is needed here
  'futures.order_batch_place': Omit<SubmitFuturesOrderReq, 'settle'>[];
  'futures.order_cancel': {
    order_id: string;
  };
  'futures.order_cancel_cp': {
    contract: string;
    side?: 'ask' | 'bid';
  };
  'futures.order_amend': Omit<UpdateFuturesOrderReq, 'settle'>;
  'futures.order_list': Omit<GetFuturesOrdersReq, 'settle'>;
  'futures.order_status': {
    order_id: string;
  };
};

export type WsAPIRequestParams =
  WsAPIRequestsTopicMap[keyof WsAPIRequestsTopicMap];

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

export interface WSAPIResponse<
  TResponseData extends WSAPIResponseData = WSAPIResponseData,
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
