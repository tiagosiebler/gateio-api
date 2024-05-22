import { FuturesOrder, FuturesPriceTriggeredOrder } from 'types/shared';

export interface SubmitWithdrawReq {
  amount: string;
  currency: string;
  chain: string;
  withdraw_order_id?: string;
  address?: string;
  memo?: string;
}

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

export interface SubmitMainSubTransferReq {
  currency: string;
  sub_account: string;
  direction: 'to' | 'from';
  amount: string;
  client_order_id?: string;
  sub_account_type?: 'spot' | 'futures' | 'cross_margin' | 'delivery';
}

export interface SubmitSubToSubTransferReq {
  currency: string;
  sub_account_from: string;
  sub_account_from_type: 'spot' | 'futures' | 'delivery' | 'cross_margin';
  sub_account_to: string;
  sub_account_to_type: 'spot' | 'futures' | 'delivery' | 'cross_margin';
  amount: string;
  sub_account_type?: string;
}

export interface SubmitTransferReq {
  currency: string;
  from: 'spot' | 'margin' | 'futures' | 'delivery' | 'cross_margin' | 'options';
  to: 'spot' | 'margin' | 'futures' | 'delivery' | 'cross_margin' | 'options';
  amount: string;
  currency_pair?: string;
  settle?: string;
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

export interface CreateSubAccountReq {
  login_name: string;
  remark?: string;
  password?: string;
  email?: string;
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

export interface GetFuturesStatsReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  from?: number;
  interval?: string;
  limit?: number;
}

export interface GetLiquidationHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  from?: number;
  to?: number;
  limit?: number;
}

export interface GetRiskLimitTiersReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  limit?: number;
  offset?: number;
}

export interface GetFuturesAccountBookReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
  type?:
    | 'dnw'
    | 'pnl'
    | 'fee'
    | 'refr'
    | 'fund'
    | 'point_dnw'
    | 'point_fee'
    | 'point_refr'
    | 'bonus_offset';
}

export interface GetFuturesPositionsReq {
  settle: 'btc' | 'usdt' | 'usd';
  holding?: boolean;
  limit?: number;
  offset?: number;
}

export interface UpdateDualModePositionMarginReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  change: string;
  dual_side: 'dual_long' | 'dual_short';
}

export interface UpdateDualModePositionLeverageReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  leverage: string;
  cross_leverage_limit?: string;
}

export interface SubmitFuturesOrderReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  size: number;
  iceberg?: number;
  price?: string;
  close?: boolean;
  reduce_only?: boolean;
  tif?: string;
  text?: string;
  auto_size?: string;
  stp_act?: string;
}

export interface GetFuturesOrdersReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  status: string;
  limit?: number;
  offset?: number;
  last_id?: string;
}

export interface DeleteAllFuturesOrdersReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  side?: string;
}

export interface GetFuturesOrdersByTimeRangeReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface submitFuturesBatchOrdersReq extends FuturesOrder {
  settle: 'btc' | 'usdt' | 'usd';
}

export interface GetFuturesTradingHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  order?: number;
  limit?: number;
  offset?: number;
  last_id?: string;
}

export interface GetFuturesPositionHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
  side?: 'long' | 'short';
  pnl?: string;
}

export interface GetFuturesLiquidationHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  limit?: number;
  at?: number;
}

export interface SubmitFuturesPriceTriggeredOrderReq
  extends FuturesPriceTriggeredOrder {
  settle: 'btc' | 'usdt' | 'usd';
}

export interface GetFuturesAutoOrdersReq {
  settle: 'btc' | 'usdt' | 'usd';
  status: 'open' | 'finished';
  contract?: string;
  limit?: number;
  offset?: number;
}

/**==========================================================================================================================
 * DELIVERY
 * ==========================================================================================================================
 */

export interface GetDeliveryOrderBookReq {
  settle: 'usdt';
  contract: string;
  interval?: '0' | '0.1' | '0.01';
  limit?: number;
  with_id?: boolean;
}

export interface GetDeliveryTradesReq {
  settle: 'usdt';
  contract: string;
  limit?: number;
  last_id?: string;
  from?: number;
  to?: number;
}

export interface GetDeliveryCandlesticksReq {
  settle: 'usdt';
  contract: string;
  from?: number;
  to?: number;
  limit?: number;
  interval?:
    | '10s'
    | '30s'
    | '1m'
    | '5m'
    | '15m'
    | '30m'
    | '1h'
    | '2h'
    | '4h'
    | '6h'
    | '8h'
    | '12h'
    | '1d'
    | '7d'
    | '1w'
    | '30d';
}

export interface GetDeliveryBookReq {
  settle: 'usdt';
  limit?: number;
  from?: number;
  to?: number;
  type?:
    | 'dnw'
    | 'pnl'
    | 'fee'
    | 'refr'
    | 'fund'
    | 'point_dnw'
    | 'point_fee'
    | 'point_refr'
    | 'bonus_offset';
}

export interface SubmitDeliveryFuturesOrderReq {
  settle: 'usdt';
  contract: string;
  size: number;
  iceberg?: number;
  price?: string;
  close?: boolean;
  reduce_only?: boolean;
  tif?: string;
  text?: string;
  auto_size?: string;
  stp_act?: string;
}

export interface GetDeliveryOrdersReq {
  settle: 'usdt';
  contract?: string;
  status: 'open' | 'finished';
  limit?: number;
  offset?: number;
  last_id?: string;
  count_total?: 0 | 1;
}

export interface GetDeliveryTradingHistoryReq {
  settle: 'usdt';
  contract?: string;
  order?: number;
  limit?: number;
  offset?: number;
  last_id?: string;
  count_total?: 0 | 1;
}

export interface GetDeliveryClosedPositionsReq {
  settle: 'usdt';
  contract?: string;
  limit?: number;
}

export interface GetDeliveryLiquidationHistoryReq {
  settle: 'usdt';
  contract?: string;
  limit?: number;
  at?: number;
}

export interface GetDeliverySettlementHistoryReq {
  settle: 'usdt';
  contract?: string;
  limit?: number;
  at?: number;
}

export interface submitDeliveryTriggeredOrderReq
  extends FuturesPriceTriggeredOrder {
  settle: 'usdt';
}

export interface GetDeliveryAutoOrdersReq {
  settle: 'usdt';
  status: 'open' | 'finished';
  contract?: string;
  limit?: number;
  offset?: number;
}

/**==========================================================================================================================
 * OPTIONS
 * ==========================================================================================================================
 */
export interface GetOptionsSettlementHistoryReq {
  underlying: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
}
export interface GetOptionsMySettlementsReq {
  underlying: string;
  contract?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
}

export interface GetOptionsOrderBookReq {
  contract: string;
  interval?: '0' | '0.1' | '0.01';
  limit?: number;
  with_id?: boolean;
}

export interface GetOptionsCandlesticksReq {
  contract: string;
  limit?: number;
  from?: number;
  to?: number;
  interval?: '1m' | '5m' | '15m' | '30m' | '1h';
}

export interface GetOptionsUnderlyingCandlesticksReq {
  underlying: string;
  limit?: number;
  from?: number;
  to?: number;
  interval?: '1m' | '5m' | '15m' | '30m' | '1h';
}

export interface GetOptionsTradesReq {
  contract?: string;
  type?: 'C' | 'P';
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
}

export interface GetOptionsAccountChangeReq {
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
  type?: 'dnw' | 'prem' | 'fee' | 'refr' | 'set';
}

export interface SubmitOptionsOrderReq {
  contract: string;
  size: number;
  iceberg?: number;
  price?: string;
  close?: boolean;
  reduce_only?: boolean;
  tif?: 'gtc' | 'ioc' | 'poc';
  text?: string;
}

export interface GetOptionsOrdersReq {
  contract?: string;
  underlying?: string;
  status: 'open' | 'finished';
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
}

export interface GetOptionsPersonalHistoryReq {
  underlying: string;
  contract?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
}

/**==========================================================================================================================
 * EARN UNI
 * ==========================================================================================================================
 */

export interface SubmitLendOrRedeemReq {
  currency: string;
  amount: string;
  type: 'lend' | 'redeem';
  min_rate?: string;
}

export interface GetLendingOrdersReq {
  currency?: string;
  page?: number;
  limit?: number;
}

export interface GetLendingRecordsReq {
  currency?: string;
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
  type?: 'lend' | 'redeem';
}

export interface GetLendingInterestRecordsReq {
  currency?: string;
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
}

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

/**==========================================================================================================================
 * EARN
 * ==========================================================================================================================
 */

export interface GetStructuredProductListReq {
  status: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface GetStructuredProductOrdersReq {
  from?: number;
  to?: number;
  page?: number;
  limit?: number;
}

/**==========================================================================================================================
 * ACCOUNT
 * ==========================================================================================================================
 */

export interface CreateStpGroupReq {
  name: string;
  id?: number;
  creator_id?: number;
  create_time?: number;
}
