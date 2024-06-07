/**================================================================================================================================
 * WITHDRAW
 * ==========================================================================================================================
 */

export interface SubmitWithdrawReq {
  amount: string;
  currency: string;
  chain: string;
  withdraw_order_id?: string;
  address?: string;
  memo?: string;
}
