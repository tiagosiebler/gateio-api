export interface CurrencyChain {
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

export interface SubAccountTransferRecord {
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

export interface WithdrawalStatus {
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

export interface SubAccountMarginBalance {
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

export interface SavedAddress {
  currency: string;
  chain: string;
  address: string;
  name: string;
  tag: string;
  verified: string;
}

export interface TradingFees {
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

export interface SmallBalanceRecord {
  currency: string;
  available_balance: string;
  estimated_as_btc: string;
  convertible_to_gt: string;
}

export interface SmallBalanceHistoryRecord {
  id: string;
  currency: string;
  amount: string;
  gt_amount: string;
  create_time: number;
}
