/**==========================================================================================================================
 * FLASH SWAP
 * ==========================================================================================================================
 */

export interface SubmitFlashSwapOrderReq {
  preview_id: string;
  sell_currency: string;
  sell_amount: string;
  buy_currency: string;
  buy_amount: string;
}

export interface GetFlashSwapOrdersReq {
  status?: number;
  sell_currency?: string;
  buy_currency?: string;
  reverse?: boolean;
  limit?: number;
  page?: number;
}

export interface GetFlashSwapOrderReq {
  order_id: number;
}

export interface SubmitFlashSwapOrderPreviewReq {
  sell_currency: string;
  sell_amount?: string;
  buy_currency: string;
  buy_amount?: string;
}
