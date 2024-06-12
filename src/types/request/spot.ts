/**==========================================================================================================================
 * SPOT
 * ==========================================================================================================================
 */

export interface GetSpotOrderBookReq {
  currency_pair: string;
  interval?: string;
  limit?: number;
  with_id?: boolean;
}

export interface GetSpotTradesReq {
  currency_pair: string;
  limit?: number;
  last_id?: string;
  reverse?: boolean;
  from?: number;
  to?: number;
  page?: number;
}

export interface GetSpotCandlesReq {
  currency_pair: string;
  limit?: number;
  from?: number;
  to?: number;
  interval?:
    | '10s'
    | '1m'
    | '5m'
    | '15m'
    | '30m'
    | '1h'
    | '4h'
    | '8h'
    | '1d'
    | '7d'
    | '30d';
}

export interface GetSpotAccountBookReq {
  currency?: string;
  from?: number;
  to?: number;
  page?: number;
  limit?: number;
  type?: string;
}

export interface SubmitSpotClosePosCrossDisabledReq {
  text?: string;
  currency_pair: string;
  amount: string;
  price: string;
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}

export interface GetSpotOrdersReq {
  currency_pair: string;
  status: 'open' | 'finished';
  page?: number;
  limit?: number;
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  from?: number;
  to?: number;
  side?: 'buy' | 'sell';
}

export interface CancelSpotBatchOrdersReq {
  currency_pair: string;
  id: string;
  account?: 'cross_margin';
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}

export interface DeleteSpotOrderReq {
  order_id: string;
  currency_pair: string;
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}

export interface GetSpotOrderReq {
  order_id: string;
  currency_pair: string;
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
}

export interface GetSpotTradingHistoryReq {
  currency_pair?: string;
  limit?: number;
  page?: number;
  order_id?: string;
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  from?: number;
  to?: number;
}

export interface UpdateSpotBatchOrdersReq {
  order_id?: string;
  currency_pair?: string;
  amount?: string;
  price?: string;
  amend_text?: string;
}

export interface GetSpotAutoOrdersReq {
  status: 'open' | 'finished';
  market?: string;
  account?: 'normal' | 'margin' | 'cross_margin';
  limit?: number;
  offset?: number;
}

export interface SubmitSpotOrderReq {
  side: 'buy' | 'sell';
  amount: string;
  text?: string;
  currency_pair: string;
  type?: 'limit' | 'market';
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  price?: string;
  time_in_force?: 'gtc' | 'ioc' | 'poc' | 'fok';
  iceberg?: string;
  auto_borrow?: boolean;
  auto_repay?: boolean;
  stp_act?: string;
  action_mode?: string;
}

export interface UpdateSpotOrderReq {
  order_id: string;
  currency_pair: string;
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  amount?: string;
  price?: string;
  amend_text?: string;
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}
