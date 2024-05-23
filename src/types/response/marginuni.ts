/**==========================================================================================================================
 * MARGIN UNI
 * ==========================================================================================================================
 */

export interface GetLendingMarketsResp {
  currency_pair: string;
  base_min_borrow_amount: string;
  quote_min_borrow_amount: string;
  leverage: string;
}

export interface GetMarginUNILoansResp {
  currency: string;
  currency_pair: string;
  amount: string;
  type: string;
  create_time: number;
  update_time: number;
}

export interface GetMarginUNILoanRecordsResp {
  type: string;
  currency_pair: string;
  currency: string;
  amount: string;
  create_time: number;
}

export interface GetMarginUNIInterestRecordsResp {
  currency: string;
  currency_pair: string;
  actual_rate: string;
  interest: string;
  status: number;
  type: string;
  create_time: number;
}

export interface GetMarginUNIMaxBorrowResp {
  currency: string;
  currency_pair: string;
  borrowable: string;
}
