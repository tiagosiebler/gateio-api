/**==========================================================================================================================
 * DELIVERY
 * ==========================================================================================================================
 */

export interface DeliveryOrderBook {
  id?: number;
  current: number;
  update: number;
  asks: { p: string; s: number }[];
  bids: { p: string; s: number }[];
}

export interface DeliveryTrade {
  id: number;
  create_time: number;
  create_time_ms: number;
  contract: string;
  size: number;
  price: string;
  is_internal?: boolean;
}

export interface DeliveryCandle {
  t: number;
  v?: number;
  c: string;
  h: string;
  l: string;
  o: string;
}

export interface DeliveryTicker {
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

export interface DeliveryAccount {
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

export interface DeliveryBook {
  time: number;
  change: string;
  balance: string;
  type:
    | 'dnw'
    | 'pnl'
    | 'fee'
    | 'refr'
    | 'fund'
    | 'point_dnw'
    | 'point_fee'
    | 'point_refr'
    | 'bonus_offset';
  text: string;
  contract?: string;
  trade_id?: string;
}

export interface DeliveryTradingHistoryRecord {
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

export interface DeliveryClosedPosition {
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

export interface DeliveryLiquidationHistoryRecord {
  time: number;
  contract: string;
  leverage?: string;
  size: number;
  margin?: string;
  entry_price?: string;
  liq_price?: string;
  mark_price?: string;
  order_id?: number;
  order_price: string;
  fill_price: string;
  left: number;
}

export interface DeliverySettlementHistoryRecord {
  time: number;
  contract: string;
  leverage: string;
  size: number;
  margin: string;
  entry_price: string;
  settle_price: string;
  profit: string;
  fee: string;
}
