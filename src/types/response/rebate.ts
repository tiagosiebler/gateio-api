export interface AgencyTransactionHistoryRecord {
  transaction_time: number;
  user_id: number;
  group_name: string;
  fee: string;
  fee_asset: string;
  currency_pair: string;
  amount: string;
  amount_asset: string;
  source: string;
}

export interface AgencyCommissionHistoryRecord {
  commission_time: number;
  user_id: number;
  group_name: string;
  /** Rebate commission amount (not a generic trade notional). */
  commission_amount: string;
  /** Asset of the rebate commission. */
  commission_asset: string;
  source: string;
}

export interface PartnerSubordinate {
  user_id: number;
  user_join_time: number;
  type: number;
  desc: string;
}

export interface BrokerCommissionHistoryRecord {
  commission_time: number;
  user_id: number;
  group_name: string;
  amount: string;
  fee: string;
  fee_asset: string;
  rebate_fee: string;
  source: string; // Rebate source, e.g. Spot, Futures, Options, Alpha, TradFi
  currency_pair: string;
  sub_broker_info: {
    user_id: number;
    original_commission_rate: string;
    relative_commission_rate: string;
    commission_rate: string;
  };
}

export interface BrokerTransactionHistoryRecord {
  transaction_time: number;
  user_id: number;
  group_name: string;
  fee: string;
  currency_pair: string;
  amount: string;
  fee_asset: string;
  source: string; // Rebate source, e.g. Spot, Futures, Options, Alpha, TradFi
  sub_broker_info: {
    user_id: number;
    original_commission_rate: string;
    relative_commission_rate: string;
    commission_rate: string;
  };
}

export interface PartnerCommission {
  commission_time: number;
  user_id: number;
  group_name: string;
  /** Rebate commission amount (not a generic trade notional). */
  commission_amount: string;
  /** Asset of the rebate commission. */
  commission_asset: string;
  source: string;
}

export interface PartnerTransaction {
  transaction_time: number;
  user_id: number;
  group_name: string;
  fee: string;
  fee_asset: string;
  currency_pair: string;
  amount: string;
  amount_asset: string;
  source: string;
}

/** `data` object for GET /rebate/partner/data/aggregated */
export interface PartnerDataAggregated {
  rebate_amount: string;
  trade_volume: string;
  net_fee: string;
  customer_count: number;
  /** Only when querying all business types (`business_type=0`); may be null */
  trading_user_count?: string | null;
  time_range_desc: string;
  business_type: number;
  business_type_desc: string;
}

export interface PartnerDataAggregatedResponse {
  code: number;
  message: string;
  data: PartnerDataAggregated;
  timestamp: number;
}
