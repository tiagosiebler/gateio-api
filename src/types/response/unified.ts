export interface UnifiedAccountInfo {
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
      funding: string;
      funding_version: string;
      cross_balance: string; // Full margin balance is valid in single currency margin mode, and is 0 in other modes such as cross currency margin/combined margin mode
      iso_balance: string; // Isolated Margin Balance applies to Single-Currency Margin Mode and Cross-Currency Margin Mode, and is 0 in other modes such as Portfolio Margin Mode
      im: string;
      mm: string;
      mmr: string;
      margin_balance: string;
      available_margin: string;
      imr?: string;
      enabled_collateral?: boolean;
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
  spot_order_loss: string; // Spot Pending Order Loss, in USDT, effective only in Cross-Currency Margin Mode and Portfolio Margin Mode
  options_order_loss?: string; // v4.105.29: Option Pending Order Loss, in USDT, effective only in Portfolio Margin Mode
  spot_hedge: boolean;
  margin_mode?: string;
  total_balance?: string;
  cross_leverage?: string;
  portfolio_margin?: string;
  risk_level?: string;
  is_all_collateral?: boolean;
  borrow_amount?: string;
  cross_margin_leverage?: string;
  use_funding?: boolean;
}

export interface UnifiedLoan {
  currency: string;
  currency_pair: string;
  amount: string;
  type: 'platform' | 'margin';
  create_time: number;
  update_time: number;
}

export interface UnifiedLoanRecord {
  id: number;
  type: 'borrow' | 'repay';
  repayment_type: 'none' | 'manual_repay' | 'auto_repay' | 'cancel_auto_repay';
  currency_pair: string;
  currency: string;
  amount: string;
  create_time: number;
  borrow_type: string;
}
export interface UnifiedInterestRecord {
  currency: string;
  currency_pair: string;
  actual_rate: string;
  interest: string;
  status: number;
  type: 'platform' | 'margin';
  create_time: number;
}

export interface UnifiedRiskUnitDetails {
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

export interface UnifiedCurrencyDiscountTiers {
  currency: string;
  discount_tiers: {
    tier: string;
    discount: string;
    lower_limit: string;
    upper_limit: string;
    leverage: string;
  }[];
}

export interface UserCurrencyLeverageConfig {
  current_leverage: string;
  min_leverage: string;
  max_leverage: string;
  debit: string;
  available_margin: string;
  borrowable: string;
  except_leverage_borrowable: string;
}

export interface UnifiedLoanCurrency {
  name: string;
  prec: string;
  min_borrow_amount: string;
  user_max_borrow_amount: string;
  total_max_borrow_amount: string;
  loan_status: string;
}

export interface UnifiedHistoryLendingRate {
  currency: string;
  tier: string;
  tier_up_rate: string;
  rates: {
    time: number;
    rate: string;
  }[];
}

export interface MarginTier {
  tier: string;
  margin_rate: string;
  lower_limit: string;
  upper_limit: string;
}

export interface PortfolioMarginCalculation {
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

export interface UnifiedCollateralCurrenciesResp {
  is_success: boolean;
}
