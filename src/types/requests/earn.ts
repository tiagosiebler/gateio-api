/**==========================================================================================================================
 * EARN
 * ==========================================================================================================================
 */

export interface GetStructuredProductListReq {
  status: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface GetStructuredProductOrdersReq {
  from?: number;
  to?: number;
  page?: number;
  limit?: number;
}
