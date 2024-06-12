/**==========================================================================================================================
 * EARN
 * ==========================================================================================================================
 */

export interface DualInvestmentProduct {
  id: number;
  instrument_name: string;
  invest_currency: string;
  exercise_currency: string;
  exercise_price: number;
  delivery_time: number;
  min_copies: number;
  max_copies: number;
  per_value: string;
  apy_display: string;
  start_time: number;
  end_time: number;
  status: 'NOTSTARTED' | 'ONGOING' | 'ENDED';
}

export interface DualInvestmentOrder {
  id: number;
  plan_id: number;
  copies: string;
  invest_amount: string;
  settlement_amount: string;
  create_time: number;
  complete_time: number;
  status:
    | 'INIT'
    | 'SETTLEMENT_SUCCESS'
    | 'SETTLEMENT_PROCESSING'
    | 'CANCELED'
    | 'FAILED';
  invest_currency: string;
  exercise_currency: string;
  exercise_price: string;
  settlement_price: string;
  settlement_currency: string;
  apy_display: string;
  apy_settlement: string;
  delivery_time: number;
}

export interface StructuredProduct {
  id: number;
  type: string;
  name_en: string;
  investment_coin: string;
  investment_period: string;
  min_annual_rate: string;
  mid_annual_rate: string;
  max_annual_rate: string;
  watch_market: string;
  start_time: number;
  end_time: number;
  status: 'in_process' | 'will_begin' | 'wait_settlement' | 'done';
}

export interface StructuredProductOrder {
  id: number;
  pid: string;
  lock_coin: string;
  amount: string;
  status: 'SUCCESS' | 'FAILED' | 'DONE';
  income: string;
  create_time: number;
}
