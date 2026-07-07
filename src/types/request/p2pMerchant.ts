/** P2P Merchant API request types */

export interface P2PMerchantGetCounterpartyUserInfoReq {
  biz_uid: string;
}

export interface P2PMerchantGetMyselfPaymentReq {
  fiat?: string;
}

export interface P2PMerchantGetPendingTransactionListReq {
  crypto_currency: string;
  fiat_currency: string;
  order_tab?: string;
  select_type?: string;
  status?: string;
  txid?: number;
  start_time?: number;
  end_time?: number;
}

export interface P2PMerchantGetCompletedTransactionListReq {
  crypto_currency: string;
  fiat_currency: string;
  select_type?: string;
  status?: string;
  txid?: number;
  start_time?: number;
  end_time?: number;
  query_dispute?: number;
  page?: number;
  per_page?: number;
}

export interface P2PMerchantGetTransactionDetailsReq {
  txid: number;
  channel?: string;
}

export interface P2PMerchantConfirmPaymentReq {
  trade_id: string;
  payment_method: string;
}

export interface P2PMerchantConfirmReceiptReq {
  trade_id: string;
}

export interface P2PMerchantCancelTransactionReq {
  trade_id: string;
  reason_id?: string;
  reason_memo?: string;
}

export interface P2PMerchantPlaceBizPushOrderReq {
  currencyType: string;
  exchangeType: string;
  type: string;
  unitPrice: string;
  number: string;
  payType: string;
  minAmount?: string; // v4.106.102: No longer required; trade quantity priced by currencyType
  maxAmount?: string; // v4.106.102: No longer required; trade quantity priced by currencyType
  pay_type_json?: string;
  rateFixed?: string;
  oid?: string;
  tierLimit?: string;
  verifiedLimit?: string;
  regTimeLimit?: string;
  advertisersLimit?: string;
  hide_payment?: string;
  expire_min?: string;
  trade_tips?: string;
  auto_reply?: string;
  min_completed_limit?: string;
  max_completed_limit?: string;
  completed_rate_limit?: string;
  user_country_limit?: string;
  user_order_limit?: string;
  rateReferenceId?: string;
  rateOffset?: string;
  float_trend?: string;
  limitBasis?: string; // v4.106.102: 0 by crypto quantity, 1 by fiat amount; defaults to 0
  fiatMinAmount?: string; // v4.106.102: Required when limitBasis is 1
  fiatMaxAmount?: string; // v4.106.102: Required when limitBasis is 1
  polymarket_limit?: string; // v4.106.102: Restrict trading with Polymarket users
}

/** POST /p2p/merchant/account/set_merchant_work_hours — v4.106.96 */
export interface P2PMerchantSetMerchantWorkHoursReq {
  work_status: 0 | 1 | 2; // 0 resting, 1 working, 2 custom working hours
  cycle_type?: string;
  day_of_week?: string;
  time_zone?: string; // UTC offset -12 to +14
  start_time?: string;
  end_time?: string;
}

export interface P2PMerchantAdsUpdateStatusReq {
  adv_no: number;
  adv_status: 1 | 3 | 4;
  /** Optional query param */
  trade_type?: string;
}

export interface P2PMerchantAdsDetailReq {
  adv_no: string;
}

export interface P2PMerchantMyAdsListReq {
  asset?: string;
  fiat_unit?: string;
  trade_type?: string;
}

export interface P2PMerchantGetAdsListReq {
  asset: string;
  fiat_unit: string;
  trade_type: string;
}

export interface P2PMerchantGetChatsListReq {
  txid: number;
  lastreceived?: number;
  firstreceived?: number;
}

export interface P2PMerchantSendChatMessageReq {
  txid: number;
  message: string;
  /** 0=Text, 1=File (video or image). Default 0 */
  type?: 0 | 1;
}

export interface P2PMerchantUploadChatFileReq {
  image_content_type: string;
  base64_img: string;
}
