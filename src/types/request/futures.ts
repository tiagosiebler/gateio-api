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

export interface BatchFundingRatesReq {
  settle: 'btc' | 'usdt';
  contracts: string[];
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

export interface GetRiskLimitTableReq {
  settle: 'btc' | 'usdt' | 'usd';
  table_id: string;
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
  position_side?: string; // v4.105.3: Add position_side parameter for hedge mode support
  hedge_mode?: boolean; // v4.104.3: Add hedge_mode parameter
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
    /** Decimal contract size; if both `size` and `amount` are set, `amount` takes precedence */
    amount?: string;
    price: string; // Required: Order price. Set to 0 to use market price
    close?: boolean;
    tif?: 'gtc' | 'ioc';
    text?: string;
    reduce_only?: boolean;
    auto_size?: string;
  };
  trigger: {
    strategy_type?: 0 | 1;
    price_type?: 0 | 1 | 2;
    price: string; // Required: Price value for price trigger
    rule: 1 | 2; // Required: Price Condition Type (1: >=, 2: <=)
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

// v4.105.8: New GET /futures/{settle}/position_close_history endpoint request
export interface GetFuturesPositionCloseHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
}

// v4.104.6: New GET /futures/{settle}/insurance endpoint request
export interface GetFuturesInsuranceReq {
  settle: 'btc' | 'usdt' | 'usd';
  limit?: number;
}

export interface UpdateFuturesPriceTriggeredOrderReq {
  settle: 'btc' | 'usdt' | 'usd';
  order_id: number;
  contract?: string;
  size?: number;
  /** Same semantics as `size` (decimal contract size) */
  amount?: string;
  price?: string;
  /** When fully closing in single-position mode, set true */
  close?: boolean;
  trigger_price?: string;
  price_type?: 0 | 1 | 2; // 0 - Latest trade price, 1 - Mark price, 2 - Index price
  auto_size?: string; // Not required in single position mode
}

/** GET /futures/{settle}/get_leverage/{contract} — v4.106.43: pos_margin_mode and dual_side required */
export interface GetFuturesContractLeverageReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  pos_margin_mode: 'isolated' | 'cross';
  dual_side: 'dual_long' | 'dual_short';
}

/** Trail order (autoorder/v1/trail) request types */
export interface CreateTrailOrderReq {
  settle: 'btc' | 'usdt';
  contract: string;
  amount: string;
  activation_price?: string;
  is_gte?: boolean;
  price_type?: 1 | 2 | 3;
  price_offset?: string;
  reduce_only?: boolean;
  position_related?: boolean;
  text?: string;
  pos_margin_mode?: string;
  position_mode?: string;
}

export interface TerminateTrailOrderReq {
  settle: 'btc' | 'usdt';
  id?: number;
  text?: string;
}

export interface BatchTerminateTrailOrdersReq {
  settle: 'btc' | 'usdt';
  contract?: string;
  related_position?: 1 | 2;
}

export interface GetTrailOrderListReq {
  settle: 'btc' | 'usdt';
  contract?: string;
  is_finished?: boolean;
  start_at?: number;
  end_at?: number;
  page_num?: number;
  page_size?: number;
  sort_by?: 1 | 2;
  hide_cancel?: boolean;
  related_position?: 1 | 2;
  sort_by_trigger?: boolean;
  reduce_only?: 1 | 2;
  side?: 1 | 2;
}

export interface GetTrailOrderDetailReq {
  settle: 'btc' | 'usdt';
  id: number;
}

export interface UpdateTrailOrderReq {
  settle: 'btc' | 'usdt';
  id: number;
  amount?: string;
  activation_price?: string;
  is_gte_str?: string;
  price_type?: 0 | 1 | 2 | 3;
  price_offset?: string;
}

export interface GetTrailOrderChangeLogReq {
  settle: 'btc' | 'usdt';
  id: number;
  page_num?: number;
  page_size?: number;
}
