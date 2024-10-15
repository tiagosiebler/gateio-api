/**==========================================================================================================================
 * ACCOUNT
 * ==========================================================================================================================
 */

export interface AccountDetail {
  user_id: number;
  ip_whitelist: string[];
  currency_pairs: string[];
  key: {
    mode: number;
  };
  tier: number;
  copy_trading_role: number;
}

export interface AccountRateLimit {
  type: string;
  tier: string;
  ratio: string;
  main_ratio: string;
  updated_at: string;
}

export interface StpGroup {
  id: number;
  name: string;
  creator_id: number;
  create_time: number;
}

export interface StpGroupUser {
  user_id: number;
  stp_id: number;
  create_time: number;
}
