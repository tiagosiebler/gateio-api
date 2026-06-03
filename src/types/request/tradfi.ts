/** TradFi API request types */

export interface TradFiGetSymbolDetailParams {
  symbols: string;
}

export interface TradFiGetKlinesParams {
  kline_type: '1m' | '15m' | '1h' | '4h' | '1d' | '7d' | '30d';
  begin_time?: number;
  end_time?: number;
  limit?: number;
}

export interface TradFiCreateTransactionReq {
  asset: string;
  change: string;
  type: 'deposit' | 'withdraw';
}

export interface TradFiGetTransactionsParams {
  begin_time?: number;
  end_time?: number;
  type?: 'deposit' | 'withdraw' | 'dividend' | 'fill_negative';
  page?: number;
  page_size?: number;
}

export interface TradFiCreateOrderReq {
  price: string;
  price_type: 'trigger' | 'market';
  side: 1 | 2;
  symbol: string;
  volume: string;
  price_tp?: string;
  price_sl?: string;
}

export interface TradFiModifyOrderReq {
  price: string;
  price_tp?: string | null;
  price_sl?: string | null;
}

export interface TradFiModifyPositionReq {
  price_tp?: string | null;
  price_sl?: string | null;
}

export interface TradFiClosePositionReq {
  close_type: 1 | 2;
  close_volume?: string | null;
}

export interface TradFiGetOrderHistoryParams {
  begin_time?: number;
  end_time?: number;
  symbol?: string;
  side?: 1 | 2;
}

export interface TradFiGetPositionHistoryParams {
  begin_time?: number;
  end_time?: number;
  symbol?: string;
  position_dir?: 'Long' | 'Short';
  page?: number;
  page_size?: number;
}
