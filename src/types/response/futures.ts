/**==========================================================================================================================
 * FUTURES
 * ==========================================================================================================================
 */

export interface GetFuturesOrderBookResp {
  id?: number;
  current: number;
  update: number;
  asks: { p: string; s: number }[];
  bids: { p: string; s: number }[];
}

export interface GetFuturesTradesResp {
  id: number;
  create_time: number;
  create_time_ms: number;
  contract: string;
  size: number;
  price: string;
  is_internal?: boolean;
}

export interface GetFuturesCandlesticksResp {
  t: number;
  v?: number;
  c: string;
  h: string;
  l: string;
  o: string;
  sum: string;
}

export interface GetPremiumIndexKLineResp {
  t: number;
  c: string;
  h: string;
  l: string;
  o: string;
}

export interface GetFuturesTickersResp {
  contract: string;
  last: string;
  change_percentage: string;
  total_size: string;
  low_24h: string;
  high_24h: string;
  volume_24h: string;
  volume_24h_btc?: string;
  volume_24h_usd?: string;
  volume_24h_base: string;
  volume_24h_quote: string;
  volume_24h_settle: string;
  mark_price: string;
  funding_rate: string;
  funding_rate_indicative: string;
  index_price: string;
  quanto_base_rate?: string;
  basis_rate: string;
  basis_value: string;
  lowest_ask: string;
  highest_bid: string;
}

export interface GetFuturesStatsResp {
  time: number;
  lsr_taker: number;
  lsr_account: number;
  long_liq_size: number;
  long_liq_amount: number;
  long_liq_usd: number;
  short_liq_size: number;
  short_liq_amount: number;
  short_liq_usd: number;
  open_interest: number;
  open_interest_usd: number;
  top_lsr_account: number;
  top_lsr_size: number;
}

export interface GetIndexConstituentsResp {
  index: string;
  constituents: {
    exchange: string;
    symbols: string[];
  }[];
}

export interface GetLiquidationHistoryResp {
  time: number;
  contract: string;
  size: number;
  order_price: string;
  fill_price: string;
  left: number;
}

export interface GetRiskLimitTiersResp {
  tier: number;
  risk_limit: string;
  initial_rate: string;
  maintenance_rate: string;
  leverage_max: string;
  contract: string;
}

export interface GetFuturesAccountResp {
  total: string;
  unrealised_pnl: string;
  position_margin: string;
  order_margin: string;
  available: string;
  point: string;
  currency: string;
  in_dual_mode: boolean;
  enable_credit: boolean;
  position_initial_margin: string;
  maintenance_margin: string;
  bonus: string;
  enable_evolved_classic: boolean;
  history: {
    dnw: string;
    pnl: string;
    fee: string;
    refr: string;
    fund: string;
    point_dnw: string;
    point_fee: string;
    point_refr: string;
    bonus_dnw: string;
    bonus_offset: string;
  };
}

export interface GetFuturesAccountBookResp {
  time: number;
  change: string;
  balance: string;
  type: string;
  text: string;
  contract?: string;
  trade_id: string;
}

export interface ToggleFuturesDualModeResp {
  total: string;
  unrealised_pnl: string;
  position_margin: string;
  order_margin: string;
  available: string;
  point: string;
  currency: string;
  in_dual_mode: boolean;
  enable_credit: boolean;
  position_initial_margin: string;
  maintenance_margin: string;
  bonus: string;
  enable_evolved_classic: boolean;
  history: {
    dnw: string;
    pnl: string;
    fee: string;
    refr: string;
    fund: string;
    point_dnw: string;
    point_fee: string;
    point_refr: string;
    bonus_dnw: string;
    bonus_offset: string;
  };
}

export interface GetFuturesTradingHistoryResp {
  id: number;
  create_time: number;
  contract: string;
  order_id: string;
  size: number;
  price: string;
  role: 'taker' | 'maker';
  text: string;
  fee: string;
  point_fee: string;
}

export interface GetFuturesPositionHistoryResp {
  time: number;
  contract: string;
  side: 'long' | 'short';
  pnl: string;
  pnl_pnl: string;
  pnl_fund: string;
  pnl_fee: string;
  text: string;
  max_size: string;
  first_open_time: number;
  long_price: string;
  short_price: string;
}

export interface GetFuturesLiquidationHistoryResp {
  time: number;
  contract: string;
  leverage: string;
  size: number;
  margin: string;
  entry_price: string;
  liq_price: string;
  mark_price: string;
  order_id: number;
  order_price: string;
  fill_price: string;
  left: number;
}
export interface GetFuturesAutoDeleveragingHistoryResp {
  time: number;
  user: number;
  order_id: number;
  contract: string;
  leverage: string;
  cross_leverage_limit: string;
  entry_price: string;
  fill_price: string;
  trade_size: number;
  position_size: number;
}

export interface DeleteFuturesBatchOrdersResp {
  user_id: number;
  id: string;
  succeeded: boolean;
  message: string;
}
