/**==========================================================================================================================
 * MARGIN UNI
 * ==========================================================================================================================
 */

export interface GetMarginUNILoansReq {
  currency_pair?: string;
  currency?: string;
  page?: number;
  limit?: number;
}

export interface GetMarginUNILoanRecordsReq {
  type?: 'borrow' | 'repay';
  currency?: string;
  currency_pair?: string;
  page?: number;
  limit?: number;
}

export interface GetMarginUNIInterestRecordsReq {
  currency_pair?: string;
  currency?: string;
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
}

export interface GetMarginUNIMaxBorrowReq {
  currency: string;
  currency_pair: string;
}
