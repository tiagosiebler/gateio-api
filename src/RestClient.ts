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

  /**
   * WITHDRAW
   */

  /**
   * Withdraw
   *
   * Withdrawals to Gate addresses do not incur transaction fees.
   *
   * @param params Withdrawal parameters
   * @returns Promise<APIResponse<WithdrawResponse>>
   */
  withdraw(params: {
    withdraw_order_id?: string;
    amount: string;
    currency: string;
    address?: string;
    memo?: string;
    chain: string;
  }): Promise<
    APIResponse<{
      id: string;
      txid: string;
      withdraw_order_id: string;
      timestamp: string;
      amount: string;
      currency: string;
      address: string;
      memo?: string;
      status:
        | 'DONE'
        | 'CANCEL'
        | 'REQUEST'
        | 'MANUAL'
        | 'BCODE'
        | 'EXTPEND'
        | 'FAIL'
        | 'INVALID'
        | 'VERIFY'
        | 'PROCES'
        | 'PEND'
        | 'DMOVE'
        | 'SPLITPEND';
      chain: string;
    }>
  > {
    return this.postPrivate('/withdrawals', params);
  }

  /**
   * Cancel withdrawal with specified ID
   *
   * @param params Parameters containing the withdrawal ID
   * @returns Promise<APIResponse<CancelWithdrawalResponse>>
   */
  cancelWithdrawal(params: { withdrawal_id: string }): Promise<
    APIResponse<{
      id: string;
      txid: string;
      withdraw_order_id: string;
      timestamp: string;
      amount: string;
      currency: string;
      address: string;
      memo?: string;
      status:
        | 'DONE'
        | 'CANCEL'
        | 'REQUEST'
        | 'MANUAL'
        | 'BCODE'
        | 'EXTPEND'
        | 'FAIL'
        | 'INVALID'
        | 'VERIFY'
        | 'PROCES'
        | 'PEND'
        | 'DMOVE'
        | 'SPLITPEND';
      chain: string;
    }>
  > {
    return this.deletePrivate(`/withdrawals/${params.withdrawal_id}`);
  }

  /**
   * WALLET
   */

  /**
   * List chains supported for specified currency
   *
   * @param params Parameters containing the currency name
   * @returns Promise<APIResponse<CurrencyChainsResponse[]>>
   */
  listCurrencyChains(params: { currency: string }): Promise<
    APIResponse<
      {
        chain: string;
        name_cn: string;
        name_en: string;
        contract_address: string;
        is_disabled: number;
        is_deposit_disabled: number;
        is_withdraw_disabled: number;
        decimal: string;
      }[]
    >
  > {
    return this.get('/wallet/currency_chains', params);
  }

  /**
   * Generate currency deposit address
   *
   * @param params Parameters containing the currency name
   * @returns Promise<APIResponse<DepositAddressResponse>>
   */
  generateDepositAddress(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      address: string;
      multichain_addresses: {
        chain: string;
        address: string;
        payment_id: string;
        payment_name: string;
        obtain_failed: number;
      }[];
    }>
  > {
    return this.getPrivate('/wallet/deposit_address', params);
  }

  /**
   * Retrieve withdrawal records
   *
   * Record time range cannot exceed 30 days
   *
   * @param params Parameters for filtering withdrawal records
   * @returns Promise<APIResponse<WithdrawalRecordResponse[]>>
   */
  retrieveWithdrawalRecords(params?: {
    currency?: string;
    from?: number;
    to?: number;
    limit?: number;
    offset?: number;
  }): Promise<
    APIResponse<
      {
        id: string;
        txid: string;
        withdraw_order_id: string;
        timestamp: string;
        amount: string;
        fee: string;
        currency: string;
        address: string;
        memo?: string;
        status:
          | 'DONE'
          | 'CANCEL'
          | 'REQUEST'
          | 'MANUAL'
          | 'BCODE'
          | 'EXTPEND'
          | 'FAIL'
          | 'INVALID'
          | 'VERIFY'
          | 'PROCES'
          | 'PEND'
          | 'DMOVE'
          | 'SPLITPEND';
        chain: string;
      }[]
    >
  > {
    return this.getPrivate('/wallet/withdrawals', params);
  }

  /**
   * Retrieve deposit records
   *
   * Record time range cannot exceed 30 days
   *
   * @param params Parameters for filtering deposit records
   * @returns Promise<APIResponse<DepositRecordResponse[]>>
   */
  retrieveDepositRecords(params?: {
    currency?: string;
    from?: number;
    to?: number;
    limit?: number;
    offset?: number;
  }): Promise<
    APIResponse<
      {
        id: string;
        txid: string;
        withdraw_order_id: string;
        timestamp: string;
        amount: string;
        currency: string;
        address: string;
        memo?: string;
        status:
          | 'DONE'
          | 'CANCEL'
          | 'REQUEST'
          | 'MANUAL'
          | 'BCODE'
          | 'EXTPEND'
          | 'FAIL'
          | 'INVALID'
          | 'VERIFY'
          | 'PROCES'
          | 'PEND'
          | 'DMOVE'
          | 'SPLITPEND';
        chain: string;
      }[]
    >
  > {
    return this.getPrivate('/wallet/deposits', params);
  }

  /**
   * Transfer between trading accounts
   *
   * Transfer between different accounts. Currently support transfers between the following:
   * - spot - margin
   * - spot - futures(perpetual)
   * - spot - delivery
   * - spot - cross margin
   * - spot - options
   *
   * @param params Transfer parameters
   * @returns Promise<APIResponse<TransferResponse>>
   */
  transferBetweenAccounts(params: {
    currency: string;
    from:
      | 'spot'
      | 'margin'
      | 'futures'
      | 'delivery'
      | 'cross_margin'
      | 'options';
    to: 'spot' | 'margin' | 'futures' | 'delivery' | 'cross_margin' | 'options';
    amount: string;
    currency_pair?: string;
    settle?: string;
  }): Promise<
    APIResponse<{
      tx_id: number;
    }>
  > {
    return this.postPrivate('/wallet/transfers', params);
  }

  /**
   * Transfer between main and sub accounts
   *
   * Support transferring with sub user's spot or futures account. Note that only main user's spot account is used no matter which sub user's account is operated.
   *
   * @param params Transfer parameters
   * @returns Promise<APIResponse<any>>
   */
  transferBetweenMainAndSubAccounts(params: {
    currency: string;
    sub_account: string;
    direction: 'to' | 'from';
    amount: string;
    client_order_id?: string;
    sub_account_type?: 'spot' | 'futures' | 'cross_margin' | 'delivery';
  }): Promise<APIResponse<any>> {
    return this.postPrivate('/wallet/sub_account_transfers', params);
  }

  /**
   * Retrieve transfer records between main and sub accounts
   *
   * Record time range cannot exceed 30 days
   *
   * Note: only records after 2020-04-10 can be retrieved
   *
   * @param params Parameters for filtering transfer records
   * @returns Promise<APIResponse<SubAccountTransferRecordResponse[]>>
   */
  retrieveSubAccountTransferRecords(params?: {
    sub_uid?: string;
    from?: number;
    to?: number;
    limit?: number;
    offset?: number;
  }): Promise<
    APIResponse<
      {
        currency: string;
        sub_account: string;
        direction: 'to' | 'from';
        amount: string;
        uid: string;
        client_order_id: string;
        timest: string;
        source: string;
        sub_account_type: 'spot' | 'futures' | 'cross_margin' | 'delivery';
      }[]
    >
  > {
    return this.getPrivate('/wallet/sub_account_transfers', params);
  }

  /**
   * Sub-account transfers to sub-account
   *
   * It is possible to perform balance transfers between two sub-accounts under the same main account. You can use either the API Key of the main account or the API Key of the sub-account to initiate the transfer.
   *
   * @param params Transfer parameters
   * @returns Promise<APIResponse<void>>
   */
  subAccountTransfersToSubAccount(params: {
    currency: string;
    sub_account_type?: string;
    sub_account_from: string;
    sub_account_from_type: 'spot' | 'futures' | 'delivery' | 'cross_margin';
    sub_account_to: string;
    sub_account_to_type: 'spot' | 'futures' | 'delivery' | 'cross_margin';
    amount: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate('/wallet/sub_account_to_sub_account', params);
  }

  /**
   * Retrieve withdrawal status
   *
   * @param params Parameters for retrieving withdrawal status
   * @returns Promise<APIResponse<WithdrawalStatusResponse[]>>
   */
  retrieveWithdrawalStatus(params?: { currency?: string }): Promise<
    APIResponse<
      {
        currency: string;
        name: string;
        name_cn: string;
        deposit: string;
        withdraw_percent: string;
        withdraw_fix: string;
        withdraw_day_limit: string;
        withdraw_amount_mini: string;
        withdraw_day_limit_remain: string;
        withdraw_eachtime_limit: string;
        withdraw_fix_on_chains: { [key: string]: string };
        withdraw_percent_on_chains: { [key: string]: string };
      }[]
    >
  > {
    return this.getPrivate('/wallet/withdraw_status', params);
  }

  /**
   * Retrieve sub account balances
   *
   * @param params Parameters for retrieving sub account balances
   * @returns Promise<APIResponse<SubAccountBalancesResponse[]>>
   */
  retrieveSubAccountBalances(params?: { sub_uid?: string }): Promise<
    APIResponse<
      {
        uid: string;
        available: { [key: string]: string };
      }[]
    >
  > {
    return this.getPrivate('/wallet/sub_account_balances', params);
  }

  /**
   * Query sub accounts' margin balances
   *
   * @param params Parameters for querying sub accounts' margin balances
   * @returns Promise<APIResponse<SubAccountMarginBalancesResponse[]>>
   */
  querySubAccountMarginBalances(params?: { sub_uid?: string }): Promise<
    APIResponse<
      {
        uid: string;
        available: {
          currency_pair: string;
          locked: boolean;
          risk: string;
          base: {
            currency: string;
            available: string;
            locked: string;
            borrowed: string;
            interest: string;
          };
          quote: {
            currency: string;
            available: string;
            locked: string;
            borrowed: string;
            interest: string;
          };
        }[];
      }[]
    >
  > {
    return this.getPrivate('/wallet/sub_account_margin_balances', params);
  }

  /**
   * Query sub accounts' futures account balances
   *
   * @param params Parameters for querying sub accounts' futures account balances
   * @returns Promise<APIResponse<SubAccountFuturesBalancesResponse[]>>
   */
  querySubAccountFuturesBalances(params?: {
    sub_uid?: string;
    settle?: string;
  }): Promise<
    APIResponse<
      {
        uid: string;
        available: {
          [key: string]: {
            total: string;
            unrealised_pnl: string;
            position_margin: string;
            order_margin: string;
            available: string;
            point: string;
            currency: string;
            in_dual_mode: boolean;
            enable_credit: boolean;
            position_initial_margin: string;
            maintenance_margin: string;
            bonus: string;
            enable_evolved_classic: boolean;
            history: {
              dnw: string;
              pnl: string;
              fee: string;
              refr: string;
              fund: string;
              point_dnw: string;
              point_fee: string;
              point_refr: string;
              bonus_dnw: string;
              bonus_offset: string;
            };
          };
        };
      }[]
    >
  > {
    return this.getPrivate('/wallet/sub_account_futures_balances', params);
  }

  /**
   * Query subaccount's cross_margin account info
   *
   * @param params Parameters for querying subaccount's cross_margin account info
   * @returns Promise<APIResponse<{
   *   uid: string;
   *   available: {
   *     user_id: number;
   *     locked: boolean;
   *     balances: {
   *       [key: string]: {
   *         available: string;
   *         freeze: string;
   *         borrowed: string;
   *         interest: string;
   *       };
   *     };
   *     total: string;
   *     borrowed: string;
   *     borrowed_net: string;
   *     net: string;
   *     leverage: string;
   *     interest: string;
   *     risk: string;
   *     total_initial_margin: string;
   *     total_margin_balance: string;
   *     total_maintenance_margin: string;
   *     total_initial_margin_rate: string;
   *     total_maintenance_margin_rate: string;
   *     total_available_margin: string;
   *   };
   * }[]>>
   */
  querySubAccountCrossMarginBalances(params?: { sub_uid?: string }): Promise<
    APIResponse<
      {
        uid: string;
        available: {
          user_id: number;
          locked: boolean;
          balances: {
            [key: string]: {
              available: string;
              freeze: string;
              borrowed: string;
              interest: string;
            };
          };
          total: string;
          borrowed: string;
          borrowed_net: string;
          net: string;
          leverage: string;
          interest: string;
          risk: string;
          total_initial_margin: string;
          total_margin_balance: string;
          total_maintenance_margin: string;
          total_initial_margin_rate: string;
          total_maintenance_margin_rate: string;
          total_available_margin: string;
        };
      }[]
    >
  > {
    return this.getPrivate('/wallet/sub_account_cross_margin_balances', params);
  }

  /**
   * Query saved address
   *
   * @param params Parameters for querying saved address
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   chain: string;
   *   address: string;
   *   name: string;
   *   tag: string;
   *   verified: string;
   * }[]>>
   */
  querySavedAddress(params: {
    currency: string;
    chain?: string;
    limit?: string;
    page?: number;
  }): Promise<
    APIResponse<
      {
        currency: string;
        chain: string;
        address: string;
        name: string;
        tag: string;
        verified: string;
      }[]
    >
  > {
    return this.getPrivate('/wallet/saved_address', params);
  }

  /**
   * Retrieve personal trading fee
   *
   * @param params Parameters for retrieving personal trading fee
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   taker_fee: string;
   *   maker_fee: string;
   *   gt_discount: boolean;
   *   gt_taker_fee: string;
   *   gt_maker_fee: string;
   *   loan_fee: string;
   *   point_type: string;
   *   futures_taker_fee: string;
   *   futures_maker_fee: string;
   *   delivery_taker_fee: string;
   *   delivery_maker_fee: string;
   *   debit_fee: number;
   * }>>
   */
  retrievePersonalTradingFee(params?: {
    currency_pair?: string;
    settle?: 'BTC' | 'USDT' | 'USD';
  }): Promise<
    APIResponse<{
      user_id: number;
      taker_fee: string;
      maker_fee: string;
      gt_discount: boolean;
      gt_taker_fee: string;
      gt_maker_fee: string;
      loan_fee: string;
      point_type: string;
      futures_taker_fee: string;
      futures_maker_fee: string;
      delivery_taker_fee: string;
      delivery_maker_fee: string;
      debit_fee: number;
    }>
  > {
    return this.getPrivate('/wallet/fee', params);
  }

  /**
   * Retrieve user's total balances
   *
   * This endpoint returns an approximate sum of exchanged amount from all currencies to input currency for each account.
   * The exchange rate and account balance could have been cached for at most 1 minute. It is not recommended to use its result for any trading calculation.
   *
   * For trading calculation, use the corresponding account query endpoint for each account type. For example:
   * - GET /spot/accounts to query spot account balance
   * - GET /margin/accounts to query margin account balance
   * - GET /futures/{settle}/accounts to query futures account balance
   *
   * @param params Parameters for retrieving total balances
   * @returns Promise<APIResponse<{
   *   total: {
   *     amount: string;
   *     currency: string;
   *     unrealised_pnl?: string;
   *     borrowed?: string;
   *   };
   *   details: {
   *     [key: string]: {
   *       amount: string;
   *       currency: string;
   *       unrealised_pnl?: string;
   *       borrowed?: string;
   *     };
   *   };
   * }>>
   */
  getBalances(params?: { currency?: string }): Promise<
    APIResponse<{
      total: {
        amount: string;
        currency: string;
        unrealised_pnl?: string;
        borrowed?: string;
      };
      details: {
        [key: string]: {
          amount: string;
          currency: string;
          unrealised_pnl?: string;
          borrowed?: string;
        };
      };
    }>
  > {
    return this.getPrivate('/wallet/total_balance', params);
  }

  /**
   * List small balance
   *
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   available_balance: string;
   *   estimated_as_btc: string;
   *   convertible_to_gt: string;
   * }>>
   */
  listSmallBalance(): Promise<
    APIResponse<{
      currency: string;
      available_balance: string;
      estimated_as_btc: string;
      convertible_to_gt: string;
    }>
  > {
    return this.getPrivate('/wallet/small_balance');
  }

  /**
   * Convert small balance
   *
   * @param params Parameters for converting small balance
   * @returns Promise<APIResponse<void>>
   */
  convertSmallBalance(params: {
    currency?: string[];
  }): Promise<APIResponse<void>> {
    return this.postPrivate('/wallet/small_balance', params);
  }

  /**
   * List small balance history
   *
   * @param params Parameters for listing small balance history
   * @returns Promise<APIResponse<{
   *   id: string;
   *   currency: string;
   *   amount: string;
   *   gt_amount: string;
   *   create_time: number;
   * }[]>>
   */
  listSmallBalanceHistory(params?: {
    currency?: string;
    page?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        id: string;
        currency: string;
        amount: string;
        gt_amount: string;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate('/wallet/small_balance_history', params);
  }

  /**
   *
   */ /**
   *
   */ /**
   *
   */ /**
   *
   */
}
