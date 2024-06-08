/**==========================================================================================================================
 * DELIVERY
 * ==========================================================================================================================
 */

import { FuturesPriceTriggeredOrder } from '../shared';

export interface GetDeliveryOrderBookReq {
  settle: 'usdt';
  contract: string;
  interval?: '0' | '0.1' | '0.01';
  limit?: number;
  with_id?: boolean;
}

export interface GetDeliveryTradesReq {
  settle: 'usdt';
  contract: string;
  limit?: number;
  last_id?: string;
  from?: number;
  to?: number;
}

export interface GetDeliveryCandlesticksReq {
  settle: 'usdt';
  contract: string;
  from?: number;
  to?: number;
  limit?: number;
  interval?:
    | '10s'
    | '30s'
    | '1m'
    | '5m'
    | '15m'
    | '30m'
    | '1h'
    | '2h'
    | '4h'
    | '6h'
    | '8h'
    | '12h'
    | '1d'
    | '7d'
    | '1w'
    | '30d';
}

export interface GetDeliveryBookReq {
  settle: 'usdt';
  limit?: number;
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

export interface SubmitDeliveryFuturesOrderReq {
  settle: 'usdt';
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

export interface GetDeliveryOrdersReq {
  settle: 'usdt';
  contract?: string;
  status: 'open' | 'finished';
  limit?: number;
  offset?: number;
  last_id?: string;
  count_total?: 0 | 1;
}

export interface GetDeliveryTradingHistoryReq {
  settle: 'usdt';
  contract?: string;
  order?: number;
  limit?: number;
  offset?: number;
  last_id?: string;
  count_total?: 0 | 1;
}

export interface GetDeliveryClosedPositionsReq {
  settle: 'usdt';
  contract?: string;
  limit?: number;
}

export interface GetDeliveryLiquidationHistoryReq {
  settle: 'usdt';
  contract?: string;
  limit?: number;
  at?: number;
}

export interface GetDeliverySettlementHistoryReq {
  settle: 'usdt';
  contract?: string;
  limit?: number;
  at?: number;
}

export interface submitDeliveryTriggeredOrderReq
  extends FuturesPriceTriggeredOrder {
  settle: 'usdt';
}

export interface GetDeliveryAutoOrdersReq {
  settle: 'usdt';
  status: 'open' | 'finished';
  contract?: string;
  limit?: number;
  offset?: number;
}
