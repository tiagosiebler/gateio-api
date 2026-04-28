export interface UnifiedAccountInfo {
  mode: 'classic' | 'multi_currency' | 'portfolio' | 'single_currency'; // classic: Classic account; multi_currency: Multi-currency margin; portfolio: Portfolio margin; single_currency: Single-currency margin
  user_id: number;
  refresh_time: number;
  locked: boolean; // Whether the account is locked; valid in cross-currency/combined margin mode, false in other modes such as single-currency margin
  balances: {
    [key: string]: {
      available: string; // Cross available balance, after deducting futures isolated margin occupation and frozen amount (futures isolated occupation = futures isolated balance); effective in single-currency/multi-currency/portfolio margin mode
      freeze: string; // Frozen amount; effective in single-currency/multi-currency/portfolio margin mode
      borrowed: string; // Borrowed amount; valid in cross-currency/combined margin mode, 0 in other modes such as single-currency margin
      negative_liab: string; // Negative balance borrowing; valid in cross-currency/combined margin mode, 0 in other modes such as single-currency margin
      futures_pos_liab: string; // Contract opening position borrowing currency (abandoned, to be removed)
      equity: string; // Currency equity amount (cross); effective in single-currency/multi-currency/portfolio margin mode
      total_freeze: string; // Total frozen (deprecated, to be removed)
      total_liab: string; // Total borrowed amount; valid in cross-currency/combined margin mode, 0 in other modes such as single-currency margin
      spot_in_use: string; // Spot hedging amount; valid in combined (portfolio) margin mode, 0 in single-currency and cross-currency margin modes
      funding: string; // Uniloan / Earn amount; effective when Earn is enabled as unified account margin
      funding_version: string; // Funding version
      cross_balance: string; // Full margin balance; valid in single-currency margin mode, 0 in cross-currency/combined margin mode
      iso_balance: string; // Futures isolated balance; effective in single-currency and multi-currency margin mode, 0 in portfolio margin mode
      im: string; // Cross initial margin; only effective for USDT in single-currency margin mode, 0 in multi-currency/portfolio margin mode
      mm: string; // Cross maintenance margin; only effective for USDT in single-currency margin mode, 0 in multi-currency/portfolio margin mode
      mmr: string; // Cross maintenance margin rate; only effective for USDT in single-currency margin mode, 0 in multi-currency/portfolio margin mode
      margin_balance: string; // Cross margin balance; only effective for USDT in single-currency margin mode, 0 in multi-currency/portfolio margin mode
      available_margin: string; // Cross available margin; only effective for USDT in single-currency margin mode, 0 in multi-currency/portfolio margin mode
      imr?: string; // Cross initial margin rate; only effective for USDT in single-currency margin mode, 0 in multi-currency/portfolio margin mode
      enabled_collateral?: boolean; // Currency enabled as margin: true — enabled, false — disabled
      balance_version?: number; // Balance version number (int64)
    };
  };
  total: string; // Total account assets in USD: sum of (available + freeze) * price per currency (deprecated; use unified_account_total)
  borrowed: string; // Total borrowed in USD: sum of borrowed * price (excluding point cards); valid in cross-currency/combined margin mode, 0 in single-currency margin mode
  total_initial_margin: string; // Total initial margin (cross); effective in multi-currency/portfolio margin mode, 0 in single-currency margin mode
  total_margin_balance: string; // Total margin balance (cross); effective in multi-currency/portfolio margin mode, 0 in single-currency margin mode
  total_maintenance_margin: string; // Total maintenance margin (cross); effective in multi-currency/portfolio margin mode, 0 in single-currency margin mode
  total_initial_margin_rate: string; // Total initial margin rate (cross); effective in multi-currency/portfolio margin mode, 0 in single-currency margin mode
  total_maintenance_margin_rate: string; // Total maintenance margin rate (cross); effective in multi-currency/portfolio margin mode, 0 in single-currency margin mode
  total_available_margin: string; // Available margin; valid in cross-currency/combined margin mode, 0 in single-currency margin mode
  unified_account_total: string; // Total unified account assets: cross + isolated in single/multi-currency mode; cross only in portfolio margin mode
  unified_account_total_liab: string; // Total unified borrowed (cross); effective in multi-currency/portfolio margin mode, 0 in single-currency margin mode
  unified_account_total_equity: string; // Total unified equity: cross + isolated in single/multi-currency mode; cross only in portfolio margin mode
  leverage: string; // Account leverage; effective in multi-currency/portfolio margin mode (deprecated; prefer GET /unified/leverage/user_currency_setting)
  spot_order_loss: string; // Spot pending order loss (USDT); only in cross-currency and portfolio margin mode
  options_order_loss?: string; // v4.105.29: Option pending order loss (USDT); only in portfolio margin mode
  spot_hedge: boolean; // Spot hedging: true — enabled, false — disabled
  margin_mode?: string;
  total_balance?: string;
  cross_leverage?: string;
  portfolio_margin?: string;
  risk_level?: string;
  is_all_collateral?: boolean; // Whether all currencies are used as margin: true — all as margin, false — not all
  borrow_amount?: string;
  cross_margin_leverage?: string;
  use_funding?: boolean; // Whether Earn funds are used as margin
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
