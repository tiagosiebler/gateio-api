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
