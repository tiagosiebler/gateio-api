/**==========================================================================================================================
 * OTC
 * ==========================================================================================================================
 */

export interface CreateOTCQuoteResp {
  code: number;
  message: string;
  data: {
    type: string; // BUY (on-ramp) or SELL (off-ramp)
    pay_coin: string;
    get_coin: string;
    pay_amount: string;
    get_amount: string;
    rate: string;
    rate_reci: string; // Reciprocal of the exchange rate
    promotion_code: string;
    side: string;
    order_type: string; // FIAT or STABLE
    quote_token: string; // Quote token required when placing an order
    validity_period?: string;
    ex_rate?: string;
    usdc_rate?: string;
    refresh_limit?: number;
    refresh_limit_msg?: string;
  };
  timestamp: number;
}

export interface CreateOTCFiatOrderResp {
  code: number;
  message: string;
  timestamp: number;
}

export interface CreateOTCStablecoinOrderResp {
  code: number;
  message: string;
}

export interface OTCBankInfo {
  id: string; // Bank ID (required for order placement)
  bank_account_name: string;
  bank_name: string;
  bank_country: string;
  bank_address: string;
  bank_code: string;
  branch_code: string;
}

export interface GetOTCUserDefaultBankResp {
  code: number;
  message: string;
  data: OTCBankInfo;
  timestamp: number;
}

export interface MarkOTCOrderAsPaidResp {
  code: number;
  message: string;
  timestamp: number;
}

export interface CancelOTCOrderResp {
  code: number;
  message: string;
  timestamp: number;
}

export interface OTCFiatOrderListItem {
  time: string; // Current time
  timestamp: number; // Current timestamp
  order_id: string;
  trade_no: string; // Trade number
  type: string; // Quote direction buy/sell/all
  status: string; // Order Status
  db_status: string;
  fiat_currency: string; // Fiat type
  fiat_currency_info: {
    name: string;
    icon: string;
  };
  fiat_amount: string; // Fiat amount
  crypto_currency: string; // Stablecoin
  crypto_currency_info: {
    name: string;
    icon: string;
  };
  crypto_amount: string; // Stablecoin amount
  rate: string; // Exchange rate
  transfer_remark: string; // Remark
  gate_bank_account_iban: string; // Bank account
  promotion_code: string; // Promotion code
}

export interface GetOTCFiatOrderListResp {
  code: number;
  message: string;
  data: {
    pn: number;
    ps: number;
    total_pn: number;
    count: number;
    list: OTCFiatOrderListItem[];
  };
}

export interface OTCStablecoinOrderListItem {
  id: number; // Order ID
  trade_no: string; // Transaction reference number
  pay_coin: string; // Payment currency
  pay_amount: string; // Payment amount
  get_coin: string; // Received currency
  get_amount: string; // Received amount
  rate: string; // Exchange rate
  rate_reci: string; // Reciprocal of the exchange rate
  status: string; // PROCESSING: in progress / DONE: completed / FAILED: failed
  create_timest: number; // Timestamp
  create_time: string; // Created time
}

export interface GetOTCStablecoinOrderListResp {
  code: number;
  message: string;
  data: {
    total: number;
    page_size: number;
    page_number: number;
    total_page: number;
    list: OTCStablecoinOrderListItem[];
  };
}

export interface OTCFiatOrderDetail {
  order_id: string; // Order ID
  uid: string; // User ID
  type: string; // Order Type
  fiat_currency: string; // Fiat type
  fiat_amount: string; // Fiat amount
  crypto_currency: string; // Stablecoin
  crypto_amount: string; // Stablecoin amount
  rate: string; // Exchange rate
  transfer_remark: string; // Remark
  status: string; // Status
  db_status: string;
  create_time: string; // Created time
  memo: string; // Cancellation or rejection reason
  side: string; // Quote direction
  promotion_code: string; // Promotion code
  trade_no: string; // Trade number
}

export interface GetOTCFiatOrderDetailResp {
  message: string;
  code: number;
  data: OTCFiatOrderDetail;
}
