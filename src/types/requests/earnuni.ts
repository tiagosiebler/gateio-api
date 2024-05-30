/**==========================================================================================================================
 * EARN UNI
 * ==========================================================================================================================
 */

export interface SubmitLendOrRedeemReq {
  currency: string;
  amount: string;
  type: 'lend' | 'redeem';
  min_rate?: string;
}

export interface GetLendingOrdersReq {
  currency?: string;
  page?: number;
  limit?: number;
}

export interface GetLendingRecordsReq {
  currency?: string;
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
  type?: 'lend' | 'redeem';
}

export interface GetLendingInterestRecordsReq {
  currency?: string;
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
}
