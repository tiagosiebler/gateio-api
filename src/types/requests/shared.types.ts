export interface GetWithdrawalDepositRecordsReq {
  currency?: string;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface SubmitTransferReq {
  body: {
    currency: string;
    from:
      | 'spot'
      | 'margin'
      | 'futures'
      | 'delivery'
      | 'cross_margin'
      | 'options';
    to: 'spot' | 'margin' | 'futures' | 'delivery' | 'cross_margin' | 'options';
    amount: string;
    currency_pair?: string;
    settle?: string;
  };
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
