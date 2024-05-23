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

export interface StpResp {
  user_id: number;
  stp_id: number;
  create_time: number;
}
