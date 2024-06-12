/**==========================================================================================================================
 * MULTI COLLATERAL LOAN
 * ==========================================================================================================================
 */

export interface MultiLoanOrder {
  order_id: string;
  order_type: string;
  fixed_type: string;
  fixed_rate: string;
  expire_time: number;
  auto_renew: boolean;
  auto_repay: boolean;
  current_ltv: string;
  status: string;
  borrow_time: number;
  total_left_repay_usdt: string;
  total_left_collateral_usdt: string;
  borrow_currencies: {
    currency: string;
    index_price: string;
    left_repay_principal: string;
    left_repay_interest: string;
    left_repay_usdt: string;
  }[];
  collateral_currencies: {
    currency: string;
    index_price: string;
    left_collateral: string;
    left_collateral_usdt: string;
  }[];
}

export interface RepayMultiLoanResp {
  order_id: number;
  repaid_currencies: {
    succeeded: boolean;
    label?: string;
    message?: string;
    currency: string;
    repaid_principal: string;
    repaid_interest: string;
  }[];
}

export interface MultiLoanRepayRecord {
  order_id: number;
  record_id: number;
  init_ltv: string;
  before_ltv: string;
  after_ltv: string;
  borrow_time: number;
  repay_time: number;
  borrow_currencies: {
    currency: string;
    index_price: string;
    before_amount: string;
    before_amount_usdt: string;
    after_amount: string;
    after_amount_usdt: string;
  }[];
  collateral_currencies: {
    currency: string;
    index_price: string;
    before_amount: string;
    before_amount_usdt: string;
    after_amount: string;
    after_amount_usdt: string;
  }[];
  repaid_currencies: {
    currency: string;
    index_price: string;
    repaid_amount: string;
    repaid_principal: string;
    repaid_interest: string;
    repaid_amount_usdt: string;
  }[];
  total_interest_list: {
    currency: string;
    index_price: string;
    amount: string;
    amount_usdt: string;
  }[];
  left_repay_interest_list: {
    currency: string;
    index_price: string;
    before_amount: string;
    before_amount_usdt: string;
    after_amount: string;
    after_amount_usdt: string;
  }[];
}

export interface UpdateMultiLoanResp {
  order_id: number;
  collateral_currencies: {
    succeeded: boolean;
    label?: string;
    message?: string;
    currency: string;
    amount: string;
  }[];
}

export interface MultiLoanAdjustmentRecord {
  order_id: number;
  record_id: number;
  before_ltv: string;
  after_ltv: string;
  operate_time: number;
  borrow_currencies: {
    currency: string;
    index_price: string;
    before_amount: string;
    before_amount_usdt: string;
    after_amount: string;
    after_amount_usdt: string;
  }[];
  collateral_currencies: {
    currency: string;
    index_price: string;
    before_amount: string;
    before_amount_usdt: string;
    after_amount: string;
    after_amount_usdt: string;
  }[];
}

export interface MultiLoanCurrencyQuota {
  currency: string;
  index_price: string;
  min_quota: string;
  left_quota: string;
  left_quote_usdt: string;
}

export interface MultiLoanSupportedCurrencies {
  loan_currencies: {
    currency: string;
    price: string;
  }[];
  collateral_currencies: {
    currency: string;
    index_price: string;
    discount: string;
  }[];
}

export interface MultiLoanRatio {
  init_ltv: string;
  alert_ltv: string;
  liquidate_ltv: string;
}

export interface MultiLoanFixedRate {
  currency: string;
  rate_7d: string;
  rate_30d: string;
  update_time: number;
}
