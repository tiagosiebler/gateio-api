/**==========================================================================================================================
 * FUTURES
 * ==========================================================================================================================
 */

export interface FuturesOrderBook {
  id?: number;
  current: number;
  update: number;
  asks: { p: string; s: number }[];
  bids: { p: string; s: number }[];
}

export interface FuturesTrade {
  id: number;
  create_time: number;
  create_time_ms: number;
  contract: string;
  size: number;
  price: string;
  is_internal?: boolean;
}

export interface FuturesCandle {
  t: number;
  v?: number;
  c: string;
  h: string;
  l: string;
  o: string;
  sum: string;
}

export interface PremiumIndexKLine {
  t: number;
  c: string;
  h: string;
  l: string;
  o: string;
}

export interface FuturesTicker {
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
  lowest_size: string;
  highest_size: string;
}

export interface FuturesStats {
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

export interface IndexConstituents {
  index: string;
  constituents: {
    exchange: string;
    symbols: string[];
  }[];
}

export interface LiquidationHistoryRecord {
  time: number;
  contract: string;
  size: number;
  order_price: string;
  fill_price: string;
  left: number;
}

export interface RiskLimitTier {
  tier: number;
  risk_limit: string;
  initial_rate: string;
  maintenance_rate: string;
  leverage_max: string;
  contract: string;
}

export interface FuturesAccount {
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
  cross_order_margin: string;
  cross_initial_margin: string;
  cross_maintenance_margin: string;
  cross_unrealised_pnl: string;
  cross_available: string;
  isolated_position_margin: string;
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

export interface FuturesAccountBookRecord {
  time: number;
  change: string;
  balance: string;
  type: string;
  text: string;
  contract?: string;
  trade_id: string;
  id: string;
}

export interface FuturesOrder {
  id?: number;
  user?: number;
  create_time?: number;
  finish_time?: number;
  finish_as?:
    | 'filled'
    | 'cancelled'
    | 'liquidated'
    | 'ioc'
    | 'auto_deleveraged'
    | 'reduce_only'
    | 'position_closed'
    | 'stp';
  status?: 'open' | 'finished';
  contract: string;
  size: number;
  iceberg?: number;
  price?: string;
  close?: boolean;
  is_close?: boolean;
  reduce_only?: boolean;
  is_reduce_only?: boolean;
  is_liq?: boolean;
  tif?: 'gtc' | 'ioc' | 'poc' | 'fok';
  left?: number;
  fill_price?: string;
  text?: string;
  tkfr?: string;
  mkfr?: string;
  refu?: number;
  auto_size?: 'close_long' | 'close_short';
  stp_id?: number;
  stp_act?: 'cn' | 'co' | 'cb' | '-';
  amend_text?: string;
  biz_info?: string;
}

export interface FuturesPosition {
  user?: number;
  contract?: string;
  size?: number;
  leverage?: string;
  risk_limit?: string;
  leverage_max?: string;
  maintenance_rate?: string;
  value?: string;
  margin?: string;
  entry_price?: string;
  liq_price?: string;
  mark_price?: string;
  initial_margin?: string;
  maintenance_margin?: string;
  unrealised_pnl?: string;
  realised_pnl?: string;
  pnl_pnl?: string;
  pnl_fund?: string;
  pnl_fee?: string;
  history_pnl?: string;
  last_close_pnl?: string;
  realised_point?: string;
  history_point?: string;
  adl_ranking?: number;
  pending_orders?: number;
  close_order?: {
    id?: number;
    price?: string;
    is_liq?: boolean;
  } | null;
  mode?: 'single' | 'dual_long' | 'dual_short';
  cross_leverage_limit?: string;
  update_time?: number;
  open_time?: number;
}

export interface FuturesTradingHistoryRecord {
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
  close_size: number;
}

export interface FuturesPositionHistoryRecord {
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
  accum_size: string;
}

export interface FuturesLiquidationHistoryRecord {
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
export interface FuturesAutoDeleveragingHistoryRecord {
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

export interface FuturesContract {
  name?: string;
  type?: 'inverse' | 'direct';
  quanto_multiplier?: string;
  leverage_min?: string;
  leverage_max?: string;
  maintenance_rate?: string;
  mark_type?: 'internal' | 'index';
  mark_price?: string;
  index_price?: string;
  last_price?: string;
  maker_fee_rate?: string;
  taker_fee_rate?: string;
  order_price_round?: string;
  mark_price_round?: string;
  funding_rate?: string;
  funding_interval?: number;
  funding_next_apply?: number;
  risk_limit_base?: string;
  risk_limit_step?: string;
  risk_limit_max?: string;
  order_size_min?: number;
  order_size_max?: number;
  order_price_deviate?: string;
  ref_discount_rate?: string;
  ref_rebate_rate?: string;
  orderbook_id?: number;
  trade_id?: number;
  trade_size?: number;
  position_size?: number;
  config_change_time?: number;
  in_delisting?: boolean;
  orders_limit?: number;
  enable_bonus?: boolean;
  enable_credit?: boolean;
  create_time?: number;
  funding_cap_ratio?: string;
}

export interface FuturesPriceTriggeredOrder {
  initial: {
    contract: string;
    size?: number;
    price?: string;
    close?: boolean;
    tif?: 'gtc' | 'ioc';
    text?: string;
    reduce_only?: boolean;
    auto_size?: string;
    is_reduce_only?: boolean;
    is_close?: boolean;
  };
  trigger: {
    strategy_type?: 0 | 1;
    price_type?: 0 | 1 | 2;
    price?: string;
    rule?: 1 | 2;
    expiration?: number;
  };
  id?: number;
  user?: number;
  create_time?: number;
  finish_time?: number;
  trade_id?: number;
  status?: 'open' | 'finished' | 'inactive' | 'invalid';
  finish_as?: 'cancelled' | 'succeeded' | 'failed' | 'expired';
  reason?: string;
  order_type?:
    | 'close-long-order'
    | 'close-short-order'
    | 'close-long-position'
    | 'close-short-position'
    | 'plan-close-long-position'
    | 'plan-close-short-position';
  me_order_id?: number;
}

export interface FuturesDeliveryContract {
  name?: string;
  underlying?: string;
  cycle?: 'WEEKLY' | 'BI-WEEKLY' | 'QUARTERLY' | 'BI-QUARTERLY';
  type?: 'inverse' | 'direct';
  quanto_multiplier?: string;
  leverage_min?: string;
  leverage_max?: string;
  maintenance_rate?: string;
  mark_type?: 'internal' | 'index';
  mark_price?: string;
  index_price?: string;
  last_price?: string;
  maker_fee_rate?: string;
  taker_fee_rate?: string;
  order_price_round?: string;
  mark_price_round?: string;
  basis_rate?: string;
  basis_value?: string;
  basis_impact_value?: string;
  settle_price?: string;
  settle_price_interval?: number;
  settle_price_duration?: number;
  expire_time?: number;
  risk_limit_base?: string;
  risk_limit_step?: string;
  risk_limit_max?: string;
  order_size_min?: number;
  order_size_max?: number;
  order_price_deviate?: string;
  ref_discount_rate?: string;
  ref_rebate_rate?: string;
  orderbook_id?: number;
  trade_id?: number;
  trade_size?: number;
  position_size?: number;
  config_change_time?: number;
  in_delisting?: boolean;
  orders_limit?: number;
}

export interface BatchAmendOrderResp {
  succeeded: boolean;
  label?: string;
  detail?: string;
  id: number;
  user: number;
  create_time: number;
  finish_time?: number;
  finish_as?:
    | 'filled'
    | 'cancelled'
    | 'liquidated'
    | 'ioc'
    | 'auto_deleveraged'
    | 'reduce_only'
    | 'position_closed'
    | 'reduce_out'
    | 'stp';
  status: 'open' | 'finished';
  contract: string;
  size: number;
  iceberg: number;
  price: string;
  is_close: boolean;
  is_reduce_only: boolean;
  is_liq: boolean;
  tif: 'gtc' | 'ioc' | 'poc' | 'fok';
  left: number;
  fill_price: string;
  text: string;
  tkfr: string;
  mkfr: string;
  refu: number;
  stp_act: 'co' | 'cn' | 'cb' | '-';
  stp_id: number;
}
