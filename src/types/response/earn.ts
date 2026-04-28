/**==========================================================================================================================
 * EARN
 * ==========================================================================================================================
 */

export interface DualInvestmentProduct {
  id: number;
  instrument_name: string;
  invest_currency: string;
  exercise_currency: string;
  exercise_price: number;
  delivery_time: number;
  min_copies: number;
  max_copies: number;
  /** @deprecated */
  per_value: string;
  apy_display: string;
  start_time: number;
  end_time: number;
  status: 'NOTSTARTED' | 'ONGOING' | 'ENDED';
}

/** GET /earn/dual/order-refund-preview */
export interface DualOrderRefundPreview {
  create_timest: number;
  delivery_timest: number;
  exercise_price: string;
  invest_amount: string;
  invest_currency: string;
  name: string;
  order_id: number;
  req_id: string;
  refund_service_charge: number;
  settle_price: string;
  settlement_amount: string;
  settlement_currency: string;
  settlement_interest: string;
  settlement_principle: string;
  type: string;
  money_back_timest: number;
}

/** GET /earn/dual/project-recommend item */
export interface DualProjectRecommend {
  id: number;
  category: number;
  type: string;
  invest_currency: string;
  exercise_currency: string;
  apy_display: string;
  exercise_price: string;
  delivery_timest: number;
  min_amount: string;
  max_amount: string;
  min_copies: number;
  max_copies: number;
  invest_days: number;
  invest_hours: string;
}

export interface DualInvestmentOrder {
  id: number;
  plan_id: number;
  copies: string;
  invest_amount: string;
  settlement_amount: string;
  create_time: number;
  complete_time: number;
  status:
    | 'INIT'
    | 'SETTLEMENT_SUCCESS'
    | 'SETTLEMENT_PROCESSING'
    | 'CANCELED'
    | 'FAILED';
  invest_currency: string;
  exercise_currency: string;
  exercise_price: string;
  settlement_price: string;
  settlement_currency: string;
  apy_display: string;
  apy_settlement: string;
  delivery_time: number;
  text: string;
}

/**==========================================================================================================================
 * EARN FIXED-TERM
 * ==========================================================================================================================
 */

export interface FixedTermLadderApr {
  apr: string;
  left: string;
  right: string;
}

export interface FixedTermProductInfo {
  pre_redeem: number;
  reinvest: number;
  redeem_account: number;
  min_vip: number;
  max_vip: number;
}

export interface FixedTermBonusInfo {
  id?: number;
  product_id?: number;
  asset?: string;
  bonus_asset?: string;
  kyc_limit?: string;
  ladder_apr?: FixedTermLadderApr[];
  total_bonus_amount?: string;
  user_total_bonus_amount?: string;
  status?: number;
  start_time?: string;
  end_time?: string;
  create_time?: string;
  start_at?: number;
  end_at?: number;
  total_issued_amount?: string;
  user_total_issued_amount?: string;
  bonus_asset_price?: string;
  product_asset_price?: string;
  product_year_rate?: string;
}

export interface FixedTermCouponInfo {
  id?: number;
  business?: number;
  user_id?: number;
  asset?: string;
  order_id?: number;
  financial_rate_id?: number;
  buy_limit_low?: string;
  buy_limit_high?: string;
  rate_day?: number;
  rate_ratio?: string;
  coupon_days?: number;
  coupon_principal?: string;
  coupon_year_rate?: string;
  coupon_interest?: string;
  status?: number;
  finish_time?: string;
  create_time?: string;
}

export interface FixedTermLendOrder {
  id?: number;
  business?: number;
  order_id?: number;
  user_id?: number;
  asset?: string;
  product_id?: number;
  lock_up_period?: number;
  principal?: string;
  year_rate?: string;
  product_type?: number;
  interest?: string;
  status?: number;
  reinvest_status?: number;
  redeem_account_type?: number;
  origin_order?: string;
  redeem_type?: number;
  redeem_time?: string;
  finish_time?: string;
  create_time?: string;
  year_rate_perent?: string;
  total_year_rate_percent?: string;
  total_interest?: string;
  product_info?: FixedTermProductInfo;
  bonus_info?: FixedTermBonusInfo;
  coupon_info?: FixedTermCouponInfo;
  redeem_at?: number;
  finish_at?: number;
  create_at?: number;
  icon?: string;
}

export interface FixedTermProduct {
  id?: number;
  name?: string;
  asset?: string;
  lock_up_period?: number;
  min_lend_amount?: string;
  user_max_lend_amount?: string;
  total_lend_amount?: string;
  year_rate?: string;
  type?: number;
  pre_redeem?: number;
  reinvest?: number;
  redeem_account?: number;
  min_vip?: number;
  max_vip?: number;
  status?: number;
  create_time?: string;
  user_max_lend_volume?: string;
  user_total_amount?: string;
  sale_status?: number;
}

export interface FixedTermProductSimple {
  id?: number;
  asset?: string;
  lock_up_period?: number;
  year_rate?: string;
  type?: number;
  pre_redeem?: number;
  reinvest?: number;
  simple_earn?: number;
  min_vip?: number;
  max_vip?: number;
  sale_status?: number;
}

export interface GetEarnFixedTermProductsResponse {
  code: number;
  message: string;
  data: {
    list: FixedTermProduct[];
    total: number;
  };
  timestamp: number;
}

export interface GetEarnFixedTermProductsByAssetResponse {
  code: number;
  message: string;
  data: {
    list: FixedTermProductSimple[];
  };
  timestamp: number;
}

export interface CreateEarnFixedTermLendResponse {
  code?: number;
  message?: string;
  data?: {
    order_id?: number;
  };
  timestamp?: number;
}

export interface GetEarnFixedTermLendsResponse {
  code: number;
  message: string;
  data: {
    list: FixedTermLendOrder[];
    total: number;
  };
  timestamp: number;
}

export interface CreateEarnFixedTermPreRedeemResponse {
  code?: number;
  message?: string;
  data?: Record<string, never>;
  timestamp?: number;
}

export interface FixedTermHistoryRecord {
  id?: number;
  order_id?: number;
  user_id?: number;
  asset?: string;
  uniq_time?: string;
  bonus_id?: number;
  product_id?: number;
  bonus_asset?: string;
  total_principal?: string;
  amount?: string;
  asset_price?: string;
  status?: number;
  detail?: string;
  create_time?: string;
  create_at?: number;
  lock_up_period?: number;
}

export interface GetEarnFixedTermHistoryResponse {
  code?: number;
  message?: string;
  data?: {
    list?: FixedTermHistoryRecord[];
    total?: number;
  };
  timestamp?: number;
}
