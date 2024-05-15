import { AxiosRequestConfig } from 'axios';

import {
  BaseRestClient,
  REST_CLIENT_TYPE_ENUM,
  RestClientType,
} from './lib/BaseRestClient.js';
import { RestClientOptions } from './lib/requestUtils.js';
import { APIResponse } from './types/response/shared.types.js';

/**
 * Unified REST API client for all of Gate's REST APIs
 */
export class RestClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.main;
  }

  getSystemMaintenanceStatus(): Promise<APIResponse<unknown>> {
    return this.get('/v1/public/system_info');
  }

  /**
   * This endpoint returns an approximate sum of exchanged amount from all currencies to input currency for each account.The exchange rate and account balance could have been cached for at most 1 minute.
   *
   * It is not recommended to use its result for any trading calculation.
   */
  getBalances(params?: { currency: string }): Promise<APIResponse<unknown>> {
    return this.getPrivate('/wallet/total_balance', params);
  }

  getSpotBalances(params?: {
    currency: string;
  }): Promise<APIResponse<unknown>> {
    return this.getPrivate('/spot/accounts', params);
  }

  getMarginBalances(params?: {
    currency: string;
  }): Promise<APIResponse<unknown>> {
    return this.getPrivate('/margin/accounts', params);
  }

  getFuturesBalances(params?: {
    settle: string;
  }): Promise<APIResponse<unknown>> {
    return this.getPrivate(`/futures/${params?.settle}/accounts`, params);
  }

  getSubAccountBalances(params?: {
    sub_uid: string;
  }): Promise<APIResponse<unknown>> {
    return this.getPrivate('/wallet/sub_account_balances', params);
  }
}
