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
