export interface GetAgencyTransactionHistoryReq {
  currency_pair?: string;
  user_id?: number;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface GetAgencyCommissionHistoryReq {
  currency?: string;
  user_id?: number;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface GetPartnerSubordinateListReq {
  user_id?: number;
  limit?: number;
  offset?: number;
}

export interface GetBrokerCommissionHistoryReq {
  limit?: number;
  offset?: number;
  user_id?: number;
  from?: number;
  to?: number;
}

export interface GetBrokerTransactionHistoryReq {
  limit?: number;
  offset?: number;
  user_id?: number;
  from?: number;
  to?: number;
}

// Interfaces for request and response
export interface PartnerTransactionReq {
  currency_pair?: string;
  user_id?: number;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

/** GET /rebate/partner/data/aggregated */
export interface GetPartnerAgentDataAggregatedReq {
  /** `yyyy-mm-dd hh:ii:ss` (UTC+8); default start of last 7 days */
  start_date?: string;
  /** `yyyy-mm-dd hh:ii:ss` (UTC+8); default end of last 7 days */
  end_date?: string;
  /**
   * 0 All (default), 1 Spot, 2 Futures, 3 Alpha, 4 Web3, 5 Perps (DEX),
   * 6 Exchange All, 7 Web3 All, 8 TradFi. `trading_user_count` only when 0.
   */
  business_type?: number;
}
