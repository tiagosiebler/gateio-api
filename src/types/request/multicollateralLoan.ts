/**==========================================================================================================================
 * MULTI COLLATERAL LOAN
 * ==========================================================================================================================
 */

export interface SubmitMultiLoanOrderReq {
  order_id?: string;
  order_type?: string;
  fixed_type?: string;
  fixed_rate?: string;
  auto_renew?: boolean;
  auto_repay?: boolean;
  borrow_currency: string;
  borrow_amount: string;
  collateral_currencies?: {
    currency?: string;
    amount?: string;
  }[];
}
export interface GetMultiLoanOrdersReq {
  page?: number;
  limit?: number;
  sort?: string;
  order_type?: string;
}

export interface RepayMultiLoanReq {
  order_id: number;
  repay_items: {
    currency?: string;
    amount?: string;
    repaid_all?: boolean;
  }[];
}

export interface GetMultiLoanRepayRecordsReq {
  type: 'repay' | 'liquidate';
  borrow_currency?: string;
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
}

export interface UpdateMultiLoanReq {
  order_id: number;
  type: 'append' | 'redeem';
  collaterals?: {
    currency?: string;
    amount?: string;
  }[];
}

export interface GetMultiLoanAdjustmentRecordsReq {
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
  collateral_currency?: string;
}
