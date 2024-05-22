import { Order } from '../shared';

export interface APIResponse<TData = {}> {
  success: boolean;
  data: TData;
  timestamp: number;
}

export interface GetCurrencyChainsResp {
  chain: string;
  name_cn: string;
  name_en: string;
  contract_address: string;
  is_disabled: number;
  is_deposit_disabled: number;
  is_withdraw_disabled: number;
  decimal: string;
}

export interface CreateDepositAddressResp {
  currency: string;
  address: string;
  multichain_addresses: {
    chain: string;
    address: string;
    payment_id: string;
    payment_name: string;
    obtain_failed: number;
  }[];
}

export interface SubAccountTransferRecordResp {
  currency: string;
  sub_account: string;
  direction: 'to' | 'from';
  amount: string;
  uid: string;
  client_order_id: string;
  timest: string;
  source: string;
  sub_account_type: 'spot' | 'futures' | 'cross_margin' | 'delivery';
}

export interface GetWithdrawalStatusResp {
  currency: string;
  name: string;
  name_cn: string;
  deposit: string;
  withdraw_percent: string;
  withdraw_fix: string;
  withdraw_day_limit: string;
  withdraw_amount_mini: string;
  withdraw_day_limit_remain: string;
  withdraw_eachtime_limit: string;
  withdraw_fix_on_chains: { [key: string]: string };
  withdraw_percent_on_chains: { [key: string]: string };
}

export interface SubAccountMarginBalancesResp {
  uid: string;
  available: {
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
  }[];
}

export interface SubAccountFuturesBalancesResp {
  uid: string;
  available: {
    [key: string]: {
      total: string;
      unrealised_pnl: string;
      position_margin: string;
      order_margin: string;
      available: string;
      point: string;
      currency: string;
      in_dual_mode: boolean;
      enable_credit: boolean;
      position_initial_margin: string;
      maintenance_margin: string;
      bonus: string;
      enable_evolved_classic: boolean;
      history: {
        dnw: string;
        pnl: string;
        fee: string;
        refr: string;
        fund: string;
        point_dnw: string;
        point_fee: string;
        point_refr: string;
        bonus_dnw: string;
        bonus_offset: string;
      };
    };
  };
}

export interface SubAccountCrossMarginBalancesResp {
  uid: string;
  available: {
    user_id: number;
    locked: boolean;
    balances: {
      [key: string]: {
        available: string;
        freeze: string;
        borrowed: string;
        interest: string;
      };
    };
    total: string;
    borrowed: string;
    borrowed_net: string;
    net: string;
    leverage: string;
    interest: string;
    risk: string;
    total_initial_margin: string;
    total_margin_balance: string;
    total_maintenance_margin: string;
    total_initial_margin_rate: string;
    total_maintenance_margin_rate: string;
    total_available_margin: string;
  };
}

export interface GetSavedAddressResp {
  currency: string;
  chain: string;
  address: string;
  name: string;
  tag: string;
  verified: string;
}

export interface GetTradingFeesResp {
  user_id: number;
  taker_fee: string;
  maker_fee: string;
  gt_discount: boolean;
  gt_taker_fee: string;
  gt_maker_fee: string;
  loan_fee: string;
  point_type: string;
  futures_taker_fee: string;
  futures_maker_fee: string;
  delivery_taker_fee: string;
  delivery_maker_fee: string;
  debit_fee: number;
}

export interface GetBalancesResp {
  total: {
    amount: string;
    currency: string;
    unrealised_pnl?: string;
    borrowed?: string;
  };
  details: {
    [key: string]: {
      amount: string;
      currency: string;
      unrealised_pnl?: string;
      borrowed?: string;
    };
  };
}

export interface GetSmallBalancesResp {
  currency: string;
  available_balance: string;
  estimated_as_btc: string;
  convertible_to_gt: string;
}

export interface GetSmallBalanceHistoryResp {
  id: string;
  currency: string;
  amount: string;
  gt_amount: string;
  create_time: number;
}

export interface SubAccountResp {
  remark?: string;
  login_name: string;
  password?: string;
  email?: string;
  state: number;
  type: number;
  user_id: number;
  create_time: number;
}

export interface CreateSubAccountApiKeyResp {
  user_id: string;
  mode?: number;
  name?: string;
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
      | 'loan';
    read_only?: boolean;
  }[];
  ip_whitelist?: string[];
  key: string;
  state: number;
  created_at: number;
  updated_at: number;
  last_access: number;
}

export interface GetUnifiedAccountInfoResp {
  user_id: number;
  refresh_time: number;
  locked: boolean;
  balances: {
    [key: string]: {
      available: string;
      freeze: string;
      borrowed: string;
      negative_liab: string;
      futures_pos_liab: string;
      equity: string;
      total_freeze: string;
      total_liab: string;
      spot_in_use: string;
    };
  };
  total: string;
  borrowed: string;
  total_initial_margin: string;
  total_margin_balance: string;
  total_maintenance_margin: string;
  total_initial_margin_rate: string;
  total_maintenance_margin_rate: string;
  total_available_margin: string;
  unified_account_total: string;
  unified_account_total_liab: string;
  unified_account_total_equity: string;
  leverage: string;
  spot_order_loss: string;
  spot_hedge: boolean;
}

export interface GetUnifiedLoansResp {
  currency: string;
  currency_pair: string;
  amount: string;
  type: 'platform' | 'margin';
  create_time: number;
  update_time: number;
}

export interface GetUnifiedLoanRecordsResp {
  id: number;
  type: 'borrow' | 'repay';
  repayment_type: 'none' | 'manual_repay' | 'auto_repay' | 'cancel_auto_repay';
  currency_pair: string;
  currency: string;
  amount: string;
  create_time: number;
}
export interface GetUnifiedInterestRecordsResp {
  currency: string;
  currency_pair: string;
  actual_rate: string;
  interest: string;
  status: number;
  type: 'platform' | 'margin';
  create_time: number;
}

export interface GetUnifiedRiskUnitDetailsResp {
  user_id: number;
  spot_hedge: boolean;
  risk_units: {
    symbol: string;
    spot_in_use: string;
    maintain_margin: string;
    initial_margin: string;
    delta: string;
    gamma: string;
    theta: string;
    vega: string;
  }[];
}

export interface GetUnifiedCurrencyDiscountTiersResp {
  currency: string;
  discount_tiers: {
    tier: string;
    discount: string;
    lower_limit: string;
    upper_limit: string;
  }[];
}

export interface PortfolioMarginCalculatorResp {
  maintain_margin_total: string;
  initial_margin_total: string;
  calculate_time: number;
  risk_unit: {
    symbol: string;
    spot_in_use: string;
    maintain_margin: string;
    initial_margin: string;
    margin_result: {
      type:
        | 'original_position'
        | 'long_delta_original_position'
        | 'short_delta_original_position';
      profit_loss_ranges: {
        price_percentage: string;
        implied_volatility_percentage: string;
        profit_loss: string;
      }[];
      max_loss: {
        price_percentage: string;
        implied_volatility_percentage: string;
        profit_loss: string;
      };
      mr1: string;
      mr2: string;
      mr3: string;
      mr4: string;
      delta: string;
      gamma: string;
      theta: string;
      vega: string;
    }[];
  }[];
}

/**==========================================================================================================================
 * SPOT
 * ==========================================================================================================================
 */

export interface GetSpotCurrenciesResp {
  currency: string;
  delisted: boolean;
  withdraw_disabled: boolean;
  withdraw_delayed: boolean;
  deposit_disabled: boolean;
  trade_disabled: boolean;
  fixed_rate: string;
  chain: string;
}

export interface GetSpotTickerResp {
  currency_pair: string;
  last: string;
  lowest_ask: string;
  highest_bid: string;
  change_percentage: string;
  change_utc0: string;
  change_utc8: string;
  base_volume: string;
  quote_volume: string;
  high_24h: string;
  low_24h: string;
  etf_net_value: string;
  etf_pre_net_value: string | null;
  etf_pre_timestamp: number | null;
  etf_leverage: string | null;
}

export interface GetSpotOrderBookResp {
  id?: number;
  current: number;
  update: number;
  asks: [string, string][];
  bids: [string, string][];
}

export interface GetSpotTradesResp {
  id: string;
  create_time: string;
  create_time_ms: string;
  currency_pair: string;
  side: 'buy' | 'sell';
  role: 'taker' | 'maker';
  amount: string;
  price: string;
  order_id: string;
  fee: string;
  fee_currency: string;
  point_fee: string;
  gt_fee: string;
  amend_text: string;
  sequence_id: string;
  text: string;
}

export type GetSpotCandlesticksResp = [
  [
    string, // Unix timestamp with second precision
    string, // Trading volume in quote currency
    string, // Closing price
    string, // Highest price
    string, // Lowest price
    string, // Opening price
    string, // Trading volume in base currency
    boolean, // Whether the window is closed
  ],
];

export interface GetSpotFeeRatesResp {
  user_id: number;
  taker_fee: string;
  maker_fee: string;
  gt_discount: boolean;
  gt_taker_fee: string;
  gt_maker_fee: string;
  loan_fee: string;
  point_type: string;
  currency_pair: string;
  debit_fee: number;
}

export interface GetSpotBatchFeeRatesResp {
  [key: string]: {
    user_id: number;
    taker_fee: string;
    maker_fee: string;
    gt_discount: boolean;
    gt_taker_fee: string;
    gt_maker_fee: string;
    loan_fee: string;
    point_type: string;
    currency_pair: string;
    debit_fee: number;
  };
}

export interface GetSpotAccountsResp {
  currency: string;
  available: string;
  locked: string;
  update_id: number;
}

export interface GetSpotAccountBookResp {
  id: string;
  time: number;
  currency: string;
  change: string;
  balance: string;
  type: string;
  text: string;
}

export interface SubmitSpotBatchOrdersResp {
  order_id: string;
  amend_text: string;
  text: string;
  succeeded: boolean;
  label: string;
  message: string;
  id: string;
  create_time: string;
  update_time: string;
  create_time_ms: number;
  update_time_ms: number;
  status: 'open' | 'closed' | 'cancelled';
  currency_pair: string;
  type: 'limit' | 'market';
  account: 'spot' | 'margin' | 'cross_margin' | 'unified';
  side: 'buy' | 'sell';
  amount: string;
  price: string;
  time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
  iceberg: string;
  auto_repay: boolean;
  left: string;
  filled_amount: string;
  fill_price: string;
  filled_total: string;
  avg_deal_price: string;
  fee: string;
  fee_currency: string;
  point_fee: string;
  gt_fee: string;
  gt_discount: boolean;
  rebated_fee: string;
  rebated_fee_currency: string;
  stp_id: number;
  stp_act: 'cn' | 'co' | 'cb' | '-';
  finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
}

export interface GetSpotOpenOrdersResp {
  currency_pair: string;
  total: number;
  orders: Order[];
}

export interface DeleteSpotBatchOrdersResp {
  currency_pair: string;
  id: string;
  succeeded: boolean;
  label: string;
  message: string;
  account: string;
}

export interface GetSpotTradingHistoryResp {
  id: string;
  create_time: string;
  create_time_ms: string;
  currency_pair: string;
  side: 'buy' | 'sell';
  role: 'taker' | 'maker';
  amount: string;
  price: string;
  order_id: string;
  fee: string;
  fee_currency: string;
  point_fee: string;
  gt_fee: string;
  amend_text: string;
  sequence_id: string;
  text: string;
}

/**==========================================================================================================================
 * MARGIN
 * ==========================================================================================================================
 */

export interface GetMarginAccountsResp {
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

export interface GetMarginBalanceHistoryResp {
  id: string;
  time: string;
  time_ms: number;
  currency: string;
  currency_pair: string;
  change: string;
  balance: string;
  type: string;
}

export interface GetCrossMarginCurrenciesResp {
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

export interface GetCrossMarginAccountResp {
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

export interface GetCrossMarginAccountHistoryResp {
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

/**==========================================================================================================================
 * FLASH SWAP
 * ==========================================================================================================================
 */

export interface GetFlashSwapCurrencyPairsResp {
  currency_pair: string;
  sell_currency: string;
  buy_currency: string;
  sell_min_amount: string;
  sell_max_amount: string;
  buy_min_amount: string;
  buy_max_amount: string;
}

export interface FlashSwapOrderResp {
  id: number;
  create_time: number;
  user_id: number;
  sell_currency: string;
  sell_amount: string;
  buy_currency: string;
  buy_amount: string;
  price: string;
  status: number;
}

export interface SubmitFlashSwapOrderPreviewResp {
  preview_id: string;
  sell_currency: string;
  sell_amount: string;
  buy_currency: string;
  buy_amount: string;
  price: string;
}

/**==========================================================================================================================
 * FUTURES
 * ==========================================================================================================================
 */

export interface GetFuturesOrderBookResp {
  id?: number;
  current: number;
  update: number;
  asks: { p: string; s: number }[];
  bids: { p: string; s: number }[];
}

export interface GetFuturesTradesResp {
  id: number;
  create_time: number;
  create_time_ms: number;
  contract: string;
  size: number;
  price: string;
  is_internal?: boolean;
}

export interface GetFuturesCandlesticksResp {
  t: number;
  v?: number;
  c: string;
  h: string;
  l: string;
  o: string;
  sum: string;
}

export interface GetPremiumIndexKLineResp {
  t: number;
  c: string;
  h: string;
  l: string;
  o: string;
}

export interface GetFuturesTickersResp {
  contract: string;
  last: string;
  change_percentage: string;
  total_size: string;
  low_24h: string;
  high_24h: string;
  volume_24h: string;
  volume_24h_btc?: string;
  volume_24h_usd?: string;
  volume_24h_base: string;
  volume_24h_quote: string;
  volume_24h_settle: string;
  mark_price: string;
  funding_rate: string;
  funding_rate_indicative: string;
  index_price: string;
  quanto_base_rate?: string;
  basis_rate: string;
  basis_value: string;
  lowest_ask: string;
  highest_bid: string;
}

export interface GetFuturesStatsResp {
  time: number;
  lsr_taker: number;
  lsr_account: number;
  long_liq_size: number;
  long_liq_amount: number;
  long_liq_usd: number;
  short_liq_size: number;
  short_liq_amount: number;
  short_liq_usd: number;
  open_interest: number;
  open_interest_usd: number;
  top_lsr_account: number;
  top_lsr_size: number;
}

export interface GetIndexConstituentsResp {
  index: string;
  constituents: {
    exchange: string;
    symbols: string[];
  }[];
}

export interface GetLiquidationHistoryResp {
  time: number;
  contract: string;
  size: number;
  order_price: string;
  fill_price: string;
  left: number;
}

export interface GetRiskLimitTiersResp {
  tier: number;
  risk_limit: string;
  initial_rate: string;
  maintenance_rate: string;
  leverage_max: string;
  contract: string;
}

export interface GetFuturesAccountResp {
  total: string;
  unrealised_pnl: string;
  position_margin: string;
  order_margin: string;
  available: string;
  point: string;
  currency: string;
  in_dual_mode: boolean;
  enable_credit: boolean;
  position_initial_margin: string;
  maintenance_margin: string;
  bonus: string;
  enable_evolved_classic: boolean;
  history: {
    dnw: string;
    pnl: string;
    fee: string;
    refr: string;
    fund: string;
    point_dnw: string;
    point_fee: string;
    point_refr: string;
    bonus_dnw: string;
    bonus_offset: string;
  };
}

export interface GetFuturesAccountBookResp {
  time: number;
  change: string;
  balance: string;
  type: string;
  text: string;
  contract?: string;
  trade_id: string;
}

export interface ToggleFuturesDualModeResp {
  total: string;
  unrealised_pnl: string;
  position_margin: string;
  order_margin: string;
  available: string;
  point: string;
  currency: string;
  in_dual_mode: boolean;
  enable_credit: boolean;
  position_initial_margin: string;
  maintenance_margin: string;
  bonus: string;
  enable_evolved_classic: boolean;
  history: {
    dnw: string;
    pnl: string;
    fee: string;
    refr: string;
    fund: string;
    point_dnw: string;
    point_fee: string;
    point_refr: string;
    bonus_dnw: string;
    bonus_offset: string;
  };
}

export interface GetFuturesTradingHistoryResp {
  id: number;
  create_time: number;
  contract: string;
  order_id: string;
  size: number;
  price: string;
  role: 'taker' | 'maker';
  text: string;
  fee: string;
  point_fee: string;
}

export interface GetFuturesPositionHistoryResp {
  time: number;
  contract: string;
  side: 'long' | 'short';
  pnl: string;
  pnl_pnl: string;
  pnl_fund: string;
  pnl_fee: string;
  text: string;
  max_size: string;
  first_open_time: number;
  long_price: string;
  short_price: string;
}

export interface GetFuturesLiquidationHistoryResp {
  time: number;
  contract: string;
  leverage: string;
  size: number;
  margin: string;
  entry_price: string;
  liq_price: string;
  mark_price: string;
  order_id: number;
  order_price: string;
  fill_price: string;
  left: number;
}
export interface GetFuturesAutoDeleveragingHistoryResp {
  time: number;
  user: number;
  order_id: number;
  contract: string;
  leverage: string;
  cross_leverage_limit: string;
  entry_price: string;
  fill_price: string;
  trade_size: number;
  position_size: number;
}

export interface DeleteFuturesBatchOrdersResp {
  user_id: number;
  id: string;
  succeeded: boolean;
  message: string;
}

/**==========================================================================================================================
 * DELIVERY
 * ==========================================================================================================================
 */

export interface GetDeliveryOrderBookResp {
  id?: number;
  current: number;
  update: number;
  asks: { p: string; s: number }[];
  bids: { p: string; s: number }[];
}

export interface GetDeliveryTradesResp {
  id: number;
  create_time: number;
  create_time_ms: number;
  contract: string;
  size: number;
  price: string;
  is_internal?: boolean;
}

export interface GetDeliveryCandlesticksResp {
  t: number;
  v?: number;
  c: string;
  h: string;
  l: string;
  o: string;
}

export interface GetDeliveryTickersResp {
  contract: string;
  last: string;
  change_percentage: string;
  total_size: string;
  low_24h: string;
  high_24h: string;
  volume_24h: string;
  volume_24h_btc?: string;
  volume_24h_usd?: string;
  volume_24h_base: string;
  volume_24h_quote: string;
  volume_24h_settle: string;
  mark_price: string;
  funding_rate: string;
  funding_rate_indicative: string;
  index_price: string;
  quanto_base_rate?: string;
  basis_rate: string;
  basis_value: string;
  lowest_ask: string;
  highest_bid: string;
}

export interface GetDeliveryAccountResp {
  total: string;
  unrealised_pnl: string;
  position_margin: string;
  order_margin: string;
  available: string;
  point: string;
  currency: string;
  in_dual_mode: boolean;
  enable_credit: boolean;
  position_initial_margin: string;
  maintenance_margin: string;
  bonus: string;
  enable_evolved_classic: boolean;
  history: {
    dnw: string;
    pnl: string;
    fee: string;
    refr: string;
    fund: string;
    point_dnw: string;
    point_fee: string;
    point_refr: string;
    bonus_dnw: string;
    bonus_offset: string;
  };
}

export interface GetDeliveryBookResp {
  time: number;
  change: string;
  balance: string;
  type:
    | 'dnw'
    | 'pnl'
    | 'fee'
    | 'refr'
    | 'fund'
    | 'point_dnw'
    | 'point_fee'
    | 'point_refr'
    | 'bonus_offset';
  text: string;
  contract?: string;
  trade_id?: string;
}

export interface GetDeliveryTradingHistoryResp {
  id: number;
  create_time: number;
  contract: string;
  order_id: string;
  size: number;
  price: string;
  role: 'taker' | 'maker';
  text: string;
  fee: string;
  point_fee: string;
}

export interface GetDeliveryClosedPositionsResp {
  time: number;
  contract: string;
  side: 'long' | 'short';
  pnl: string;
  pnl_pnl: string;
  pnl_fund: string;
  pnl_fee: string;
  text: string;
  max_size: string;
  first_open_time: number;
  long_price: string;
  short_price: string;
}

export interface GetDeliveryLiquidationHistoryResp {
  time: number;
  contract: string;
  leverage?: string;
  size: number;
  margin?: string;
  entry_price?: string;
  liq_price?: string;
  mark_price?: string;
  order_id?: number;
  order_price: string;
  fill_price: string;
  left: number;
}

export interface GetDeliverySettlementHistoryResp {
  time: number;
  contract: string;
  leverage: string;
  size: number;
  margin: string;
  entry_price: string;
  settle_price: string;
  profit: string;
  fee: string;
}

/**==========================================================================================================================
 * OPTIONS
 * ==========================================================================================================================
 */

export interface GetOptionsContractsResp {
  name: string;
  tag: string;
  create_time: number;
  expiration_time: number;
  is_call: boolean;
  strike_price: string;
  last_price: string;
  mark_price: string;
  orderbook_id: number;
  trade_id: number;
  trade_size: number;
  position_size: number;
  underlying: string;
  underlying_price: string;
  multiplier: string;
  order_price_round: string;
  mark_price_round: string;
  maker_fee_rate: string;
  taker_fee_rate: string;
  price_limit_fee_rate: string;
  ref_discount_rate: string;
  ref_rebate_rate: string;
  order_price_deviate: string;
  order_size_min: number;
  order_size_max: number;
  orders_limit: number;
}

export interface GetOptionsSettlementHistoryResp {
  time: number;
  contract: string;
  profit: string;
  fee: string;
  strike_price: string;
  settle_price: string;
}

export interface GetOptionsMySettlementsResp {
  time: number;
  underlying: string;
  contract: string;
  strike_price: string;
  settle_price: string;
  size: number;
  settle_profit: string;
  fee: string;
  realised_pnl: string;
}

export interface GetOptionsOrderBookResp {
  id?: number;
  current: number;
  update: number;
  asks: { p: string; s: number }[];
  bids: { p: string; s: number }[];
}

export interface GetOptionsTickersResp {
  name: string;
  last_price: string;
  mark_price: string;
  index_price: string;
  ask1_size: number;
  ask1_price: string;
  bid1_size: number;
  bid1_price: string;
  position_size: number;
  mark_iv: string;
  bid_iv: string;
  ask_iv: string;
  leverage: string;
  delta: string;
  gamma: string;
  vega: string;
  theta: string;
  rho: string;
}

export interface GetOptionsCandlesticksResp {
  t: number;
  v?: number;
  c: string;
  h: string;
  l: string;
  o: string;
}

export interface GetOptionsUnderlyingCandlesticksResp {
  t: number;
  v?: number;
  c: string;
  h: string;
  l: string;
  o: string;
  sum: string;
}

export interface GetOptionsTradesResp {
  id: number;
  create_time: number;
  create_time_ms: number;
  contract: string;
  size: number;
  price: string;
  is_internal?: boolean;
}

export interface GetOptionsAccountResp {
  user: number;
  total: string;
  short_enabled: boolean;
  unrealised_pnl: string;
  init_margin: string;
  maint_margin: string;
  order_margin: string;
  available: string;
  point: string;
  currency: string;
}
export interface GetOptionsAccountChangeResp {
  time: number;
  change: string;
  balance: string;
  type: 'dnw' | 'prem' | 'fee' | 'refr' | 'set';
  text: string;
}

export interface GetOptionsPositionsUnderlyingResp {
  user: number;
  underlying: string;
  underlying_price: string;
  contract: string;
  size: number;
  entry_price: string;
  mark_price: string;
  mark_iv: string;
  realised_pnl: string;
  unrealised_pnl: string;
  pending_orders: number;
  close_order: {
    id: number;
    price: string;
    is_liq: boolean;
  } | null;
  delta: string;
  gamma: string;
  vega: string;
  theta: string;
}

export interface GetOptionsLiquidationResp {
  time: number;
  contract: string;
  side: 'long' | 'short';
  pnl: string;
  text: string;
  settle_size: string;
}

export interface SubmitOptionsOrderResp {
  id: number;
  user: number;
  create_time: number;
  finish_time: number;
  finish_as:
    | 'filled'
    | 'cancelled'
    | 'liquidated'
    | 'ioc'
    | 'auto_deleveraged'
    | 'reduce_only'
    | 'position_closed';
  status: 'open' | 'finished';
  contract: string;
  size: number;
  iceberg: number;
  price: string;
  is_close: boolean;
  is_reduce_only: boolean;
  is_liq: boolean;
  tif: 'gtc' | 'ioc' | 'poc';
  left: number;
  fill_price: string;
  text: string;
  tkfr: string;
  mkfr: string;
  refu: number;
  refr: string;
}

export interface GetOptionsPersonalHistoryResp {
  id: number;
  create_time: number;
  contract: string;
  order_id: number;
  size: number;
  price: string;
  underlying_price: string;
  role: 'taker' | 'maker';
}

/**==========================================================================================================================
 * EARN UNI
 * ==========================================================================================================================
 */

export interface GetLendingCurrenciesResp {
  currency: string;
  min_lend_amount: string;
  max_lend_amount: string;
  max_rate: string;
  min_rate: string;
}

export interface GetLendingOrdersResp {
  currency: string;
  current_amount: string;
  amount: string;
  lent_amount: string;
  frozen_amount: string;
  min_rate: string;
  interest_status: string;
  reinvest_left_amount: string;
  create_time: number;
  update_time: number;
}

export interface GetLendingRecordsResp {
  currency: string;
  amount: string;
  last_wallet_amount: string;
  last_lent_amount: string;
  last_frozen_amount: string;
  type: 'lend' | 'redeem';
  create_time: number;
}

export interface GetLendingInterestRecordsResp {
  status: number;
  currency: string;
  actual_rate: string;
  interest: string;
  interest_status: string;
  create_time: number;
}

/**==========================================================================================================================
 * COLLATERAL LOAN
 * ==========================================================================================================================
 */

export interface GetLoanOrdersResp {
  order_id: number;
  collateral_currency: string;
  collateral_amount: string;
  borrow_currency: string;
  borrow_amount: string;
  repaid_amount: string;
  repaid_principal: string;
  repaid_interest: string;
  init_ltv: string;
  current_ltv: string;
  liquidate_ltv: string;
  status: string;
  borrow_time: number;
  left_repay_total: string;
  left_repay_principal: string;
  left_repay_interest: string;
}

export interface GetLoanRepaymentHistoryResp {
  order_id: number;
  record_id: number;
  repaid_amount: string;
  borrow_currency: string;
  collateral_currency: string;
  init_ltv: string;
  borrow_time: number;
  repay_time: number;
  total_interest: string;
  before_left_principal: string;
  after_left_principal: string;
  before_left_collateral: string;
  after_left_collateral: string;
}

export interface GetLoanCollateralRecordsResp {
  order_id: number;
  record_id: number;
  borrow_currency: string;
  borrow_amount: string;
  collateral_currency: string;
  before_collateral: string;
  after_collateral: string;
  before_ltv: string;
  after_ltv: string;
  operate_time: number;
}

export interface GetLoanCollateralizationRatioResp {
  collateral_currency: string;
  borrow_currency: string;
  init_ltv: string;
  alert_ltv: string;
  liquidate_ltv: string;
  min_borrow_amount: string;
  left_borrowable_amount: string;
}

/**==========================================================================================================================
 * MULTI COLLATERAL LOAN
 * ==========================================================================================================================
 */

export interface GetMultiLoanOrdersResp {
  order_id: string;
  order_type: string;
  fixed_type: string;
  fixed_rate: string;
  expire_time: number;
  auto_renew: boolean;
  auto_repay: boolean;
  current_ltv: string;
  status: string;
  borrow_time: number;
  total_left_repay_usdt: string;
  total_left_collateral_usdt: string;
  borrow_currencies: {
    currency: string;
    index_price: string;
    left_repay_principal: string;
    left_repay_interest: string;
    left_repay_usdt: string;
  }[];
  collateral_currencies: {
    currency: string;
    index_price: string;
    left_collateral: string;
    left_collateral_usdt: string;
  }[];
}

export interface RepayMultiLoanResp {
  order_id: number;
  repaid_currencies: {
    succeeded: boolean;
    label?: string;
    message?: string;
    currency: string;
    repaid_principal: string;
    repaid_interest: string;
  }[];
}

export interface GetMultiLoanRepayRecordsResp {
  order_id: number;
  record_id: number;
  init_ltv: string;
  before_ltv: string;
  after_ltv: string;
  borrow_time: number;
  repay_time: number;
  borrow_currencies: {
    currency: string;
    index_price: string;
    before_amount: string;
    before_amount_usdt: string;
    after_amount: string;
    after_amount_usdt: string;
  }[];
  collateral_currencies: {
    currency: string;
    index_price: string;
    before_amount: string;
    before_amount_usdt: string;
    after_amount: string;
    after_amount_usdt: string;
  }[];
  repaid_currencies: {
    currency: string;
    index_price: string;
    repaid_amount: string;
    repaid_principal: string;
    repaid_interest: string;
    repaid_amount_usdt: string;
  }[];
  total_interest_list: {
    currency: string;
    index_price: string;
    amount: string;
    amount_usdt: string;
  }[];
  left_repay_interest_list: {
    currency: string;
    index_price: string;
    before_amount: string;
    before_amount_usdt: string;
    after_amount: string;
    after_amount_usdt: string;
  }[];
}

export interface UpdateMultiLoanResp {
  order_id: number;
  collateral_currencies: {
    succeeded: boolean;
    label?: string;
    message?: string;
    currency: string;
    amount: string;
  }[];
}

export interface GetMultiLoanAdjustmentRecordsResp {
  order_id: number;
  record_id: number;
  before_ltv: string;
  after_ltv: string;
  operate_time: number;
  borrow_currencies: {
    currency: string;
    index_price: string;
    before_amount: string;
    before_amount_usdt: string;
    after_amount: string;
    after_amount_usdt: string;
  }[];
  collateral_currencies: {
    currency: string;
    index_price: string;
    before_amount: string;
    before_amount_usdt: string;
    after_amount: string;
    after_amount_usdt: string;
  }[];
}

export interface GetMultiLoanCurrencyQuotaResp {
  currency: string;
  index_price: string;
  min_quota: string;
  left_quota: string;
  left_quote_usdt: string;
}

export interface GetMultiLoanSupportedCurrenciesResp {
  loan_currencies: {
    currency: string;
    price: string;
  }[];
  collateral_currencies: {
    currency: string;
    index_price: string;
    discount: string;
  }[];
}

export interface GetMultiLoanRatioResp {
  init_ltv: string;
  alert_ltv: string;
  liquidate_ltv: string;
}

export interface GetMultiLoanFixedRatesResp {
  currency: string;
  rate_7d: string;
  rate_30d: string;
  update_time: number;
}

/**==========================================================================================================================
 * EARN
 * ==========================================================================================================================
 */

export interface GetDualInvestmentProductsResp {
  id: number;
  instrument_name: string;
  invest_currency: string;
  exercise_currency: string;
  exercise_price: number;
  delivery_time: number;
  min_copies: number;
  max_copies: number;
  per_value: string;
  apy_display: string;
  start_time: number;
  end_time: number;
  status: 'NOTSTARTED' | 'ONGOING' | 'ENDED';
}

export interface GetDualInvestmentOrdersResp {
  id: number;
  plan_id: number;
  copies: string;
  invest_amount: string;
  settlement_amount: string;
  create_time: number;
  complete_time: number;
  status:
    | 'INIT'
    | 'SETTLEMENT_SUCCESS'
    | 'SETTLEMENT_PROCESSING'
    | 'CANCELED'
    | 'FAILED';
  invest_currency: string;
  exercise_currency: string;
  exercise_price: string;
  settlement_price: string;
  settlement_currency: string;
  apy_display: string;
  apy_settlement: string;
  delivery_time: number;
}

export interface GetStructuredProductListResp {
  id: number;
  type: string;
  name_en: string;
  investment_coin: string;
  investment_period: string;
  min_annual_rate: string;
  mid_annual_rate: string;
  max_annual_rate: string;
  watch_market: string;
  start_time: number;
  end_time: number;
  status: 'in_process' | 'will_begin' | 'wait_settlement' | 'done';
}

export interface GetStructuredProductOrdersResp {
  id: number;
  pid: string;
  lock_coin: string;
  amount: string;
  status: 'SUCCESS' | 'FAILED' | 'DONE';
  income: string;
  create_time: number;
}

/**==========================================================================================================================
 * ACCOUNT
 * ==========================================================================================================================
 */

export interface GetAccountDetailResp {
  user_id: number;
  ip_whitelist: string[];
  currency_pairs: string[];
  key: {
    mode: number;
  };
  tier: number;
}

export interface CreateStpGroupResp {
  id: number;
  name: string;
  creator_id: number;
  create_time: number;
}
