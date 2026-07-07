/** P2P Merchant API response types */

export interface P2PMerchantApiResp<T> {
  timestamp: number;
  method: string;
  code: number;
  message: string;
  data: T;
  version: string;
}

export interface P2PMerchantUserInfo {
  is_self?: boolean;
  user_timest?: string;
  counterparties_num?: number;
  email_verified?: string;
  verified?: string;
  has_phone?: string;
  user_name?: string;
  user_note?: string;
  complete_transactions?: string;
  paid_transactions?: string;
  accepted_transactions?: string;
  transactions_used_time?: string;
  cancelled_used_time_month?: string;
  complete_transactions_month?: string;
  complete_rate_month?: number;
  orders_buy_rate_month?: number;
  is_black?: number;
  is_follow?: number;
  have_traded?: number;
  biz_uid?: string;
  blue_vip?: number;
  work_status?: number;
  registration_days?: number;
  first_trade_days?: number;
  need_replenish?: number;
  merchant_info?: { type?: string; market?: string };
  online_status?: number;
  work_hours?: Record<string, unknown> | null;
  transactions_month?: number;
  transactions_all?: number;
  trade_versatile?: boolean;
  [key: string]: unknown;
}

export interface P2PMerchantCounterpartyUserInfo {
  user_timest?: string;
  email_verified?: string;
  verified?: string;
  has_phone?: string;
  user_name?: string;
  user_note?: string;
  complete_transactions?: string;
  paid_transactions?: string;
  accepted_transactions?: string;
  transactions_used_time?: string;
  cancelled_used_time_month?: string;
  complete_transactions_month?: string;
  complete_rate_month?: number;
  is_follow?: number;
  have_traded?: number;
  biz_uid?: string;
  registration_days?: number;
  first_trade_days?: number;
  trade_versatile?: boolean;
  [key: string]: unknown;
}

export interface P2PMerchantPaymentMethod {
  pay_type: string;
  pay_name: string;
  ids: number[];
  list: Record<string, unknown>[];
}

export interface P2PMerchantTransactionListItem {
  type_buy?: number;
  timest?: string;
  timest_expire?: string;
  type?: string;
  trade_type?: string;
  timestamp?: number;
  rate?: string;
  amount?: string;
  total?: string;
  txid?: number;
  status?: string;
  order_status?: string;
  [key: string]: unknown;
}

export interface P2PMerchantTransactionListData {
  list: P2PMerchantTransactionListItem[];
  trans_time?: { od_time?: number }[];
  count: number;
  exported_num: number;
}

export interface P2PMerchantTransactionDetails {
  is_sell?: number;
  txid?: number;
  orderid?: number;
  timest?: number;
  last_pay_time?: number;
  remain_pay_time?: number;
  currencyType?: string;
  want_type?: string;
  rate?: string;
  amount?: string;
  total?: string;
  status?: string;
  state?: string;
  its_uid?: string;
  its_nickname?: string;
  its_realname?: string;
  [key: string]: unknown;
}

export interface P2PMerchantAdsDetail {
  rate?: string;
  type?: string;
  amount?: string;
  min_amount?: string;
  max_amount?: string;
  fiat_min_amount?: string; // v4.106.102: Min fiat amount per order
  fiat_max_amount?: string; // v4.106.102: Max fiat amount per order
  minFiatAmount?: string; // v4.106.102
  maxFiatAmount?: string; // v4.106.102
  limitBasis?: string; // v4.106.102: 0 by crypto quantity, 1 by fiat amount
  limitBasisText?: string; // v4.106.102
  polymarket_limit?: string; // v4.106.102
  total?: string;
  orderid?: number;
  timestamp?: number;
  currencyType?: string;
  want_type?: string;
  status?: string;
  [key: string]: unknown;
}

export interface P2PMerchantMyAdsListItem {
  type?: string;
  rate?: string;
  amount?: string;
  total?: string;
  id?: string;
  status?: string;
  currencyType?: string;
  want_type?: string;
  fiat_min_amount?: string; // v4.106.102
  fiat_max_amount?: string; // v4.106.102
  limit_basis?: string; // v4.106.103
  limit_basis_text?: string; // v4.106.103
  [key: string]: unknown;
}

export interface P2PMerchantMyAdsListData {
  lists: P2PMerchantMyAdsListItem[];
}

export interface P2PMerchantAdsListItem {
  index?: number;
  asset?: string;
  fiat_unit?: string;
  adv_no?: number;
  price?: string;
  max_single_trans_amount?: string;
  min_single_trans_amount?: string;
  nick_name?: string;
  surplus_amount?: string; // v4.106.103: Remaining tradable crypto quantity
  trade_methods?: string[]; // v4.106.103: Supported payment methods list
  fiat_min_amount?: string; // v4.106.103
  fiat_max_amount?: string; // v4.106.103
  limit_basis?: string; // v4.106.103
  limit_basis_text?: string; // v4.106.103
}

export interface P2PMerchantChatMessage {
  is_sell?: number;
  msg_type?: number;
  msg?: string;
  username?: string;
  uid?: string;
  timest?: number;
  type?: number;
  pic?: string;
  file_key?: string;
  file_type?: string;
  width?: string;
  height?: string;
  msg_obj?: Record<string, unknown>;
  risk_type?: number; // v4.106.96: 1 off-platform traffic diversion risk
  toast_msg?: string; // v4.106.96
  [key: string]: unknown;
}

/** v4.106.96: Risk control response when place_biz_push_order hits off-platform diversion check */
export interface P2PMerchantPlaceOrderRiskData {
  risk_code?: string;
  risk_event?: {
    type?: string;
    title?: string;
    msg?: string;
    action?: string;
    content_risk_type?: string;
    trade_tips?: string;
    auto_reply?: string;
  };
}

/** v4.106.96: send_chat_message risk fields in data */
export interface P2PMerchantSendChatMessageData {
  risk_type?: number;
  toast_msg?: string;
  [key: string]: unknown;
}

export interface P2PMerchantChatsListData {
  messages: P2PMerchantChatMessage[];
  has_history?: boolean;
  txid?: number;
  SRVTM?: number;
  order_status?: string;
  memo?: string;
}
