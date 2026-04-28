/**==========================================================================================================================
 * EARN AUTO INVEST
 * ==========================================================================================================================
 */

export interface AutoInvestPlanPortfolioItemInput {
  asset: string;
  ratio: string;
}

/** POST /earn/autoinvest/plans/create */
export interface CreateAutoInvestPlanReq {
  plan_name?: string;
  plan_des?: string;
  plan_money: string;
  plan_amount: string;
  plan_period_type:
    | 'daily'
    | 'weekly'
    | 'biweekly'
    | 'monthly'
    | 'hourly'
    | '4-hourly';
  plan_period_day: number;
  plan_period_hour: number;
  items: AutoInvestPlanPortfolioItemInput[];
  /** Fund source: `spot` or `earn`; default spot */
  fund_source?: string;
  /** Fund flow: `auto_invest` or `earn`; default auto_invest */
  fund_flow?: string;
  /** 0 normal creation, 1 quick investment */
  type?: number;
}

/** POST /earn/autoinvest/plans/update */
export interface UpdateAutoInvestPlanReq {
  plan_id: number;
  fund_source?: string;
  fund_flow?: string;
}

/** POST /earn/autoinvest/plans/stop */
export interface StopAutoInvestPlanReq {
  plan_id: number;
}

/** POST /earn/autoinvest/plans/add_position */
export interface AddAutoInvestPlanPositionReq {
  plan_id: number;
  amount: string;
}

/** POST /earn/autoinvest/min_invest_amount */
export interface GetAutoInvestMinAmountReq {
  money: string;
  items: AutoInvestPlanPortfolioItemInput[];
}

/** GET /earn/autoinvest/coins */
export interface GetAutoInvestCoinsReq {
  /** Pricing currency: USDT or BTC; default USDT */
  plan_money?: string;
}

/** GET /earn/autoinvest/plans/records */
export interface GetAutoInvestPlanRecordsReq {
  plan_id: number;
  page?: number;
  page_size?: number;
}

/** GET /earn/autoinvest/orders */
export interface GetAutoInvestOrdersReq {
  plan_id: number;
  record_id: number;
}

/** GET /earn/autoinvest/plans/detail */
export interface GetAutoInvestPlanDetailReq {
  plan_id: number;
}

/** GET /earn/autoinvest/plans/list_info */
export interface GetAutoInvestPlansReq {
  /** Plan status: e.g. History (history) or Active (active) */
  status: string;
  page?: number;
  page_size?: number;
}
