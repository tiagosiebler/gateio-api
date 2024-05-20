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
