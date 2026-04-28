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
  is_internal?: boolean; // Deprecated
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
  quanto_base_rate?: string; // Deprecated
  basis_rate: string;
  basis_value: string;
  lowest_ask: string;
  highest_bid: string;
  lowest_size: string;
  highest_size: string;
}

export interface BatchFundingRatesResponse {
  contract?: string;
  data?: { t: number; r: string }[];
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
  order_size: number;
  order_price: string;
  fill_price: string;
  left: number;
}

export interface RiskLimitTier {
  tier: number;
  risk_limit: string;
  initial_rate: string;
  maintenance_rate: string; // First-tier maintenance margin rate requirement
  leverage_max: string;
  contract: string;
}

export interface FuturesAccount {
  total: string; // Balance, only applicable to classic contract account
  unrealised_pnl: string;
  position_margin?: string; // Deprecated
  order_margin: string; // Initial margin for all pending orders
  available: string;
  point: string;
  currency: string;
  in_dual_mode: boolean;
  position_mode?: string; // Position mode: single - one-way, dual - dual-side, split - sub-positions (in_dual_mode is deprecated)
  enable_credit: boolean;
  position_initial_margin: string;
  maintenance_margin: string;
  bonus: string;
  enable_evolved_classic?: boolean; // Deprecated
  cross_order_margin: string;
  cross_initial_margin: string;
  cross_maintenance_margin: string;
  cross_unrealised_pnl: string;
  cross_available: string;
  cross_margin_balance: string;
  cross_mmr: string;
  cross_imr: string;
  isolated_position_margin: string;
  enable_new_dual_mode?: boolean; // Deprecated
  margin_mode: number; // 0: classic future account or Classic Spot Margin Mode of unified account; 1: Multi-Currency Margin Mode; 2: Portfolio Margin Mode; 3: Single-Currency Margin Mode
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
  enable_tiered_mm: boolean;
  funding_balance?: string;
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
  /**
   * Final state; **ioc** / **poc** reflect unfilled remainder cancelled by TIF (IOC vs post-only / maker).
   */
  finish_as?:
    | 'filled'
    | 'cancelled'
    | 'liquidated'
    | 'ioc'
    | 'poc'
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
  /** Read-only; order notional in settle currency (API response only; omit from order requests). */
  order_value?: string;
  /** Read-only; traded value (API response only; omit from order requests). */
  trade_value?: string;
}

/** Item shape for `GET /futures/{settle}/orders_timerange` (differs from {@link FuturesOrder} in field types). */
export interface FuturesOrderTimerange {
  id?: number;
  user?: number;
  create_time?: number;
  update_time?: string;
  finish_time?: string;
  contract: string;
  size: string;
  iceberg?: string;
  is_close?: boolean;
  is_reduce_only?: boolean;
  is_liq?: boolean;
  left?: string;
  fill_price?: string;
  tkfr?: string;
  mkfr?: string;
  refu?: number;
  amend_text?: string;
  pid?: number;
  market_order_slip_ratio?: string;
  pos_margin_mode?: string;
}

export interface FuturesPosition {
  user?: number;
  contract?: string;
  size?: number;
  leverage?: string; // Isolated margin leverage, 0 indicates cross margin mode
  risk_limit?: string;
  leverage_max?: string; // Max leverage based on current position size
  maintenance_rate?: string; // Tiered maintenance margin rate calculation
  value?: string;
  margin?: string;
  entry_price?: string;
  liq_price?: string; // Estimated liquidation price for reference only
  liquidation_price?: string; // v4.105.7: Add liquidation_price field for better risk management
  mark_price?: string;
  initial_margin?: string; // Expanded scope description
  maintenance_margin?: string; // Expanded scope description
  unrealised_pnl?: string;
  realised_pnl?: string; // Detailed breakdown including settlement, funding fees, and trading fees
  pnl_pnl?: string; // Settlement P&L
  pnl_fund?: string; // Funding fee P&L
  pnl_fee?: string; // Total trading fees
  history_pnl?: string; // All historical settlement P&L
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
  cross_leverage_limit?: string; // Simplified description
  update_time?: number;
  update_id?: number;
  open_time?: number;
  settlement_currency?: string; // v4.105.9: Add settlement_currency field for multi-settlement support
  isolated_margin?: string; // v4.104.6: Add isolated_margin field
  pid?: number; // v4.106.0: Sub-position ID
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
  leverage: string; // Clarified for better understanding of margin modes
  cross_leverage_limit: string; // Clarified for better understanding of margin modes
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
  /** Contract classification (e.g. stocks, metals, indices, forex, commodities). */
  contract_type?: string;
  type?: 'inverse' | 'direct';
  quanto_multiplier?: string; // Conceptually renamed to "contract multiplier"
  leverage_min?: string;
  leverage_max?: string;
  maintenance_rate?: string; // First-tier maintenance margin rate requirement
  mark_type?: 'internal' | 'index'; // Deprecated
  mark_price?: string;
  index_price?: string;
  last_price?: string;
  maker_fee_rate?: string;
  taker_fee_rate?: string;
  order_price_round?: string;
  mark_price_round?: string; // Minimum unit of mark price
  order_price_deviate?: string;
  ref_discount_rate?: string;
  ref_rebate_rate?: string;
  funding_rate?: string;
  funding_rate_indicative?: string;
  funding_interval?: number;
  funding_next_apply?: number;
  funding_offset?: number;
  /** Interest rate ratio (string); returned by GET /futures/{settle}/contracts and GET /futures/{settle}/contracts/{contract}. */
  interest_rate?: string;
  risk_limit_base?: string;
  risk_limit_step?: string;
  risk_limit_max?: string;
  order_size_min?: string | number; // API returns string e.g. "1"
  order_size_max?: string | number; // API returns string e.g. "1000000"
  orderbook_id?: number;
  trade_id?: number;
  trade_size?: string | number; // API returns string
  position_size?: string | number; // API returns string
  short_users?: number;
  long_users?: number;
  funding_impact_value?: string;
  config_change_time?: number;
  in_delisting?: boolean;
  orders_limit?: number;
  enable_bonus?: boolean;
  enable_credit?: boolean;
  /** When true, contract supports decimal contract size (size field can use decimal string). When false, size only supports integer type. */
  enable_decimal?: boolean;
  create_time?: number;
  launch_time?: number;
  delisting_time?: number;
  delisted_time?: number;
  status?: string; // e.g. "trading"
  funding_cap_ratio?: string; // Deprecated
  funding_rate_limit?: string; // v4.106.4: Funding rate cap value
  market_order_slip_ratio?: string;
  market_order_size_max?: string;
}

/** GET /futures/{settle}/get_leverage/{contract} — API field name is `Lever` */
export interface FuturesContractLeverageInfo {
  Lever: string;
}

/** Create/amend response for futures price-trigger orders (`/futures/{settle}/price_orders`). */
export interface TriggerOrderResponse {
  id?: number;
  /**
   * Same order as numeric `id`, as decimal string (int64-safe in JS); prefer for display or string keys.
   */
  id_string?: string;
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
  id?: number; // int64 price-triggered order id
  /**
   * Same order as numeric `id`, as decimal string (int64-safe in JS); prefer for display or string keys.
   */
  id_string?: string;
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
  me_order_id?: number; // int64
}

export interface FuturesDeliveryContract {
  name?: string;
  /** Contract classification (e.g. stocks, metals, indices, forex, commodities). */
  contract_type?: string;
  underlying?: string;
  cycle?: 'WEEKLY' | 'BI-WEEKLY' | 'QUARTERLY' | 'BI-QUARTERLY';
  type?: 'inverse' | 'direct';
  quanto_multiplier?: string; // Conceptually renamed to "contract multiplier"
  leverage_min?: string;
  leverage_max?: string;
  maintenance_rate?: string; // First-tier maintenance margin rate requirement
  mark_type?: 'internal' | 'index'; // Deprecated
  mark_price?: string;
  index_price?: string;
  last_price?: string;
  maker_fee_rate?: string;
  taker_fee_rate?: string;
  order_price_round?: string;
  mark_price_round?: string; // Minimum unit of mark price
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
  /**
   * Final state; **ioc** / **poc** reflect unfilled remainder cancelled by TIF (IOC vs post-only / maker).
   */
  finish_as?:
    | 'filled'
    | 'cancelled'
    | 'liquidated'
    | 'ioc'
    | 'poc'
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

/**
 * @deprecated - Use FuturesAccount instead
 */
export interface UpdateFuturesDualModeResp {
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

export interface RiskLimitTableTier {
  tier: number;
  risk_limit: string;
  initial_rate: string;
  maintenance_rate: string; // First-tier maintenance margin rate requirement
  leverage_max: string;
  deduction: string;
}

// v4.104.6: New GET /futures/{settle}/insurance endpoint types
export interface FuturesInsuranceHistory {
  t: number;
  b: string;
}

/** Trail order (autoorder/v1/trail) response types */
export interface TrailOrder {
  id?: number | string;
  user_id?: number | string;
  user?: number | string;
  contract?: string;
  settle?: string;
  amount?: string;
  is_gte?: boolean;
  activation_price?: string;
  price_type?: number;
  price_offset?: string;
  text?: string;
  reduce_only?: boolean;
  position_related?: boolean;
  created_at?: number | string;
  activated_at?: number | string;
  finished_at?: number | string;
  create_time?: number | string;
  active_time?: number | string;
  finish_time?: number | string;
  reason?: string;
  suborder_text?: string;
  is_dual_mode?: boolean;
  trigger_price?: string;
  suborder_id?: number | string;
  side_label?: string;
  original_status?: number;
  status?: string;
  position_side_output?: string;
  updated_at?: number | string;
  extremum_price?: string;
  status_code?: string;
  created_at_precise?: string;
  finished_at_precise?: string;
  activated_at_precise?: string;
  status_label?: string;
  pos_margin_mode?: string;
  position_mode?: string;
  error_label?: string;
  leverage?: string;
  [key: string]: unknown;
}

export interface TrailChangeLog {
  updated_at?: number;
  amount?: string;
  is_gte?: boolean;
  activation_price?: string;
  price_type?: number;
  price_offset?: string;
  is_create?: boolean;
}
