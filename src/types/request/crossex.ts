/**==========================================================================================================================
 * CROSSEX
 * ==========================================================================================================================
 */

export interface GetCrossExSymbolsReq {
  symbols?: string; // Trading Pair List, multiple separated by commas
}

export interface GetCrossExRiskLimitsReq {
  symbols: string; // Trading Pair List, multiple separated by commas
}

export interface GetCrossExTransferCoinsReq {
  coin?: string; // Currency
}

export interface CreateCrossExTransferReq {
  coin: string; // Currency
  amount: string; // Transfer amount
  from: string; // Transfer-in account: CROSSEX_BINANCE, CROSSEX_OKX, CROSSEX_GATE, CROSSEX, SPOT
  to: string; // Transfer-out account: CROSSEX_BINANCE, CROSSEX_OKX, CROSSEX_GATE, CROSSEX, SPOT
  text?: string; // User-defined ID
}

export interface GetCrossExTransferHistoryReq {
  coin?: string; // Query by specified currency name
  order_id?: string; // Supports querying by the order ID returned when creating an order (tx_id), as well as a user-defined custom ID specified at creation (text)
  from?: number; // Start timestamp for the query
  to?: number; // End timestamp for the query, defaults to current time if not specified
  page?: number; // Page number
  limit?: number; // Maximum number returned by list, max 1000
}

export interface CreateCrossExOrderReq {
  text?: string; // Client-defined Order ID, supports letters (a-z), numbers (0-9), symbols (-, _) only
  symbol: string; // Unique identifier Exchange_Business_Base_Counter
  side: 'BUY' | 'SELL';
  type?: 'LIMIT' | 'MARKET'; // Order type (default: LIMIT)
  time_in_force?: 'GTC' | 'IOC' | 'FOK' | 'POC'; // Default GTC
  qty?: string; // Order quantity (required unless spot market buy)
  price?: string; // Limit Order Price (Required for Limit Orders)
  quote_qty?: string; // Order quote quantity; required for spot and margin market buy orders
  reduce_only?: 'true' | 'false'; // Reduce-only
  position_side?: 'LONG' | 'SHORT' | 'NONE'; // Position side, defaults to NONE (single position mode) if not specified
}

export interface ModifyCrossExOrderReq {
  qty?: string; // modify amount
  price?: string; // modify price
}

export interface CreateCrossExConvertQuoteReq {
  exchange_type: string; // Exchange Type
  from_coin: string; // Asset Sold
  to_coin: string; // Asset name to buy (OKX and GATE only allow BTC, ETH, USDT; BN only allows USDT)
  from_amount: string; // Amount to sell
}

export interface CreateCrossExConvertOrderReq {
  quote_id: string; // Inquiry ID
}

export interface UpdateCrossExAccountReq {
  position_mode?: string; // Futures position mode (SINGLE/DUAL)
  account_mode?: string; // Account mode (CROSS_EXCHANGE/ISOLATED_EXCHANGE, default: CROSS_EXCHANGE)
  exchange_type?: string; // Exchange (BINANCE/OKX/GATE/CROSSEX)
}

export interface GetCrossExAccountsReq {
  exchange_type?: string; // Exchange. Not required in cross-exchange mode; required in single-exchange mode (BINANCE/OKX/GATE)
}

export interface SetCrossExPositionLeverageReq {
  symbol: string; // Currency pair
  leverage: string; // leverage
}

export interface GetCrossExPositionLeverageReq {
  symbols?: string; // Trading Pair List, multiple separated by commas
}

export interface SetCrossExMarginPositionLeverageReq {
  symbol: string; // Currency pair
  leverage: string; // leverage
}

export interface GetCrossExMarginPositionLeverageReq {
  symbols?: string; // Trading Pair List, multiple separated by commas
}

export interface CloseCrossExPositionReq {
  symbol: string; // Trading Pair
  position_side?: string; // Position Direction
}

export interface GetCrossExInterestRateReq {
  coin?: string; // Currency
  exchange_type?: string; // Exchange
}

export interface GetCrossExPositionsReq {
  symbol?: string; // Trading Pair
  exchange_type?: string; // Exchange
}

export interface GetCrossExMarginPositionsReq {
  symbol?: string; // Currency pair
  exchange_type?: string; // Exchange
}

export interface GetCrossExAdlRankReq {
  symbol: string; // Trading Pair
}

export interface GetCrossExOpenOrdersReq {
  symbol?: string; // Trading Pair
  exchange_type?: string; // Exchange
  business_type?: string; // Business Type
}

export interface GetCrossExHistoryOrdersReq {
  page?: number; // Page number
  limit?: number; // Maximum number of records returned in a single list
  symbol?: string;
  from?: number; // Start Millisecond Timestamp
  to?: number; // End Millisecond Timestamp
}

export interface GetCrossExHistoryPositionsReq {
  page?: number; // Page number
  limit?: number; // Maximum number returned by list, max 1000
  symbol?: string;
  from?: number; // Start Millisecond Timestamp
  to?: number; // End Millisecond Timestamp
}

export interface GetCrossExHistoryMarginPositionsReq {
  page?: number; // Page number
  limit?: number; // Maximum number returned by list, max 1000
  symbol?: string;
  from?: number; // Start Millisecond Timestamp
  to?: number; // End Millisecond Timestamp
}

export interface GetCrossExHistoryMarginInterestsReq {
  symbol?: string;
  from?: number;
  to?: number;
  page?: number;
  limit?: number;
  exchange_type?: string;
}

export interface GetCrossExHistoryTradesReq {
  page?: number; // Page number
  limit?: number; // Maximum number returned by list, max 1000
  symbol?: string;
  from?: number; // Start Millisecond Timestamp
  to?: number; // End Millisecond Timestamp
}

export interface GetCrossExAccountBookReq {
  page?: number; // Page number
  limit?: number; // Maximum number returned by list, max 1000
  coin?: string;
  from?: number; // Start Millisecond Timestamp
  to?: number; // End Millisecond Timestamp
}

export interface GetCrossExCoinDiscountRateReq {
  coin?: string;
  exchange_type?: string; // OKX/GATE/BINANCE
}
