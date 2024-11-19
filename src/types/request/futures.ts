/**==========================================================================================================================
 * FUTURES
 * ==========================================================================================================================
 */

export interface GetFuturesOrderBookReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  interval?: string;
  limit?: number;
  with_id?: boolean;
}

export interface GetFuturesTradesReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  limit?: number;
  offset?: number;
  last_id?: string;
  from?: number;
  to?: number;
}

export interface GetFuturesCandlesReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  from?: number;
  to?: number;
  limit?: number;
  interval?: string;
}

export interface GetFuturesStatsReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  from?: number;
  interval?: string;
  limit?: number;
}

export interface GetFundingRatesReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  limit?: number;
  from?: number;
  to?: number;
}

export interface GetLiquidationHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  from?: number;
  to?: number;
  limit?: number;
}

export interface GetRiskLimitTiersReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  limit?: number;
  offset?: number;
}

export interface GetFuturesAccountBookReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
  type?:
    | 'dnw'
    | 'pnl'
    | 'fee'
    | 'refr'
    | 'fund'
    | 'point_dnw'
    | 'point_fee'
    | 'point_refr'
    | 'bonus_offset';
}

export interface GetFuturesPositionsReq {
  settle: 'btc' | 'usdt' | 'usd';
  holding?: boolean;
  limit?: number;
  offset?: number;
}

export interface UpdateDualModePositionMarginReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  change: string;
  dual_side: 'dual_long' | 'dual_short';
}

export interface UpdateDualModePositionLeverageReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  leverage: string;
  cross_leverage_limit?: string;
}

export interface SubmitFuturesOrderReq {
  xGateExptime?: number;
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  size: number;
  iceberg?: number;
  price?: string;
  close?: boolean;
  reduce_only?: boolean;
  tif?: string;
  text?: string;
  auto_size?: string;
  stp_act?: string;
}

export interface GetFuturesOrdersReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  status: string;
  limit?: number;
  offset?: number;
  last_id?: string;
}

export interface DeleteAllFuturesOrdersReq {
  xGateExptime?: number;
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  side?: string;
}

export interface GetFuturesOrdersByTimeRangeReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface UpdateFuturesOrderReq {
  xGateExptime?: number;
  settle: 'btc' | 'usdt' | 'usd';
  order_id: string;
  size?: number;
  price?: string;
  amend_text?: string;
}

export interface GetFuturesTradingHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  order?: number;
  limit?: number;
  offset?: number;
  last_id?: string;
}

export interface GetFuturesTradingHistoryByTimeRangeReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
  role?: 'maker' | 'taker';
}

export interface GetFuturesPositionHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
  side?: 'long' | 'short';
  pnl?: string;
}

export interface GetFuturesLiquidationHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  limit?: number;
  at?: number;
}

export interface SubmitFuturesTriggeredOrderReq {
  initial: {
    contract: string;
    size?: number;
    price?: string;
    close?: boolean;
    tif?: 'gtc' | 'ioc';
    text?: string;
    reduce_only?: boolean;
    auto_size?: string;
  };
  trigger: {
    strategy_type?: 0 | 1;
    price_type?: 0 | 1 | 2;
    price?: string;
    rule?: 1 | 2;
    expiration?: number;
  };
  order_type?:
    | 'close-long-order'
    | 'close-short-order'
    | 'close-long-position'
    | 'close-short-position'
    | 'plan-close-long-position'
    | 'plan-close-short-position';
  settle: 'btc' | 'usdt' | 'usd';
}

export interface GetFuturesAutoOrdersReq {
  settle: 'btc' | 'usdt' | 'usd';
  status: 'open' | 'finished';
  contract?: string;
  limit?: number;
  offset?: number;
}

/**
 * Modify contract order parameters
 */
export interface BatchAmendOrderReq {
  order_id?: number; // Order id, order_id and text must contain at least one
  text?: string; // User-defined order text, at least one of order_id and text must be passed
  size?: number; // The new order size, including the executed order size
  price?: string; // New order price
  amend_text?: string; // Custom info during amending order
}
