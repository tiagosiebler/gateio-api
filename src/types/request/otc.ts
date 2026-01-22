/**==========================================================================================================================
 * OTC
 * ==========================================================================================================================
 */

export interface CreateOTCQuoteReq {
  side: 'PAY' | 'GET'; // PAY means user inputs pay amount, GET means user inputs get amount
  pay_coin: string; // Currency the user pays
  get_coin: string; // Currency the user receives
  pay_amount?: string; // User payment currency amount (required if side is PAY)
  get_amount?: string; // Amount of currency received by user (required if side is GET)
  create_quote_token?: string; // Create quote token: 0: quote preview only; 1: generate quote token for order placement
  promotion_code?: string; // Promotion code (optional)
}

export interface CreateOTCFiatOrderReq {
  type: 'BUY' | 'SELL'; // BUY (on-ramp) or SELL (off-ramp)
  side: string; // Quote direction returned by the quote API (used for order validation)
  crypto_currency: string; // Cryptocurrency
  fiat_currency: string; // Fiat currency
  crypto_amount: string; // Amount of cryptocurrency
  fiat_amount: string; // Fiat amount
  promotion_code?: string; // Promotion code
  quote_token: string; // Parameter returned by the quote API
  bank_id: string; // Bank card ID used for the order (retrieved via the default bank card API)
}

export interface CreateOTCStablecoinOrderReq {
  pay_coin?: string; // Currency paid by the user
  get_coin?: string; // Currency to be received by the user
  pay_amount?: string; // User payment currency amount
  get_amount?: string; // Amount of currency received by the user
  side?: string; // Quote direction returned by the quote API (used for order validation)
  promotion_code?: string; // Promotion code
  quote_token?: string; // Parameter returned by the quote API
}

export interface MarkOTCOrderAsPaidReq {
  order_id: string; // Order ID
}

export interface CancelOTCOrderReq {
  order_id: string; // Order ID
}

export interface GetOTCFiatOrderListReq {
  type?: 'BUY' | 'SELL'; // BUY (on-ramp) or SELL (off-ramp)
  fiat_currency?: string; // Fiat currency
  crypto_currency?: string; // Digital currency
  start_time?: string; // Start Time
  end_time?: string; // End time
  status?: string; // DONE: Completed
  pn?: string; // Page number
  ps?: string; // Number of items per page
}

export interface GetOTCStablecoinOrderListReq {
  page_size?: string; // Number of records per page
  page_number?: string; // Page number
  coin_name?: string; // Order currency
  start_time?: string; // Start Time
  end_time?: string; // End time
  status?: string; // Status: PROCESSING: in progress / DONE: completed / FAILED: failed
}

export interface GetOTCFiatOrderDetailReq {
  order_id: string; // Order ID
}
