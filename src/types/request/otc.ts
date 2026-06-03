import { GateMultipartFile } from '../../lib/multipartUtil.js';

export type { GateMultipartFile } from '../../lib/multipartUtil.js';

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
  /** From GET /otc/bank/list; default card has is_default=1 */
  bank_id: string;
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
  client_order_id?: string; // Client order ID (gateway/Inner Pay paths)
  payment_receipt_file_key: string; // Required. Stored as file_key; jpg/jpeg/png/pdf; ≤4MB
  payment_receipt?: string; // Alias compatible with payment_receipt_file_key
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

export interface OTCBankIdReq {
  bank_id: string;
}

export interface GetOTCBankSupplementChecklistReq {
  bank_id: string;
}

export interface CreateOTCBankReq {
  bank_account_name: string;
  bank_name: string;
  bank_country: string;
  bank_address: string;
  iban: string;
  swift: string;
  remittance_line_number?: string;
  agent_bank_name?: string;
  agent_bank_swift?: string;
  documentation_file: GateMultipartFile;
}

export interface SubmitOTCBankPersonalSupplementReq {
  bank_id: string;
  id_document_front: GateMultipartFile;
  id_document_back: GateMultipartFile;
  address_proof: GateMultipartFile;
}

export interface SubmitOTCBankEnterpriseSupplementReq {
  bank_id: string;
  certificate: GateMultipartFile;
  share_holders: GateMultipartFile;
  passport: GateMultipartFile;
  share_holding_structure: GateMultipartFile;
  uid?: string;
  funds_statement?: GateMultipartFile;
  additional?: GateMultipartFile;
}
