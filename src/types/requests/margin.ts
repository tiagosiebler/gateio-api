/**==========================================================================================================================
 * MARGIN
 * ==========================================================================================================================
 */

export interface GetMarginBalanceHistoryReq {
  currency?: string;
  currency_pair?: string;
  type?: string;
  from?: number;
  to?: number;
  page?: number;
  limit?: number;
}

export interface GetCrossMarginAccountHistoryReq {
  currency?: string;
  from?: number;
  to?: number;
  page?: number;
  limit?: number;
  type?: string;
}

export interface SubmitCrossMarginBorrowLoanReq {
  currency: string;
  amount: string;
  text?: string;
}

export interface GetCrossMarginBorrowHistoryReq {
  status: number;
  currency?: string;
  limit?: number;
  offset?: number;
  reverse?: boolean;
}

export interface GetCrossMarginRepaymentsReq {
  currency?: string;
  loan_id?: string;
  limit?: number;
  offset?: number;
  reverse?: boolean;
}

export interface GetCrossMarginInterestRecordsReq {
  currency?: string;
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
}
