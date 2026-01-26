/**==========================================================================================================================
 * ALPHA
 * ==========================================================================================================================
 */

export interface GetAlphaAccountBookReq {
  from: number; // Start timestamp for the query
  to?: number; // End timestamp for the query, defaults to current time if not specified
  page?: number; // Page number
  limit?: number; // Maximum 100 items per page
}

export interface CreateAlphaQuoteReq {
  currency: string; // Trading symbol
  side: 'buy' | 'sell'; // Buy or sell orders
  amount: string; // Trade Quantity (side: buy refers to quote currency USDT, side: sell refers to base currency)
  gas_mode: 'speed' | 'custom'; // Trading mode (speed: Smart mode, custom: Custom mode uses slippage parameter)
  slippage?: string; // Slippage tolerance (10 means 10% tolerance) - required when gas_mode is custom
}

export interface CreateAlphaOrderReq {
  currency: string; // Trading symbol
  side: 'buy' | 'sell'; // Buy or sell orders
  amount: string; // Trade Quantity (side: buy refers to quote currency USDT, side: sell refers to base currency)
  gas_mode: 'speed' | 'custom'; // Trading mode (speed: Smart mode, custom: Custom mode uses slippage parameter)
  slippage?: string; // Slippage tolerance (10 means 10% tolerance) - required when gas_mode is custom
  quote_id: string; // Quote ID returned from quotation API
}

export interface GetAlphaOrdersReq {
  currency: string; // Trading symbol
  side: 'buy' | 'sell'; // Buy or sell orders
  status: number; // Order Status (0: All, 1: Processing, 2: Successful, 3: Failed, 4: Cancelled, 5: Buy order placed but transfer not completed, 6: Order cancelled but transfer not completed)
  from?: number; // Start time for order query
  to?: number; // End time for order query, defaults to current time if not specified
  limit?: number; // Maximum number of items returned. Default: 100, minimum: 1, maximum: 100
  page?: number; // Page number
}

export interface GetAlphaOrderReq {
  order_id: string; // Order ID
}

export interface GetAlphaCurrenciesReq {
  currency?: string; // Query currency information by currency symbol
  limit?: number; // Maximum number of records returned in a single list
  page?: number; // Page number
}

export interface GetAlphaTickersReq {
  currency?: string; // Query by specified currency name
  limit?: number; // Maximum number of records returned in a single list
  page?: number; // Page number
}
