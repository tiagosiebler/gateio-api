/**==========================================================================================================================
 * EARN
 * ==========================================================================================================================
 */

/** GET /earn/dual/investment_plan */
export interface GetDualInvestmentPlansReq {
  plan_id?: number | string;
  coin?: string;
  type?: string;
  quote_currency?: string;
  /** `apy` | `short-period` | `multiple` */
  sort?: string;
  page?: number;
  page_size?: number;
}

/** GET /earn/dual/orders */
export interface GetDualInvestmentOrdersReq {
  from?: number;
  to?: number;
  type?: string;
  status?: string;
  coin?: string;
  page?: number;
  limit?: number;
}

/** GET /earn/dual/order-refund-preview */
export interface GetDualOrderRefundPreviewReq {
  order_id: string;
}

/** POST /earn/dual/order-refund */
export interface SubmitDualOrderRefundParams {
  order_id: string;
  /** From order-refund-preview */
  req_id: string;
}

/** POST /earn/dual/modify-order-reinvest */
export interface UpdateDualOrderReinvestParams {
  order_id?: number;
  /** 0 off, 1 on */
  status?: number;
  /** Effective duration in seconds; default 86400 */
  effective_time_duration?: number;
}

/** GET /earn/dual/project-recommend */
export interface GetDualProjectRecommendReq {
  mode?: string;
  coin?: string;
  type?: string;
  /** Comma-separated project IDs to exclude */
  history_pids?: string;
}

/** Request params for POST /earn/dual/orders */
export interface PlaceDualInvestmentOrderParams {
  plan_id: string;
  /** Subscription amount. Mutually exclusive with copies. */
  amount: string;
  /** Units. Mutually exclusive with amount. */
  copies?: string;
  /** Custom order info, must start with t- */
  text?: string;
}

/**==========================================================================================================================
 * EARN FIXED-TERM
 * ==========================================================================================================================
 */

export interface GetEarnFixedTermProductsReq {
  asset?: string;
  type?: number; // 1 regular, 2 VIP
  page: number;
  limit: number;
}

export interface GetEarnFixedTermProductsByAssetReq {
  /** Product type: "" or 1 regular, 2 VIP, 0 all */
  type?: string;
}

export interface CreateEarnFixedTermLendReq {
  product_id: number;
  amount: string;
  year_rate?: string;
  reinvest_status?: number; // 0 off, 1 on
  redeem_account_type?: number; // 1 spot
  financial_rate_id?: number; // interest boost coupon id, 0 = none
  sub_business?: number;
}

export interface GetEarnFixedTermLendsReq {
  product_id?: number;
  order_id?: number;
  asset?: string;
  order_type: '1' | '2'; // 1 current, 2 historical
  page: number;
  limit: number;
  sub_business?: number;
  business_filter?: string;
}

export interface EarnFixedTermPreRedeemReq {
  order_id: string;
}

export interface GetEarnFixedTermHistoryReq {
  product_id?: number;
  order_id?: string;
  asset?: string;
  type: '1' | '2' | '3' | '4'; // 1 subscribe, 2 redeem, 3 interest, 4 bonus
  page: number;
  limit: number;
  start_at?: number;
  end_at?: number;
  sub_business?: number;
  business_filter?: string;
}
