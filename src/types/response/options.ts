/**==========================================================================================================================
 * OPTIONS
 * ==========================================================================================================================
 */

export interface GetOptionsContractsResp {
  name: string;
  tag: string;
  create_time: number;
  expiration_time: number;
  is_call: boolean;
  strike_price: string;
  last_price: string;
  mark_price: string;
  orderbook_id: number;
  trade_id: number;
  trade_size: number;
  position_size: number;
  underlying: string;
  underlying_price: string;
  multiplier: string;
  order_price_round: string;
  mark_price_round: string;
  maker_fee_rate: string;
  taker_fee_rate: string;
  price_limit_fee_rate: string;
  ref_discount_rate: string;
  ref_rebate_rate: string;
  order_price_deviate: string;
  order_size_min: number;
  order_size_max: number;
  orders_limit: number;
}

export interface GetOptionsSettlementHistoryResp {
  time: number;
  contract: string;
  profit: string;
  fee: string;
  strike_price: string;
  settle_price: string;
}

export interface GetOptionsMySettlementsResp {
  time: number;
  underlying: string;
  contract: string;
  strike_price: string;
  settle_price: string;
  size: number;
  settle_profit: string;
  fee: string;
  realised_pnl: string;
}

export interface GetOptionsOrderBookResp {
  id?: number;
  current: number;
  update: number;
  asks: { p: string; s: number }[];
  bids: { p: string; s: number }[];
}

export interface GetOptionsTickersResp {
  name: string;
  last_price: string;
  mark_price: string;
  index_price: string;
  ask1_size: number;
  ask1_price: string;
  bid1_size: number;
  bid1_price: string;
  position_size: number;
  mark_iv: string;
  bid_iv: string;
  ask_iv: string;
  leverage: string;
  delta: string;
  gamma: string;
  vega: string;
  theta: string;
  rho: string;
}

export interface GetOptionsCandlesticksResp {
  t: number;
  v?: number;
  c: string;
  h: string;
  l: string;
  o: string;
}

export interface GetOptionsUnderlyingCandlesticksResp {
  t: number;
  v?: number;
  c: string;
  h: string;
  l: string;
  o: string;
  sum: string;
}

export interface GetOptionsTradesResp {
  id: number;
  create_time: number;
  create_time_ms: number;
  contract: string;
  size: number;
  price: string;
  is_internal?: boolean;
}

export interface GetOptionsAccountResp {
  user: number;
  total: string;
  short_enabled: boolean;
  unrealised_pnl: string;
  init_margin: string;
  maint_margin: string;
  order_margin: string;
  available: string;
  point: string;
  currency: string;
}
export interface GetOptionsAccountChangeResp {
  time: number;
  change: string;
  balance: string;
  type: 'dnw' | 'prem' | 'fee' | 'refr' | 'set';
  text: string;
}

export interface GetOptionsPositionsUnderlyingResp {
  user: number;
  underlying: string;
  underlying_price: string;
  contract: string;
  size: number;
  entry_price: string;
  mark_price: string;
  mark_iv: string;
  realised_pnl: string;
  unrealised_pnl: string;
  pending_orders: number;
  close_order: {
    id: number;
    price: string;
    is_liq: boolean;
  } | null;
  delta: string;
  gamma: string;
  vega: string;
  theta: string;
}

export interface GetOptionsLiquidationResp {
  time: number;
  contract: string;
  side: 'long' | 'short';
  pnl: string;
  text: string;
  settle_size: string;
}

export interface SubmitOptionsOrderResp {
  id: number;
  user: number;
  create_time: number;
  finish_time: number;
  finish_as:
    | 'filled'
    | 'cancelled'
    | 'liquidated'
    | 'ioc'
    | 'auto_deleveraged'
    | 'reduce_only'
    | 'position_closed';
  status: 'open' | 'finished';
  contract: string;
  size: number;
  iceberg: number;
  price: string;
  is_close: boolean;
  is_reduce_only: boolean;
  is_liq: boolean;
  tif: 'gtc' | 'ioc' | 'poc';
  left: number;
  fill_price: string;
  text: string;
  tkfr: string;
  mkfr: string;
  refu: number;
  refr: string;
}

export interface GetOptionsPersonalHistoryResp {
  id: number;
  create_time: number;
  contract: string;
  order_id: number;
  size: number;
  price: string;
  underlying_price: string;
  role: 'taker' | 'maker';
}
