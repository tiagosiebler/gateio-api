/**==========================================================================================================================
 * EARN AUTO INVEST
 * ==========================================================================================================================
 */

/** POST /earn/autoinvest/plans/create — example response shape */
export interface CreateAutoInvestPlanResp {
  id: number;
  amount: string;
  money: string;
  next_time: number;
  period_type: string;
  period_day: number;
  period_hour: number;
  fund_flow: string;
  fund_source: string;
}

export interface AutoInvestCoinItem {
  key: string;
  value: string;
  asset_icon_url: string;
  sort: number;
}

export interface AutoInvestMinAmountResp {
  min_amount: string;
}

export interface AutoInvestPlanExecutionRecord {
  id: number;
  type: string;
  money: string;
  user_id: number;
  plan_id: number;
  plan_version: number;
  amount: string;
  create_time: number;
  update_time: number;
  status: string;
  status_type: number;
  /** 2 = buy, other = sell */
  side: number;
  status_message: string;
  detail: string;
  asset: string;
}

export interface AutoInvestPlanExecutionRecordsPaginated {
  page: number;
  page_size: number;
  total_page: number;
  total: number;
  list: AutoInvestPlanExecutionRecord[];
}

export interface AutoInvestOrderItem {
  id: number;
  type: string;
  amount: string;
  plan_id: number;
  side: number;
  asset: string;
  record_id: number;
  total_money: string;
  market: string;
  price: string;
  create_time: number;
  total: string;
  fund_flow: string;
  error_code: number;
  error_msg: string;
  status: number;
}

export interface AutoInvestConfigItem {
  coin: string;
  max_limit: string;
}

export interface AutoInvestPlanPortfolioItem {
  asset: string;
  ratio: string;
  cum_invest?: string;
  cum_hold?: string;
  cum_redeem?: string;
  avg_price?: string;
  redeem_status?: number;
  lend_amount?: string;
}

export interface AutoInvestPlanDetail {
  id: number;
  version: number;
  name: string;
  create_time: number;
  update_time: number;
  user_id: number;
  money: string;
  amount: string;
  period_type: string;
  period_day: number;
  period_hour: number;
  portfolio: AutoInvestPlanPortfolioItem[];
  next_time?: number;
  period?: number;
  fund_source?: string;
  fund_flow?: string;
}

export interface AutoInvestPlansListResp {
  page: number;
  page_size: number;
  page_count: number;
  total_count: number;
  list: AutoInvestPlanDetail[];
}
