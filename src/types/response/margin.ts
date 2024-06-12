/**==========================================================================================================================
 * MARGIN
 * ==========================================================================================================================
 */

export interface MarginAccount {
  currency_pair: string;
  locked: boolean;
  risk: string;
  base: {
    currency: string;
    available: string;
    locked: string;
    borrowed: string;
    interest: string;
  };
  quote: {
    currency: string;
    available: string;
    locked: string;
    borrowed: string;
    interest: string;
  };
}

export interface MarginBalanceHistoryRecord {
  id: string;
  time: string;
  time_ms: number;
  currency: string;
  currency_pair: string;
  change: string;
  balance: string;
  type: string;
}

export interface CrossMarginCurrency {
  name: string;
  rate: string;
  prec: string;
  discount: string;
  min_borrow_amount: string;
  user_max_borrow_amount: string;
  total_max_borrow_amount: string;
  price: string;
  loanable: boolean;
  status: number;
}

export interface CrossMarginAccount {
  user_id: number;
  refresh_time: number;
  locked: boolean;
  balances: {
    [currency: string]: {
      available: string;
      freeze: string;
      borrowed: string;
      interest: string;
      negative_liab: string;
      futures_pos_liab: string;
      equity: string;
      total_freeze: string;
      total_liab: string;
    };
  };
  total: string;
  borrowed: string;
  interest: string;
  risk: string;
  total_initial_margin: string;
  total_margin_balance: string;
  total_maintenance_margin: string;
  total_initial_margin_rate: string;
  total_maintenance_margin_rate: string;
  total_available_margin: string;
  portfolio_margin_total: string;
  portfolio_margin_total_liab: string;
  portfolio_margin_total_equity: string;
}

export interface CrossMarginAccountHistoryRecord {
  id: string;
  time: number;
  currency: string;
  change: string;
  balance: string;
  type: string;
}

export interface SubmitCrossMarginBorrowLoanResp {
  id: string;
  create_time: number;
  update_time: number;
  currency: string;
  amount: string;
  text?: string;
  status: number;
  repaid: string;
  repaid_interest: string;
  unpaid_interest: string;
}
