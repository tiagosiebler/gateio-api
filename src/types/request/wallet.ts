export interface GetWithdrawalDepositRecordsReq {
  currency?: string;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface SubmitTransferReq {
  currency: string;
  from: 'spot' | 'margin' | 'futures' | 'delivery' | 'cross_margin' | 'options';
  to: 'spot' | 'margin' | 'futures' | 'delivery' | 'cross_margin' | 'options';
  amount: string;
  currency_pair?: string;
  settle?: string;
}

export interface GetMainSubTransfersReq {
  sub_uid?: string;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface GetSavedAddressReq {
  currency: string;
  chain?: string;
  limit?: string;
  page?: number;
}

export interface GetSmallBalanceHistoryReq {
  currency?: string;
  page?: number;
  limit?: number;
}

export interface ListPushOrdersReq {
  id?: number;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface SubmitSubToSubTransferReq {
  currency: string;
  sub_account_from: string;
  sub_account_from_type: 'spot' | 'futures' | 'delivery' | 'cross_margin';
  sub_account_to: string;
  sub_account_to_type: 'spot' | 'futures' | 'delivery' | 'cross_margin';
  amount: string;
  sub_account_type?: string;
}

export interface SubmitMainSubTransferReq {
  currency: string;
  sub_account: string;
  direction: 'to' | 'from';
  amount: string;
  client_order_id?: string;
  sub_account_type?: 'spot' | 'futures' | 'cross_margin' | 'delivery';
}
