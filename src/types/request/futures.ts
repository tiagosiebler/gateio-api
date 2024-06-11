/**==========================================================================================================================
 * FUTURES
 * ==========================================================================================================================
 */

import { FuturesOrder, FuturesPriceTriggeredOrder } from '../response/futures';

export interface GetFuturesOrderBookReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  interval?: string;
  limit?: number;
  with_id?: boolean;
}

export interface GetFuturesTradesReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  limit?: number;
  offset?: number;
  last_id?: string;
  from?: number;
  to?: number;
}

export interface GetFuturesCandlesticksReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  from?: number;
  to?: number;
  limit?: number;
  interval?: string;
}

export interface GetFuturesStatsReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  from?: number;
  interval?: string;
  limit?: number;
}

export interface GetLiquidationHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  from?: number;
  to?: number;
  limit?: number;
}

export interface GetRiskLimitTiersReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  limit?: number;
  offset?: number;
}

export interface GetFuturesAccountBookReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
  type?:
    | 'dnw'
    | 'pnl'
    | 'fee'
    | 'refr'
    | 'fund'
    | 'point_dnw'
    | 'point_fee'
    | 'point_refr'
    | 'bonus_offset';
}

export interface GetFuturesPositionsReq {
  settle: 'btc' | 'usdt' | 'usd';
  holding?: boolean;
  limit?: number;
  offset?: number;
}

export interface UpdateDualModePositionMarginReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  change: string;
  dual_side: 'dual_long' | 'dual_short';
}

export interface UpdateDualModePositionLeverageReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  leverage: string;
  cross_leverage_limit?: string;
}

export interface SubmitFuturesOrderReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  size: number;
  iceberg?: number;
  price?: string;
  close?: boolean;
  reduce_only?: boolean;
  tif?: string;
  text?: string;
  auto_size?: string;
  stp_act?: string;
}

export interface GetFuturesOrdersReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  status: string;
  limit?: number;
  offset?: number;
  last_id?: string;
}

export interface DeleteAllFuturesOrdersReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract: string;
  side?: string;
}

export interface GetFuturesOrdersByTimeRangeReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  from?: number;
  to?: number;
  limit?: number;
  offset?: number;
}

export interface SubmitFuturesBatchOrdersReq extends FuturesOrder {
  settle: 'btc' | 'usdt' | 'usd';
}

export interface UpdateFuturesOrderReq {
  settle: 'btc' | 'usdt' | 'usd';
  order_id: string;
  size?: number;
  price?: string;
  amend_text?: string;
}

export interface GetFuturesTradingHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  order?: number;
  limit?: number;
  offset?: number;
  last_id?: string;
}

export interface GetFuturesPositionHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  limit?: number;
  offset?: number;
  from?: number;
  to?: number;
  side?: 'long' | 'short';
  pnl?: string;
}

export interface GetFuturesLiquidationHistoryReq {
  settle: 'btc' | 'usdt' | 'usd';
  contract?: string;
  limit?: number;
  at?: number;
}

export interface SubmitFuturesPriceTriggeredOrderReq
  extends FuturesPriceTriggeredOrder {
  settle: 'btc' | 'usdt' | 'usd';
}

export interface GetFuturesAutoOrdersReq {
  settle: 'btc' | 'usdt' | 'usd';
  status: 'open' | 'finished';
  contract?: string;
  limit?: number;
  offset?: number;
}
