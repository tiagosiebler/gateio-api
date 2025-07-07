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
  commission_amount: string;
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
  source: string;
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
  source: string;
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
  commission_amount: string;
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
