/**==========================================================================================================================
 * MARGIN UNI
 * ==========================================================================================================================
 */

export interface LendingMarket {
  currency_pair: string;
  base_min_borrow_amount: string;
  quote_min_borrow_amount: string;
  leverage: string;
}

export interface MarginUNILoan {
  currency: string;
  currency_pair: string;
  amount: string;
  type: string; // Lending type, margin indicates margin borrowing
  create_time: number;
  update_time: number;
}

export interface MarginUNILoanRecord {
  type: string;
  currency_pair: string;
  currency: string;
  amount: string;
  create_time: number;
}

export interface MarginUNIInterestRecord {
  currency: string;
  currency_pair: string;
  actual_rate: string;
  interest: string;
  status: number;
  type: string; // Lending type, margin indicates margin borrowing
  create_time: number;
}

export interface MarginUNIMaxBorrowable {
  currency: string;
  currency_pair: string;
  borrowable: string;
}
