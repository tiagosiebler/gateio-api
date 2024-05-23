/**==========================================================================================================================
 * FLASH SWAP
 * ==========================================================================================================================
 */

export interface GetFlashSwapCurrencyPairsResp {
  currency_pair: string;
  sell_currency: string;
  buy_currency: string;
  sell_min_amount: string;
  sell_max_amount: string;
  buy_min_amount: string;
  buy_max_amount: string;
}

export interface FlashSwapOrderResp {
  id: number;
  create_time: number;
  user_id: number;
  sell_currency: string;
  sell_amount: string;
  buy_currency: string;
  buy_amount: string;
  price: string;
  status: number;
}

export interface SubmitFlashSwapOrderPreviewResp {
  preview_id: string;
  sell_currency: string;
  sell_amount: string;
  buy_currency: string;
  buy_amount: string;
  price: string;
}
