export interface SubmitUnifiedBorrowOrRepayReq {
  currency: string;
  type: 'borrow' | 'repay';
  amount: string;
  repaid_all?: boolean;
  text?: string;
}

export interface GetUnifiedLoansReq {
  currency?: string;
  page?: number;
  limit?: number;
  type?: 'platform' | 'margin';
}

export interface GetUnifiedLoanRecordsReq {
  type?: 'borrow' | 'repay';
  currency?: string;
  page?: number;
  limit?: number;
}
export interface GetUnifiedInterestRecordsReq {
  currency?: string;
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
  type?: 'platform' | 'margin';
}

export interface SetUnifiedAccountModeReq {
  mode: 'classic' | 'multi_currency' | 'portfolio' | 'single_currency';
  settings?: {
    usdt_futures?: boolean;
    spot_hedge?: boolean;
    use_funding?: boolean;
    options?: boolean;
  };
}

export interface PortfolioMarginCalculatorReq {
  spot_balances?: {
    currency: string;
    equity: string;
  }[];
  spot_orders?: {
    currency_pairs: string;
    order_price: string;
    count?: string;
    left: string;
    type: 'sell' | 'buy';
  }[];
  futures_positions?: {
    contract: string;
    size: string;
  }[];
  futures_orders?: {
    contract: string;
    size: string;
    left: string;
  }[];
  options_positions?: {
    options_name: string;
    size: string;
  }[];
  options_orders?: {
    options_name: string;
    size: string;
    left: string;
  }[];
  spot_hedge?: boolean;
}

export interface GetUnifiedHistoryLendingRateReq {
  currency: string;
  tier?: string;
  page?: number;
  limit?: number;
}
