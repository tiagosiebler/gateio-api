/**==========================================================================================================================
 * COLLATERAL LOAN
 * ==========================================================================================================================
 */

export interface GetLoanOrdersResp {
  order_id: number;
  collateral_currency: string;
  collateral_amount: string;
  borrow_currency: string;
  borrow_amount: string;
  repaid_amount: string;
  repaid_principal: string;
  repaid_interest: string;
  init_ltv: string;
  current_ltv: string;
  liquidate_ltv: string;
  status: string;
  borrow_time: number;
  left_repay_total: string;
  left_repay_principal: string;
  left_repay_interest: string;
}

export interface GetLoanRepaymentHistoryResp {
  order_id: number;
  record_id: number;
  repaid_amount: string;
  borrow_currency: string;
  collateral_currency: string;
  init_ltv: string;
  borrow_time: number;
  repay_time: number;
  total_interest: string;
  before_left_principal: string;
  after_left_principal: string;
  before_left_collateral: string;
  after_left_collateral: string;
}

export interface GetLoanCollateralRecordsResp {
  order_id: number;
  record_id: number;
  borrow_currency: string;
  borrow_amount: string;
  collateral_currency: string;
  before_collateral: string;
  after_collateral: string;
  before_ltv: string;
  after_ltv: string;
  operate_time: number;
}

export interface GetLoanCollateralizationRatioResp {
  collateral_currency: string;
  borrow_currency: string;
  init_ltv: string;
  alert_ltv: string;
  liquidate_ltv: string;
  min_borrow_amount: string;
  left_borrowable_amount: string;
}
