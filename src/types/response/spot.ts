/**==========================================================================================================================
 * SPOT
 * ==========================================================================================================================
 */

export interface SpotCurrency {
  currency: string;
  delisted: boolean;
  withdraw_disabled: boolean;
  withdraw_delayed: boolean;
  deposit_disabled: boolean;
  trade_disabled: boolean;
  fixed_rate: string;
  chain: string;
}

export interface SpotTicker {
  currency_pair: string;
  last: string;
  lowest_ask: string;
  highest_bid: string;
  change_percentage: string;
  change_utc0: string;
  change_utc8: string;
  base_volume: string;
  quote_volume: string;
  high_24h: string;
  low_24h: string;
  etf_net_value: string;
  etf_pre_net_value: string | null;
  etf_pre_timestamp: number | null;
  etf_leverage: string | null;
}

export interface SpotOrderBook {
  id?: number;
  current: number;
  update: number;
  asks: [string, string][];
  bids: [string, string][];
}

export interface SpotTrade {
  id: string;
  create_time: string;
  create_time_ms: string;
  currency_pair: string;
  side: 'buy' | 'sell';
  role: 'taker' | 'maker';
  amount: string;
  price: string;
  order_id: string;
  fee: string;
  fee_currency: string;
  point_fee: string;
  gt_fee: string;
  amend_text: string;
  sequence_id: string;
  text: string;
}

export type SpotCandle = [
  string, // Unix timestamp with second precision
  string, // Trading volume in quote currency
  string, // Closing price
  string, // Highest price
  string, // Lowest price
  string, // Opening price
  string, // Trading volume in base currency
  boolean, // Whether the window is closed
];

export interface SpotFeeRates {
  user_id: number;
  taker_fee: string;
  maker_fee: string;
  gt_discount: boolean;
  gt_taker_fee: string;
  gt_maker_fee: string;
  loan_fee: string;
  point_type: string;
  currency_pair: string;
  debit_fee: number;
}

export interface SpotAccount {
  currency: string;
  available: string;
  locked: string;
  update_id: number;
}

export interface SpotAccountBook {
  id: string;
  time: number;
  currency: string;
  change: string;
  balance: string;
  type: string;
  text: string;
}

export interface SubmitSpotBatchOrdersResp {
  order_id: string;
  amend_text: string;
  text: string;
  succeeded: boolean;
  label: string;
  message: string;
  id: string;
  create_time: string;
  update_time: string;
  create_time_ms: number;
  update_time_ms: number;
  status: 'open' | 'closed' | 'cancelled';
  currency_pair: string;
  type: 'limit' | 'market';
  account: 'spot' | 'margin' | 'cross_margin' | 'unified';
  side: 'buy' | 'sell';
  amount: string;
  price: string;
  time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
  iceberg: string;
  auto_repay: boolean;
  left: string;
  filled_amount: string;
  fill_price: string;
  filled_total: string;
  avg_deal_price: string;
  fee: string;
  fee_currency: string;
  point_fee: string;
  gt_fee: string;
  gt_discount: boolean;
  rebated_fee: string;
  rebated_fee_currency: string;
  stp_id: number;
  stp_act: 'cn' | 'co' | 'cb' | '-';
  finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
}

export interface SpotOrder {
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

export interface GetSpotOpenOrdersResp {
  currency_pair: string;
  total: number;
  orders: SpotOrder[];
}

export interface DeleteSpotBatchOrdersResp {
  currency_pair: string;
  id: string;
  succeeded: boolean;
  label: string;
  message: string;
  account: string;
  text: string;
}

export interface SpotHistoricTradeRecord {
  id: string;
  create_time: string;
  create_time_ms: string;
  currency_pair: string;
  side: 'buy' | 'sell';
  role: 'taker' | 'maker';
  amount: string;
  price: string;
  order_id: string;
  fee: string;
  fee_currency: string;
  point_fee: string;
  gt_fee: string;
  amend_text: string;
  sequence_id: string;
  text: string;
}
