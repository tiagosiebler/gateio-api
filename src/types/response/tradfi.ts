/** TradFi API response types */

export interface TradFiApiResp<T> {
  timestamp?: number;
  data?: T;
  code?: number;
  message?: string;
  label?: string;
}

export interface TradFiListData<T> {
  list?: T[];
  total?: number;
  total_page?: number;
}

export interface TradFiMT5Account {
  mt5_uid?: number;
  leverage?: number;
  stop_out_level?: string;
  status?: number;
}

export interface TradFiCategoryItem {
  category_id?: number;
  is_favorite?: boolean;
  category_name?: string;
}

export interface TradFiSymbolItem {
  symbol?: string;
  symbol_desc?: string;
  category_id?: number;
  status?: string;
  trade_mode?: string;
  icon_link?: string;
  close_time?: number;
  open_time?: number;
  next_open_time?: number;
  settlement_currency?: string;
  settlement_currency_symbol?: string;
  price_precision?: number;
}

export interface TradFiSymbolDetailItem {
  symbol?: string;
  symbol_desc?: string;
  category_name?: string;
  contract_volume?: string;
  settlement_currency?: string;
  max_order_volume?: string;
  min_order_volume?: string;
  leverage?: string;
  price_precision?: number;
  price_sl_level?: string;
  swap_cost_type?: string;
  buy_swap_cost_rate?: string;
  sell_swap_cost_rate?: string;
  swap_cost_3day?: string;
  trade_timezone?: string;
  trade_mode?: string;
  icon_link?: string;
  [key: string]: unknown;
}

export interface TradFiKlineItem {
  o?: string;
  c?: string;
  h?: string;
  l?: string;
  t?: number;
}

export interface TradFiTicker {
  highest_price?: string;
  lowest_price?: string;
  price_change?: string;
  price_change_amount?: string;
  today_open_price?: string;
  last_today_close_price?: string;
  last_price?: string;
  bid_price?: string;
  ask_price?: string;
  favorite?: boolean;
  status?: string;
  close_time?: number;
  open_time?: number;
  next_open_time?: number;
  trade_mode?: string;
  category_name?: string;
}

export interface TradFiCreateUserResult {
  status?: number;
  leverage?: number;
  mt5_uid?: string;
}

export interface TradFiAssets {
  equity?: string;
  margin_level?: string;
  balance?: string;
  margin?: string;
  margin_free?: string;
  unrealized_pnl?: string;
  mt5_uid?: string;
}

export interface TradFiTransactionRecord {
  asset?: string;
  type?: string;
  type_desc?: string;
  change?: string;
  balance?: string;
  time?: number;
}

export interface TradFiTransactionListData {
  total?: number;
  total_page?: number;
  list?: TradFiTransactionRecord[];
}

export interface TradFiCreateOrderResult {
  id?: string;
}

export interface TradFiOrderItem {
  order_id?: number;
  symbol?: string;
  symbol_desc?: string;
  price_type?: string;
  state?: number;
  state_desc?: string;
  finished?: number;
  side?: number;
  volume?: string;
  price?: string;
  price_tp?: string;
  price_sl?: string;
  time_setup?: number;
}

export interface TradFiOrderListData {
  list?: TradFiOrderItem[];
  timestamp?: number;
}

export interface TradFiModifyOrderResult {
  order_id?: number;
  symbol?: string;
  state?: string;
  volume?: string;
  price?: string;
  price_tp?: string;
  price_sl?: string;
}

export interface TradFiOrderHistoryItem {
  order_id?: number;
  symbol?: string;
  symbol_desc?: string;
  price_type?: string;
  order_opt_type?: number;
  state?: number;
  state_desc?: string;
  side?: number;
  volume?: string;
  fill_volume?: string;
  close_pnl?: string;
  price?: string;
  trigger_price?: string;
  price_tp?: string;
  price_sl?: string;
  time_setup?: number;
  time_done?: number;
}

export interface TradFiPositionItem {
  position_id?: number;
  symbol?: string;
  symbol_desc?: string;
  margin?: string;
  unrealized_pnl?: string;
  unrealized_pnl_rate?: string;
  volume?: string;
  price_open?: string;
  position_dir?: string;
  price_tp?: string;
  price_sl?: string;
  counterparty_price?: string;
  time_create?: number;
}

export interface TradFiPositionListData {
  list?: TradFiPositionItem[];
  timestamp?: number;
}

export interface TradFiPositionHistoryItem {
  position_id?: number;
  symbol?: string;
  realized_pnl?: string;
  realized_pnl_rate?: string;
  volume?: string;
  volume_closed?: string;
  price_open?: string;
  position_dir?: string;
  price_tp?: string;
  price_sl?: string;
  counterparty_price?: string;
  close_price?: string;
  time_create?: string;
  time_close?: string;
  position_status?: string;
  close_detail?: Record<string, unknown> | null;
  realized_pnl_detail?: {
    closed_pnl?: string;
    swap?: string;
    fee?: string;
  };
}

/** GET /tradfi/orders/log/{log_id} — v4.106.94 */
export interface TradFiOrderLog {
  order_id?: number;
  log_id?: number;
  symbol?: string;
  price_type?: 'market' | 'trigger';
  state?: number;
  side?: number;
  volume?: string;
  price?: string;
  [key: string]: unknown;
}
