/**==========================================================================================================================
 * EARN UNI
 * ==========================================================================================================================
 */

export interface LendingCurrency {
  currency: string;
  min_lend_amount: string;
  max_lend_amount: string;
  max_rate: string;
  min_rate: string;
}

export interface LendingOrder {
  currency: string;
  current_amount: string;
  amount: string;
  lent_amount: string;
  frozen_amount: string;
  min_rate: string;
  interest_status: string;
  reinvest_left_amount: string;
  create_time: number;
  update_time: number;
}

export interface LendingRecord {
  currency: string;
  amount: string;
  last_wallet_amount: string;
  last_lent_amount: string;
  last_frozen_amount: string;
  type: 'lend' | 'redeem';
  create_time: number;
}

export interface LendingInterestRecord {
  status: number;
  currency: string;
  actual_rate: string;
  interest: string;
  interest_status: string;
  create_time: number;
}
