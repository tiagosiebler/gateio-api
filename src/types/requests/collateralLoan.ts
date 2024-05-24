/**==========================================================================================================================
 * COLLATERAL LOAN
 * ==========================================================================================================================
 */

export interface SubmitLoanOrderReq {
  collateral_amount: string;
  collateral_currency: string;
  borrow_amount: string;
  borrow_currency: string;
}

export interface GetLoanOrdersReq {
  page?: number;
  limit?: number;
  collateral_currency?: string;
  borrow_currency?: string;
}

export interface GetLoanRepaymentHistoryReq {
  source: 'repay' | 'liquidate';
  borrow_currency?: string;
  collateral_currency?: string;
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
}

export interface UpdateLoanCollateralReq {
  order_id: number;
  collateral_currency: string;
  collateral_amount: string;
  type: 'append' | 'redeem';
}

export interface GetLoanCollateralRecordsReq {
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
  borrow_currency?: string;
  collateral_currency?: string;
}
