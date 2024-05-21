export interface GetWithdrawalDepositRecordsReq {
  currency?: string;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface GetMainSubTransfersReq {
  sub_uid?: string;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface CreateSubAccountApiKeyReq {
  user_id: number;
  mode?: number; // Mode: 1 - classic, 2 - portfolio account
  name?: string; // API key name
  perms?: {
    name?:
      | 'wallet'
      | 'spot'
      | 'futures'
      | 'delivery'
      | 'earn'
      | 'options'
      | 'account'
      | 'unified'
      | 'loan'; // Permission name
    read_only?: boolean; // Read only
  }[];
  ip_whitelist?: string[]; // IP white list
}

export interface UpdateSubAccountApiKeyReq extends CreateSubAccountApiKeyReq {
  key: string;
}

export interface GetSavedAddressReq {
  currency: string;
  chain?: string;
  limit?: string;
  page?: number;
}

export interface GetSmallBalanceHistoryReq {
  currency?: string;
  page?: number;
  limit?: number;
}

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
  type?: 'platform' | 'margin';
}

export interface SetUnifiedAccountModeReq {
  mode: 'classic' | 'multi_currency' | 'portfolio';
  settings?: {
    usdt_futures?: boolean;
    spot_hedge?: boolean;
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

/**==========================================================================================================================
 * SPOT
 * ==========================================================================================================================
 */

export interface GetSpotOrderBookReq {
  currency_pair: string;
  interval?: string;
  limit?: number;
  with_id?: boolean;
}

export interface GetSpotTradesReq {
  currency_pair: string;
  limit?: number;
  last_id?: string;
  reverse?: boolean;
  from?: number;
  to?: number;
  page?: number;
}

export interface GetSpotCandlesticksReq {
  currency_pair: string;
  limit?: number;
  from?: number;
  to?: number;
  interval?:
    | '10s'
    | '1m'
    | '5m'
    | '15m'
    | '30m'
    | '1h'
    | '4h'
    | '8h'
    | '1d'
    | '7d'
    | '30d';
}

export interface GetSpotAccountBookReq {
  currency?: string;
  from?: number;
  to?: number;
  page?: number;
  limit?: number;
  type?: string;
}

export interface SubmitSpotClosePosCrossDisabledReq {
  text?: string;
  currency_pair: string;
  amount: string;
  price: string;
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}

export interface GetSpotOrdersReq {
  currency_pair: string;
  status: 'open' | 'finished';
  page?: number;
  limit?: number;
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  from?: number;
  to?: number;
  side?: 'buy' | 'sell';
}

export interface DeleteSpotOrderReq {
  order_id: string;
  currency_pair: string;
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}

export interface GetSpotTradingHistoryReq {
  currency_pair?: string;
  limit?: number;
  page?: number;
  order_id?: string;
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  from?: number;
  to?: number;
}

export interface UpdateSpotBatchOrdersReq {
  order_id?: string;
  currency_pair?: string;
  amount?: string;
  price?: string;
  amend_text?: string;
}

export interface GetSpotAutoOrdersReq {
  status: 'open' | 'finished';
  market?: string;
  account?: 'normal' | 'margin' | 'cross_margin';
  limit?: number;
  offset?: number;
}

export interface SubmitSpotOrderReq {
  side: 'buy' | 'sell';
  amount: string;
  text?: string;
  currency_pair: string;
  type?: 'limit' | 'market';
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  price?: string;
  time_in_force?: 'gtc' | 'ioc' | 'poc' | 'fok';
  iceberg?: string;
  auto_borrow?: boolean;
  auto_repay?: boolean;
  stp_act?: string;
  action_mode?: string;
}

export interface UpdateSpotOrderReq {
  order_id: string;
  currency_pair: string;
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  amount?: string;
  price?: string;
  amend_text?: string;
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}
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

/**==========================================================================================================================
 * FLASH SWAP
 * ==========================================================================================================================
 */

export interface SubmitFlashSwapOrderReq {
  preview_id: string;
  sell_currency: string;
  sell_amount: string;
  buy_currency: string;
  buy_amount: string;
}

export interface GetFlashSwapOrdersReq {
  status?: number;
  sell_currency?: string;
  buy_currency?: string;
  reverse?: boolean;
  limit?: number;
  page?: number;
}

export interface GetFlashSwapOrderReq {
  order_id: number;
}

export interface SubmitFlashSwapOrderPreviewReq {
  sell_currency: string;
  sell_amount?: string;
  buy_currency: string;
  buy_amount?: string;
}

/**==========================================================================================================================
 * FUTURES
 * ==========================================================================================================================
 */

export interface GetFuturesOrderBookReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  interval?: string;
  limit?: number;
  with_id?: boolean;
}

export interface GetFuturesTradesReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  limit?: number;
  offset?: number;
  last_id?: string;
  from?: number;
  to?: number;
}

export interface GetFuturesCandlesticksReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  from?: number;
  to?: number;
  limit?: number;
  interval?: string;
}
