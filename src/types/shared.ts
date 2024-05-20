export type GateBaseUrlKey =
  | 'live'
  | 'futuresLiveAlternative'
  | 'futuresTestnet';

// interfaces

export interface SubAccountKey {
  user_id?: string;
  mode?: number;
  name?: string;
  perms?: {
    name?:
      | 'wallet'
      | 'spot'
      | 'futures'
      | 'delivery'
      | 'earn'
      | 'options'
      | 'account'
      | 'unified'
      | 'loan';
    read_only?: boolean;
  }[];
  ip_whitelist?: string[];
  key?: string;
  state?: number;
  created_at?: number;
  updated_at?: number;
  last_access?: number;
}

export interface CurrencyPair {
  id?: string;
  base?: string;
  quote?: string;
  fee?: string;
  min_base_amount?: string;
  min_quote_amount?: string;
  max_base_amount?: string;
  max_quote_amount?: string;
  amount_precision?: number;
  precision?: number;
  trade_status?: 'untradable' | 'buyable' | 'sellable' | 'tradable';
  sell_start?: number;
  buy_start?: number;
}

export interface Order {
  id?: string;
  text?: string;
  amend_text?: string;
  create_time?: string;
  update_time?: string;
  create_time_ms?: number;
  update_time_ms?: number;
  status?: 'open' | 'closed' | 'cancelled';
  currency_pair: string;
  type?: 'limit' | 'market';
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  side: 'buy' | 'sell';
  amount: string;
  price?: string;
  time_in_force?: 'gtc' | 'ioc' | 'poc' | 'fok';
  iceberg?: string;
  auto_borrow?: boolean;
  auto_repay?: boolean;
  left?: string;
  filled_amount?: string;
  fill_price?: string;
  filled_total?: string;
  avg_deal_price?: string;
  fee?: string;
  fee_currency?: string;
  point_fee?: string;
  gt_fee?: string;
  gt_maker_fee?: string;
  gt_taker_fee?: string;
  gt_discount?: boolean;
  rebated_fee?: string;
  rebated_fee_currency?: string;
  stp_id?: number;
  stp_act?: 'cn' | 'co' | 'cb' | '-';
  finish_as?: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}

export interface CancelBatchOrder {
  currency_pair: string;
  id: string;
  account?: 'cross_margin';
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}

export interface SpotPriceTriggeredOrder {
  trigger: {
    price: string;
    rule: '>=' | '<=';
    expiration: number;
  };
  put: {
    type?: 'limit' | 'market';
    side: 'buy' | 'sell';
    price: string;
    amount: string;
    account: 'normal' | 'margin' | 'cross_margin';
    time_in_force?: 'gtc' | 'ioc';
    text?: string;
  };
  id?: number;
  user?: number;
  market: string;
  ctime?: number;
  ftime?: number;
  fired_order_id?: number;
  status?: 'open' | 'cancelled' | 'finish' | 'failed' | 'expired';
  reason?: string;
}

export interface Contract {
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

export interface Position {
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

export interface DeliveryContract {
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

export interface Withdraw {
  id: string;
  txid: string;
  withdraw_order_id: string;
  timestamp: string;
  amount: string;
  currency: string;
  address: string;
  memo?: string;
  status:
    | 'DONE'
    | 'CANCEL'
    | 'REQUEST'
    | 'MANUAL'
    | 'BCODE'
    | 'EXTPEND'
    | 'FAIL'
    | 'INVALID'
    | 'VERIFY'
    | 'PROCES'
    | 'PEND'
    | 'DMOVE'
    | 'SPLITPEND';
  chain: string;
}
