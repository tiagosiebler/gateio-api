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

export interface GetBrokerCommissionHistoryReq {
  limit?: number;
  offset?: number;
  user_id?: number;
}

export interface GetBrokerTransactionHistoryReq {
  limit?: number;
  offset?: number;
  user_id?: number;
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



