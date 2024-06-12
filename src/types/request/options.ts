/**==========================================================================================================================
 * OPTIONS
 * ==========================================================================================================================
 */
export interface GetOptionsSettlementHistoryReq {
  underlying: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
}
export interface GetOptionsMySettlementsReq {
  underlying: string;
  contract?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
}

export interface GetOptionsOrderBookReq {
  contract: string;
  interval?: '0' | '0.1' | '0.01';
  limit?: number;
  with_id?: boolean;
}

export interface GetOptionsCandlesReq {
  contract: string;
  limit?: number;
  from?: number;
  to?: number;
  interval?: '1m' | '5m' | '15m' | '30m' | '1h';
}

export interface GetOptionsUnderlyingCandlesReq {
  underlying: string;
  limit?: number;
  from?: number;
  to?: number;
  interval?: '1m' | '5m' | '15m' | '30m' | '1h';
}

export interface GetOptionsTradesReq {
  contract?: string;
  type?: 'C' | 'P';
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
}

export interface GetOptionsAccountChangeReq {
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
  type?: 'dnw' | 'prem' | 'fee' | 'refr' | 'set';
}

export interface SubmitOptionsOrderReq {
  contract: string;
  size: number;
  iceberg?: number;
  price?: string;
  close?: boolean;
  reduce_only?: boolean;
  tif?: 'gtc' | 'ioc' | 'poc';
  text?: string;
}

export interface GetOptionsOrdersReq {
  contract?: string;
  underlying?: string;
  status: 'open' | 'finished';
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
}

export interface GetOptionsPersonalHistoryReq {
  underlying: string;
  contract?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
}
