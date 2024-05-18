import { AxiosRequestConfig } from 'axios';

import {
  BaseRestClient,
  REST_CLIENT_TYPE_ENUM,
  RestClientType,
} from './lib/BaseRestClient.js';
import { RestClientOptions } from './lib/requestUtils.js';
import { APIResponse } from './types/response/shared.types.js';

// interfaces

interface SubAccountKey {
  user_id?: string;
  mode?: number;
  name?: string;
  perms?: {
    name?:
      | 'wallet'
      | 'spot'
      | 'futures'
      | 'delivery'
      | 'earn'
      | 'options'
      | 'account'
      | 'unified'
      | 'loan';
    read_only?: boolean;
  }[];
  ip_whitelist?: string[];
  key?: string;
  state?: number;
  created_at?: number;
  updated_at?: number;
  last_access?: number;
}

interface EstimateRate {
  [key: string]: string;
}

interface CurrencyPair {
  id?: string;
  base?: string;
  quote?: string;
  fee?: string;
  min_base_amount?: string;
  min_quote_amount?: string;
  max_base_amount?: string;
  max_quote_amount?: string;
  amount_precision?: number;
  precision?: number;
  trade_status?: 'untradable' | 'buyable' | 'sellable' | 'tradable';
  sell_start?: number;
  buy_start?: number;
}

interface Order {
  id?: string;
  text?: string;
  amend_text?: string;
  create_time?: string;
  update_time?: string;
  create_time_ms?: number;
  update_time_ms?: number;
  status?: 'open' | 'closed' | 'cancelled';
  currency_pair: string;
  type?: 'limit' | 'market';
  account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  side: 'buy' | 'sell';
  amount: string;
  price?: string;
  time_in_force?: 'gtc' | 'ioc' | 'poc' | 'fok';
  iceberg?: string;
  auto_borrow?: boolean;
  auto_repay?: boolean;
  left?: string;
  filled_amount?: string;
  fill_price?: string;
  filled_total?: string;
  avg_deal_price?: string;
  fee?: string;
  fee_currency?: string;
  point_fee?: string;
  gt_fee?: string;
  gt_maker_fee?: string;
  gt_taker_fee?: string;
  gt_discount?: boolean;
  rebated_fee?: string;
  rebated_fee_currency?: string;
  stp_id?: number;
  stp_act?: 'cn' | 'co' | 'cb' | '-';
  finish_as?: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}

interface CancelBatchOrder {
  currency_pair: string;
  id: string;
  account?: 'cross_margin';
  action_mode?: 'ACK' | 'RESULT' | 'FULL';
}

interface Loan {
  id?: string;
  create_time?: string;
  expire_time?: string;
  status?: 'open' | 'loaned' | 'finished' | 'auto_repaid';
  side: 'lend' | 'borrow';
  currency: string;
  rate?: string;
  amount: string;
  days?: number;
  auto_renew?: boolean;
  currency_pair?: string;
  left?: string;
  repaid?: string;
  paid_interest?: string;
  unpaid_interest?: string;
  fee_rate?: string;
  orig_id?: string;
  text?: string;
}

interface LoanRecord {
  id?: string;
  loan_id?: string;
  create_time?: string;
  expire_time?: string;
  status?: 'loaned' | 'finished';
  borrow_user_id?: string;
  currency?: string;
  rate?: string;
  amount?: string;
  days?: number;
  auto_renew?: boolean;
  repaid?: string;
  paid_interest?: string;
  unpaid_interest?: string;
}

interface SpotPriceTriggeredOrder {
  trigger: {
    price: string;
    rule: '>=' | '<=';
    expiration: number;
  };
  put: {
    type?: 'limit' | 'market';
    side: 'buy' | 'sell';
    price: string;
    amount: string;
    account: 'normal' | 'margin' | 'cross_margin';
    time_in_force?: 'gtc' | 'ioc';
    text?: string;
  };
  id?: number;
  user?: number;
  market: string;
  ctime?: number;
  ftime?: number;
  fired_order_id?: number;
  status?: 'open' | 'cancelled' | 'finish' | 'failed' | 'expired';
  reason?: string;
}

interface Contract {
  name?: string;
  type?: 'inverse' | 'direct';
  quanto_multiplier?: string;
  leverage_min?: string;
  leverage_max?: string;
  maintenance_rate?: string;
  mark_type?: 'internal' | 'index';
  mark_price?: string;
  index_price?: string;
  last_price?: string;
  maker_fee_rate?: string;
  taker_fee_rate?: string;
  order_price_round?: string;
  mark_price_round?: string;
  funding_rate?: string;
  funding_interval?: number;
  funding_next_apply?: number;
  risk_limit_base?: string;
  risk_limit_step?: string;
  risk_limit_max?: string;
  order_size_min?: number;
  order_size_max?: number;
  order_price_deviate?: string;
  ref_discount_rate?: string;
  ref_rebate_rate?: string;
  orderbook_id?: number;
  trade_id?: number;
  trade_size?: number;
  position_size?: number;
  config_change_time?: number;
  in_delisting?: boolean;
  orders_limit?: number;
  enable_bonus?: boolean;
  enable_credit?: boolean;
  create_time?: number;
  funding_cap_ratio?: string;
}

interface Position {
  user?: number;
  contract?: string;
  size?: number;
  leverage?: string;
  risk_limit?: string;
  leverage_max?: string;
  maintenance_rate?: string;
  value?: string;
  margin?: string;
  entry_price?: string;
  liq_price?: string;
  mark_price?: string;
  initial_margin?: string;
  maintenance_margin?: string;
  unrealised_pnl?: string;
  realised_pnl?: string;
  pnl_pnl?: string;
  pnl_fund?: string;
  pnl_fee?: string;
  history_pnl?: string;
  last_close_pnl?: string;
  realised_point?: string;
  history_point?: string;
  adl_ranking?: number;
  pending_orders?: number;
  close_order?: {
    id?: number;
    price?: string;
    is_liq?: boolean;
  } | null;
  mode?: 'single' | 'dual_long' | 'dual_short';
  cross_leverage_limit?: string;
  update_time?: number;
  open_time?: number;
}

interface FuturesOrder {
  id?: number;
  user?: number;
  create_time?: number;
  finish_time?: number;
  finish_as?:
    | 'filled'
    | 'cancelled'
    | 'liquidated'
    | 'ioc'
    | 'auto_deleveraged'
    | 'reduce_only'
    | 'position_closed'
    | 'stp';
  status?: 'open' | 'finished';
  contract: string;
  size: number;
  iceberg?: number;
  price?: string;
  close?: boolean;
  is_close?: boolean;
  reduce_only?: boolean;
  is_reduce_only?: boolean;
  is_liq?: boolean;
  tif?: 'gtc' | 'ioc' | 'poc' | 'fok';
  left?: number;
  fill_price?: string;
  text?: string;
  tkfr?: string;
  mkfr?: string;
  refu?: number;
  auto_size?: 'close_long' | 'close_short';
  stp_id?: number;
  stp_act?: 'cn' | 'co' | 'cb' | '-';
  amend_text?: string;
  biz_info?: string;
}

interface FuturesPriceTriggeredOrder {
  initial: {
    contract: string;
    size?: number;
    price?: string;
    close?: boolean;
    tif?: 'gtc' | 'ioc';
    text?: string;
    reduce_only?: boolean;
    auto_size?: string;
    is_reduce_only?: boolean;
    is_close?: boolean;
  };
  trigger: {
    strategy_type?: 0 | 1;
    price_type?: 0 | 1 | 2;
    price?: string;
    rule?: 1 | 2;
    expiration?: number;
  };
  id?: number;
  user?: number;
  create_time?: number;
  finish_time?: number;
  trade_id?: number;
  status?: 'open' | 'finished' | 'inactive' | 'invalid';
  finish_as?: 'cancelled' | 'succeeded' | 'failed' | 'expired';
  reason?: string;
  order_type?:
    | 'close-long-order'
    | 'close-short-order'
    | 'close-long-position'
    | 'close-short-position'
    | 'plan-close-long-position'
    | 'plan-close-short-position';
  me_order_id?: number;
}

interface DeliveryContract {
  name?: string;
  underlying?: string;
  cycle?: 'WEEKLY' | 'BI-WEEKLY' | 'QUARTERLY' | 'BI-QUARTERLY';
  type?: 'inverse' | 'direct';
  quanto_multiplier?: string;
  leverage_min?: string;
  leverage_max?: string;
  maintenance_rate?: string;
  mark_type?: 'internal' | 'index';
  mark_price?: string;
  index_price?: string;
  last_price?: string;
  maker_fee_rate?: string;
  taker_fee_rate?: string;
  order_price_round?: string;
  mark_price_round?: string;
  basis_rate?: string;
  basis_value?: string;
  basis_impact_value?: string;
  settle_price?: string;
  settle_price_interval?: number;
  settle_price_duration?: number;
  expire_time?: number;
  risk_limit_base?: string;
  risk_limit_step?: string;
  risk_limit_max?: string;
  order_size_min?: number;
  order_size_max?: number;
  order_price_deviate?: string;
  ref_discount_rate?: string;
  ref_rebate_rate?: string;
  orderbook_id?: number;
  trade_id?: number;
  trade_size?: number;
  position_size?: number;
  config_change_time?: number;
  in_delisting?: boolean;
  orders_limit?: number;
}

interface Withdraw {
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
}
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

  /**================================================================================================================================
   * WITHDRAW
   * ==========================================================================================================================
   */

  /**
   * Withdraw
   *
   * Withdrawals to Gate addresses do not incur transaction fees.
   *
   * @param params Withdrawal parameters
   * @returns Promise<APIResponse<Withdraw>>
   */
  withdraw(params: {
    withdraw_order_id?: string;
    amount: string;
    currency: string;
    address?: string;
    memo?: string;
    chain: string;
  }): Promise<APIResponse<Withdraw>> {
    return this.postPrivate('/withdrawals', params);
  }

  /**
   * Cancel withdrawal with specified ID
   *
   * @param params Parameters containing the withdrawal ID
   * @returns Promise<APIResponse<Withdraw>>
   */
  cancelWithdrawal(params: {
    withdrawal_id: string;
  }): Promise<APIResponse<Withdraw>> {
    return this.deletePrivate(`/withdrawals/${params.withdrawal_id}`);
  }

  /**==========================================================================================================================
   * WALLET
   * ==========================================================================================================================
   */

  /**
   * List chains supported for specified currency
   *
   * @param params Parameters containing the currency name
   * @returns Promise<APIResponse< {
        chain: string;
        name_cn: string;
        name_en: string;
        contract_address: string;
        is_disabled: number;
        is_deposit_disabled: number;
        is_withdraw_disabled: number;
        decimal: string;
      }[]>>
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
   * @returns Promise<APIResponse<{
      currency: string;
      address: string;
      multichain_addresses: {
        chain: string;
        address: string;
        payment_id: string;
        payment_name: string;
        obtain_failed: number;
      }[];
    }>>
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
   * @returns Promise<APIResponse<Withdraw[]>>
   */
  retrieveWithdrawalRecords(params?: {
    currency?: string;
    from?: number;
    to?: number;
    limit?: number;
    offset?: number;
  }): Promise<APIResponse<Withdraw[]>> {
    return this.getPrivate('/wallet/withdrawals', params);
  }

  /**
   * Retrieve deposit records
   *
   * Record time range cannot exceed 30 days
   *
   * @param params Parameters for filtering deposit records
   * @returns Promise<APIResponse<Withdraw[]>>
   */
  retrieveDepositRecords(params?: {
    currency?: string;
    from?: number;
    to?: number;
    limit?: number;
    offset?: number;
  }): Promise<APIResponse<Withdraw[]>> {
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
   * @returns Promise<APIResponse<any>>
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
   * @returns Promise<APIResponse<{
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
      }[]>>
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
   * @returns Promise<APIResponse<{
        uid: string;
        available: { [key: string]: string };
      }[]>>
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

  /**==========================================================================================================================
   * SUBACCOUNT
   * ==========================================================================================================================
   */

  /**
   * Create a new sub-account
   *
   * @param params Parameters for creating a new sub-account
   * @returns Promise<APIResponse<{
   *   remark?: string;
   *   login_name: string;
   *   password?: string;
   *   email?: string;
   *   state: number;
   *   type: number;
   *   user_id: number;
   *   create_time: number;
   * }>>
   */
  createSubAccount(params: {
    remark?: string;
    login_name: string;
    password?: string;
    email?: string;
  }): Promise<
    APIResponse<{
      remark?: string;
      login_name: string;
      password?: string;
      email?: string;
      state: number;
      type: number;
      user_id: number;
      create_time: number;
    }>
  > {
    return this.postPrivate('/sub_accounts', params);
  }

  /**
   * List sub-accounts
   *
   * @param params Parameters for listing sub-accounts
   * @returns Promise<APIResponse<{
   *   remark?: string;
   *   login_name: string;
   *   password?: string;
   *   email?: string;
   *   state: number;
   *   type: number;
   *   user_id: number;
   *   create_time: number;
   * }[]>>
   */
  listSubAccounts(params?: { type?: string }): Promise<
    APIResponse<
      {
        remark?: string;
        login_name: string;
        password?: string;
        email?: string;
        state: number;
        type: number;
        user_id: number;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate('/sub_accounts', params);
  }

  /**
   * Get the sub-account
   *
   * @param params Parameters containing the sub-account user ID
   * @returns Promise<APIResponse<{
   *   remark?: string;
   *   login_name: string;
   *   password?: string;
   *   email?: string;
   *   state: number;
   *   type: number;
   *   user_id: number;
   *   create_time: number;
   * }>>
   */
  getSubAccount(params: { user_id: number }): Promise<
    APIResponse<{
      remark?: string;
      login_name: string;
      password?: string;
      email?: string;
      state: number;
      type: number;
      user_id: number;
      create_time: number;
    }>
  > {
    return this.getPrivate(`/sub_accounts/${params.user_id}`);
  }

  /**
   * Create API Key of the sub-account
   *
   * @param params Parameters for creating API Key of the sub-account
   * @returns Promise<APIResponse<{
   *   user_id: string;
   *   mode?: number;
   *   name?: string;
   *   perms?: {
   *     name?: 'wallet' | 'spot' | 'futures' | 'delivery' | 'earn' | 'options' | 'account' | 'unified' | 'loan';
   *     read_only?: boolean;
   *   }[];
   *   ip_whitelist?: string[];
   *   key: string;
   *   state: number;
   *   created_at: number;
   *   updated_at: number;
   *   last_access: number;
   * }>>
   */
  createSubAccountApiKey(params: {
    user_id: number;
    mode?: number;
    name?: string;
    perms?: {
      name?:
        | 'wallet'
        | 'spot'
        | 'futures'
        | 'delivery'
        | 'earn'
        | 'options'
        | 'account'
        | 'unified'
        | 'loan';
      read_only?: boolean;
    }[];
    ip_whitelist?: string[];
  }): Promise<
    APIResponse<{
      user_id: string;
      mode?: number;
      name?: string;
      perms?: {
        name?:
          | 'wallet'
          | 'spot'
          | 'futures'
          | 'delivery'
          | 'earn'
          | 'options'
          | 'account'
          | 'unified'
          | 'loan';
        read_only?: boolean;
      }[];
      ip_whitelist?: string[];
      key: string;
      state: number;
      created_at: number;
      updated_at: number;
      last_access: number;
    }>
  > {
    return this.postPrivate(`/sub_accounts/${params.user_id}/keys`, params);
  }

  /**
   * List all API Key of the sub-account
   *
   * @param params Parameters containing the sub-account user ID
   * @returns Promise<APIResponse<SubAccountKey[]>>
   */
  listSubAccountApiKeys(params: {
    user_id: number;
  }): Promise<APIResponse<SubAccountKey[]>> {
    return this.getPrivate(`/sub_accounts/${params.user_id}/keys`);
  }

  /**
   * Update API key of the sub-account
   *
   * @param params Parameters for updating API key of the sub-account
   * @returns Promise<APIResponse<any>>
   */
  updateSubAccountApiKey(params: {
    user_id: number;
    key: string;
    mode?: number;
    name?: string;
    perms?: {
      name?:
        | 'wallet'
        | 'spot'
        | 'futures'
        | 'delivery'
        | 'earn'
        | 'options'
        | 'account'
        | 'unified'
        | 'loan';
      read_only?: boolean;
    }[];
    ip_whitelist?: string[];
  }): Promise<APIResponse<any>> {
    return this.putPrivate(
      `/sub_accounts/${params.user_id}/keys/${params.key}`,
      params,
    );
  }

  /**
   * Delete API key of the sub-account
   *
   * @param params Parameters for deleting API key of the sub-account
   * @returns Promise<APIResponse<any>>
   */
  deleteSubAccountApiKey(params: {
    user_id: number;
    key: string;
  }): Promise<APIResponse<any>> {
    return this.deletePrivate(
      `/sub_accounts/${params.user_id}/keys/${params.key}`,
    );
  }

  /**
   * Get the API Key of the sub-account
   *
   * @param params Parameters containing the sub-account user ID and API key
   * @returns Promise<APIResponse<SubAccountKey>>
   */
  getSubAccountApiKey(params: {
    user_id: number;
    key: string;
  }): Promise<APIResponse<SubAccountKey>> {
    return this.getPrivate(
      `/sub_accounts/${params.user_id}/keys/${params.key}`,
    );
  }

  /**
   * Lock the sub-account
   *
   * @param params Parameters containing the sub-account user ID
   * @returns Promise<APIResponse<void>>
   */
  lockSubAccount(params: { user_id: number }): Promise<APIResponse<void>> {
    return this.postPrivate(`/sub_accounts/${params.user_id}/lock`);
  }

  /**
   * Unlock the sub-account
   *
   * @param params Parameters containing the sub-account user ID
   * @returns Promise<APIResponse<void>>
   */
  unlockSubAccount(params: { user_id: number }): Promise<APIResponse<void>> {
    return this.postPrivate(`/sub_accounts/${params.user_id}/unlock`);
  }
  /**==========================================================================================================================
   * UNIFIED
   * ==========================================================================================================================
   */

  /**
   * Get unified account information
   *
   * The assets of each currency in the account will be adjusted according to their liquidity, defined by corresponding adjustment coefficients, and then uniformly converted to USD to calculate the total asset value and position value of the account.
   *
   * @param params Parameters for retrieving unified account information
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   refresh_time: number;
   *   locked: boolean;
   *   balances: {
   *     [key: string]: {
   *       available: string;
   *       freeze: string;
   *       borrowed: string;
   *       negative_liab: string;
   *       futures_pos_liab: string;
   *       equity: string;
   *       total_freeze: string;
   *       total_liab: string;
   *       spot_in_use: string;
   *     };
   *   };
   *   total: string;
   *   borrowed: string;
   *   total_initial_margin: string;
   *   total_margin_balance: string;
   *   total_maintenance_margin: string;
   *   total_initial_margin_rate: string;
   *   total_maintenance_margin_rate: string;
   *   total_available_margin: string;
   *   unified_account_total: string;
   *   unified_account_total_liab: string;
   *   unified_account_total_equity: string;
   *   leverage: string;
   *   spot_order_loss: string;
   *   spot_hedge: boolean;
   * }>>
   */
  getUnifiedAccountInfo(params?: { currency?: string }): Promise<
    APIResponse<{
      user_id: number;
      refresh_time: number;
      locked: boolean;
      balances: {
        [key: string]: {
          available: string;
          freeze: string;
          borrowed: string;
          negative_liab: string;
          futures_pos_liab: string;
          equity: string;
          total_freeze: string;
          total_liab: string;
          spot_in_use: string;
        };
      };
      total: string;
      borrowed: string;
      total_initial_margin: string;
      total_margin_balance: string;
      total_maintenance_margin: string;
      total_initial_margin_rate: string;
      total_maintenance_margin_rate: string;
      total_available_margin: string;
      unified_account_total: string;
      unified_account_total_liab: string;
      unified_account_total_equity: string;
      leverage: string;
      spot_order_loss: string;
      spot_hedge: boolean;
    }>
  > {
    return this.getPrivate('/unified/accounts', params);
  }

  /**
   * Query about the maximum borrowing for the unified account
   *
   * @param params Parameters for querying the maximum borrowing for the unified account
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   amount: string;
   * }>>
   */
  queryUnifiedAccountMaxBorrowing(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      amount: string;
    }>
  > {
    return this.getPrivate('/unified/borrowable', params);
  }

  /**
   * Query about the maximum transferable for the unified account
   *
   * @param params Parameters for querying the maximum transferable for the unified account
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   amount: string;
   * }>>
   */
  queryUnifiedAccountMaxTransferable(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      amount: string;
    }>
  > {
    return this.getPrivate('/unified/transferable', params);
  }

  /**
   * Borrow or repay
   *
   * When borrowing, it is essential to ensure that the borrowed amount is not below the minimum borrowing threshold for the specific cryptocurrency and does not exceed the maximum borrowing limit set by the platform and the user.
   *
   * The interest on the loan will be automatically deducted from the account at regular intervals. It is the user's responsibility to manage the repayment of the borrowed amount.
   *
   * For repayment, the option to repay the entire borrowed amount is available by setting the parameter repaid_all=true
   *
   * @param params Parameters for borrowing or repaying
   * @returns Promise<APIResponse<void>>
   */
  borrowOrRepay(params: {
    currency: string;
    type: 'borrow' | 'repay';
    amount: string;
    repaid_all?: boolean;
    text?: string;
  }): Promise<APIResponse<void>> {
    return this.postPrivate('/unified/loans', params);
  }

  /**
   * List loans
   *
   * @param params Parameters for listing loans
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   currency_pair: string;
   *   amount: string;
   *   type: 'platform' | 'margin';
   *   create_time: number;
   *   update_time: number;
   * }[]>>
   */
  listLoans(params?: {
    currency?: string;
    page?: number;
    limit?: number;
    type?: 'platform' | 'margin';
  }): Promise<
    APIResponse<
      {
        currency: string;
        currency_pair: string;
        amount: string;
        type: 'platform' | 'margin';
        create_time: number;
        update_time: number;
      }[]
    >
  > {
    return this.getPrivate('/unified/loans', params);
  }

  /**
   * Get loan records
   *
   * @param params Parameters for getting loan records
   * @returns Promise<APIResponse<{
   *   id: number;
   *   type: 'borrow' | 'repay';
   *   repayment_type: 'none' | 'manual_repay' | 'auto_repay' | 'cancel_auto_repay';
   *   currency_pair: string;
   *   currency: string;
   *   amount: string;
   *   create_time: number;
   * }[]>>
   */
  getLoanRecords(params?: {
    type?: 'borrow' | 'repay';
    currency?: string;
    page?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        type: 'borrow' | 'repay';
        repayment_type:
          | 'none'
          | 'manual_repay'
          | 'auto_repay'
          | 'cancel_auto_repay';
        currency_pair: string;
        currency: string;
        amount: string;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate('/unified/loan_records', params);
  }

  /**
   * List interest records
   *
   * @param params Parameters for listing interest records
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   currency_pair: string;
   *   actual_rate: string;
   *   interest: string;
   *   status: number;
   *   type: 'platform' | 'margin';
   *   create_time: number;
   * }[]>>
   */
  listInterestRecords(params?: {
    currency?: string;
    page?: number;
    limit?: number;
    type?: 'platform' | 'margin';
  }): Promise<
    APIResponse<
      {
        currency: string;
        currency_pair: string;
        actual_rate: string;
        interest: string;
        status: number;
        type: 'platform' | 'margin';
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate('/unified/interest_records', params);
  }

  /**
   * Retrieve user risk unit details, only valid in portfolio margin mode
   *
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   spot_hedge: boolean;
   *   risk_units: {
   *     symbol: string;
   *     spot_in_use: string;
   *     maintain_margin: string;
   *     initial_margin: string;
   *     delta: string;
   *     gamma: string;
   *     theta: string;
   *     vega: string;
   *   }[];
   * }>>
   */
  retrieveUserRiskUnitDetails(): Promise<
    APIResponse<{
      user_id: number;
      spot_hedge: boolean;
      risk_units: {
        symbol: string;
        spot_in_use: string;
        maintain_margin: string;
        initial_margin: string;
        delta: string;
        gamma: string;
        theta: string;
        vega: string;
      }[];
    }>
  > {
    return this.getPrivate('/unified/risk_units');
  }

  /**
   * Set mode of the unified account
   *
   * Switching between different account modes requires only passing the parameters corresponding to the target account mode. It also supports opening or closing configuration switches for the corresponding account mode when switching.
   *
   * @param params Parameters for setting the mode of the unified account
   * @returns Promise<APIResponse<void>>
   */
  setUnifiedAccountMode(params: {
    mode: 'classic' | 'multi_currency' | 'portfolio';
    settings?: {
      usdt_futures?: boolean;
      spot_hedge?: boolean;
    };
  }): Promise<APIResponse<void>> {
    return this.putPrivate('/unified/unified_mode', params);
  }

  /**
   * Query mode of the unified account
   *
   * @returns Promise<APIResponse<{
   *   mode: 'classic' | 'multi_currency' | 'portfolio';
   *   settings: {
   *     usdt_futures?: boolean;
   *     spot_hedge?: boolean;
   *   };
   * }>>
   */
  queryUnifiedAccountMode(): Promise<
    APIResponse<{
      mode: 'classic' | 'multi_currency' | 'portfolio';
      settings: {
        usdt_futures?: boolean;
        spot_hedge?: boolean;
      };
    }>
  > {
    return this.getPrivate('/unified/unified_mode');
  }

  /**
   * Get unified estimate rate
   *
   * Due to fluctuations in lending depth, hourly interest rates may vary, and thus, I cannot provide exact rates. When a currency is not supported, the interest rate returned will be an empty string.
   *
   * @param params Parameters for querying estimate rates
   * @returns Promise<APIResponse<{ [key: string]: string }>>
   */
  getUnifiedEstimateRate(params: {
    currencies: string[];
  }): Promise<APIResponse<{ [key: string]: string }>> {
    return this.getPrivate('/unified/estimate_rate', params);
  }

  /**
   * List currency discount tiers
   *
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   discount_tiers: {
   *     tier: string;
   *     discount: string;
   *     lower_limit: string;
   *     upper_limit: string;
   *   }[];
   * }[]>>
   */
  listCurrencyDiscountTiers(): Promise<
    APIResponse<
      {
        currency: string;
        discount_tiers: {
          tier: string;
          discount: string;
          lower_limit: string;
          upper_limit: string;
        }[];
      }[]
    >
  > {
    return this.get('/unified/currency_discount_tiers');
  }

  /**
   * Portfolio margin calculator
   *
   * Portfolio Margin Calculator When inputting a simulated position portfolio, each position includes the position name and quantity held, supporting markets within the range of BTC and ETH perpetual contracts, options, and spot markets. When inputting simulated orders, each order includes the market identifier, order price, and order quantity, supporting markets within the range of BTC and ETH perpetual contracts, options, and spot markets. Market orders are not included.
   *
   * @param params Parameters for portfolio margin calculator
   * @returns Promise<APIResponse<{
   *   maintain_margin_total: string;
   *   initial_margin_total: string;
   *   calculate_time: number;
   *   risk_unit: {
   *     symbol: string;
   *     spot_in_use: string;
   *     maintain_margin: string;
   *     initial_margin: string;
   *     margin_result: {
   *       type: 'original_position' | 'long_delta_original_position' | 'short_delta_original_position';
   *       profit_loss_ranges: {
   *         price_percentage: string;
   *         implied_volatility_percentage: string;
   *         profit_loss: string;
   *       }[];
   *       max_loss: {
   *         price_percentage: string;
   *         implied_volatility_percentage: string;
   *         profit_loss: string;
   *       };
   *       mr1: string;
   *       mr2: string;
   *       mr3: string;
   *       mr4: string;
   *       delta: string;
   *       gamma: string;
   *       theta: string;
   *       vega: string;
   *     }[];
   *   }[];
   * }>>
   */
  portfolioMarginCalculator(params: {
    spot_balances?: {
      currency: string;
      equity: string;
    }[];
    spot_orders?: {
      currency_pairs: string;
      order_price: string;
      count?: string;
      left: string;
      type: 'sell' | 'buy';
    }[];
    futures_positions?: {
      contract: string;
      size: string;
    }[];
    futures_orders?: {
      contract: string;
      size: string;
      left: string;
    }[];
    options_positions?: {
      options_name: string;
      size: string;
    }[];
    options_orders?: {
      options_name: string;
      size: string;
      left: string;
    }[];
    spot_hedge?: boolean;
  }): Promise<
    APIResponse<{
      maintain_margin_total: string;
      initial_margin_total: string;
      calculate_time: number;
      risk_unit: {
        symbol: string;
        spot_in_use: string;
        maintain_margin: string;
        initial_margin: string;
        margin_result: {
          type:
            | 'original_position'
            | 'long_delta_original_position'
            | 'short_delta_original_position';
          profit_loss_ranges: {
            price_percentage: string;
            implied_volatility_percentage: string;
            profit_loss: string;
          }[];
          max_loss: {
            price_percentage: string;
            implied_volatility_percentage: string;
            profit_loss: string;
          };
          mr1: string;
          mr2: string;
          mr3: string;
          mr4: string;
          delta: string;
          gamma: string;
          theta: string;
          vega: string;
        }[];
      }[];
    }>
  > {
    return this.post('/unified/portfolio_calculator', params);
  }

  /**==========================================================================================================================
   * SPOT
   * ==========================================================================================================================
   */

  /**
   * List all currencies' details
   *
   * Currency has two forms:
   * - Only currency name, e.g., BTC, USDT
   * - <currency>_<chain>, e.g., HT_ETH
   *
   * The latter one occurs when one currency has multiple chains. Currency detail contains a chain field whatever the form is. To retrieve all chains of one currency, you can use all the details which have the name of the currency or name starting with <currency>_.
   *
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   delisted: boolean;
   *   withdraw_disabled: boolean;
   *   withdraw_delayed: boolean;
   *   deposit_disabled: boolean;
   *   trade_disabled: boolean;
   *   fixed_rate: string;
   *   chain: string;
   * }[]>>
   */
  listAllCurrenciesDetails(): Promise<
    APIResponse<
      {
        currency: string;
        delisted: boolean;
        withdraw_disabled: boolean;
        withdraw_delayed: boolean;
        deposit_disabled: boolean;
        trade_disabled: boolean;
        fixed_rate: string;
        chain: string;
      }[]
    >
  > {
    return this.get('/spot/currencies');
  }

  /**
   * Get details of a specific currency
   *
   * @param params Parameters for retrieving details of a specific currency
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   delisted: boolean;
   *   withdraw_disabled: boolean;
   *   withdraw_delayed: boolean;
   *   deposit_disabled: boolean;
   *   trade_disabled: boolean;
   *   fixed_rate: string;
   *   chain: string;
   * }>>
   */
  getCurrencyDetails(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      delisted: boolean;
      withdraw_disabled: boolean;
      withdraw_delayed: boolean;
      deposit_disabled: boolean;
      trade_disabled: boolean;
      fixed_rate: string;
      chain: string;
    }>
  > {
    return this.get(`/spot/currencies/${params.currency}`);
  }

  /**
   * List all currency pairs supported
   *
   * @returns Promise<APIResponse<{
   *   id: string;
   *   base: string;
   *   quote: string;
   *   fee: string;
   *   min_quote_amount: string;
   *   min_base_amount: string;
   *   amount_precision: number;
   *   precision: number;
   *   trade_status: string;
   *   sell_start: number;
   *   buy_start: number;
   * }[]>>
   */
  listAllCurrencyPairs(): Promise<APIResponse<CurrencyPair[]>> {
    return this.get('/spot/currency_pairs');
  }

  /**
   * Get details of a specific currency pair
   *
   * @param params Parameters for retrieving details of a specific currency pair
   * @returns Promise<APIResponse<{
   *   id: string;
   *   base: string;
   *   quote: string;
   *   fee: string;
   *   min_quote_amount: string;
   *   min_base_amount: string;
   *   amount_precision: number;
   *   precision: number;
   *   trade_status: string;
   *   sell_start: number;
   *   buy_start: number;
   * }>>
   */
  getCurrencyPairDetails(params: {
    currency_pair: string;
  }): Promise<APIResponse<CurrencyPair>> {
    return this.get(`/spot/currency_pairs/${params.currency_pair}`);
  }

  /**
   * Retrieve ticker information
   *
   * Return only related data if currency_pair is specified; otherwise return all of them.
   *
   * @param params Parameters for retrieving ticker information
   * @returns Promise<APIResponse<{
   *   currency_pair: string;
   *   last: string;
   *   lowest_ask: string;
   *   highest_bid: string;
   *   change_percentage: string;
   *   change_utc0: string;
   *   change_utc8: string;
   *   base_volume: string;
   *   quote_volume: string;
   *   high_24h: string;
   *   low_24h: string;
   *   etf_net_value: string;
   *   etf_pre_net_value: string | null;
   *   etf_pre_timestamp: number | null;
   *   etf_leverage: string | null;
   * }[]>>
   */
  retrieveTickerInformation(params?: {
    currency_pair?: string;
    timezone?: 'utc0' | 'utc8' | 'all';
  }): Promise<
    APIResponse<
      {
        currency_pair: string;
        last: string;
        lowest_ask: string;
        highest_bid: string;
        change_percentage: string;
        change_utc0: string;
        change_utc8: string;
        base_volume: string;
        quote_volume: string;
        high_24h: string;
        low_24h: string;
        etf_net_value: string;
        etf_pre_net_value: string | null;
        etf_pre_timestamp: number | null;
        etf_leverage: string | null;
      }[]
    >
  > {
    return this.get('/spot/tickers', params);
  }

  /**
   * Retrieve order book
   *
   * Order book will be sorted by price from high to low on bids; low to high on asks.
   *
   * @param params Parameters for retrieving order book
   * @returns Promise<APIResponse<{
   *   id?: number;
   *   current: number;
   *   update: number;
   *   asks: [string, string][];
   *   bids: [string, string][];
   * }>>
   */
  retrieveOrderBook(params: {
    currency_pair: string;
    interval?: string;
    limit?: number;
    with_id?: boolean;
  }): Promise<
    APIResponse<{
      id?: number;
      current: number;
      update: number;
      asks: [string, string][];
      bids: [string, string][];
    }>
  > {
    return this.get('/spot/order_book', params);
  }

  /**
   * Retrieve market trades
   *
   * You can use from and to to query by time range, or use last_id by scrolling page. The default behavior is by time range.
   * Scrolling query using last_id is not recommended any more. If last_id is specified, time range query parameters will be ignored.
   *
   * @param params Parameters for retrieving market trades
   * @returns Promise<APIResponse<{
   *   id: string;
   *   create_time: string;
   *   create_time_ms: string;
   *   currency_pair: string;
   *   side: 'buy' | 'sell';
   *   role: 'taker' | 'maker';
   *   amount: string;
   *   price: string;
   *   order_id: string;
   *   fee: string;
   *   fee_currency: string;
   *   point_fee: string;
   *   gt_fee: string;
   *   amend_text: string;
   *   sequence_id: string;
   *   text: string;
   * }[]>>
   */
  retrieveMarketTrades(params: {
    currency_pair: string;
    limit?: number;
    last_id?: string;
    reverse?: boolean;
    from?: number;
    to?: number;
    page?: number;
  }): Promise<
    APIResponse<
      {
        id: string;
        create_time: string;
        create_time_ms: string;
        currency_pair: string;
        side: 'buy' | 'sell';
        role: 'taker' | 'maker';
        amount: string;
        price: string;
        order_id: string;
        fee: string;
        fee_currency: string;
        point_fee: string;
        gt_fee: string;
        amend_text: string;
        sequence_id: string;
        text: string;
      }[]
    >
  > {
    return this.get('/spot/trades', params);
  }

  /**
   * Market candlesticks
   *
   * Maximum of 1000 points can be returned in a query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving market candlesticks
   * @returns Promise<APIResponse<[[
   *   string, // Unix timestamp with second precision
   *   string, // Trading volume in quote currency
   *   string, // Closing price
   *   string, // Highest price
   *   string, // Lowest price
   *   string, // Opening price
   *   string, // Trading volume in base currency
   *   boolean // Whether the window is closed
   * ]]>>
   */
  marketCandlesticks(params: {
    currency_pair: string;
    limit?: number;
    from?: number;
    to?: number;
    interval?:
      | '10s'
      | '1m'
      | '5m'
      | '15m'
      | '30m'
      | '1h'
      | '4h'
      | '8h'
      | '1d'
      | '7d'
      | '30d';
  }): Promise<
    APIResponse<
      [
        [
          string, // Unix timestamp with second precision
          string, // Trading volume in quote currency
          string, // Closing price
          string, // Highest price
          string, // Lowest price
          string, // Opening price
          string, // Trading volume in base currency
          boolean, // Whether the window is closed
        ],
      ]
    >
  > {
    return this.get('/spot/candlesticks', params);
  }

  /**
   * Query user trading fee rates
   *
   * This API is deprecated in favour of new fee retrieving API /wallet/fee.
   *
   * @param params Parameters for querying user trading fee rates
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   taker_fee: string;
   *   maker_fee: string;
   *   gt_discount: boolean;
   *   gt_taker_fee: string;
   *   gt_maker_fee: string;
   *   loan_fee: string;
   *   point_type: string;
   *   currency_pair: string;
   *   debit_fee: number;
   * }>>
   */
  queryUserTradingFeeRates(params?: { currency_pair?: string }): Promise<
    APIResponse<{
      user_id: number;
      taker_fee: string;
      maker_fee: string;
      gt_discount: boolean;
      gt_taker_fee: string;
      gt_maker_fee: string;
      loan_fee: string;
      point_type: string;
      currency_pair: string;
      debit_fee: number;
    }>
  > {
    return this.getPrivate('/spot/fee', params);
  }

  /**
   * Query a batch of user trading fee rates
   *
   * @param params Parameters for querying a batch of user trading fee rates
   * @returns Promise<APIResponse<{
   *   [key: string]: {
   *     user_id: number;
   *     taker_fee: string;
   *     maker_fee: string;
   *     gt_discount: boolean;
   *     gt_taker_fee: string;
   *     gt_maker_fee: string;
   *     loan_fee: string;
   *     point_type: string;
   *     currency_pair: string;
   *     debit_fee: number;
   *   };
   * }>>
   */
  queryBatchUserTradingFeeRates(params: { currency_pairs: string }): Promise<
    APIResponse<{
      [key: string]: {
        user_id: number;
        taker_fee: string;
        maker_fee: string;
        gt_discount: boolean;
        gt_taker_fee: string;
        gt_maker_fee: string;
        loan_fee: string;
        point_type: string;
        currency_pair: string;
        debit_fee: number;
      };
    }>
  > {
    return this.getPrivate('/spot/batch_fee', params);
  }

  /**
   * List spot accounts
   *
   * @param params Parameters for listing spot accounts
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   available: string;
   *   locked: string;
   *   update_id: number;
   * }[]>>
   */
  listSpotAccounts(params?: { currency?: string }): Promise<
    APIResponse<
      {
        currency: string;
        available: string;
        locked: string;
        update_id: number;
      }[]
    >
  > {
    return this.getPrivate('/spot/accounts', params);
  }

  /**
   * Query account book
   *
   * Record time range cannot exceed 30 days.
   *
   * @param params Parameters for querying account book
   * @returns Promise<APIResponse<{
   *   id: string;
   *   time: number;
   *   currency: string;
   *   change: string;
   *   balance: string;
   *   type: string;
   *   text: string;
   * }[]>>
   */
  queryAccountBook(params?: {
    currency?: string;
    from?: number;
    to?: number;
    page?: number;
    limit?: number;
    type?: string;
  }): Promise<
    APIResponse<
      {
        id: string;
        time: number;
        currency: string;
        change: string;
        balance: string;
        type: string;
        text: string;
      }[]
    >
  > {
    return this.getPrivate('/spot/account_book', params);
  }

  /**
   * Create a batch of orders
   *
   * Batch orders requirements:
   * - custom order field text is required
   * - At most 4 currency pairs, maximum 10 orders each, are allowed in one request
   * - No mixture of spot orders and margin orders, i.e. account must be identical for all orders
   *
   * @param params Parameters for creating a batch of orders
   * @returns Promise<APIResponse<{
   *   order_id: string;
   *   amend_text: string;
   *   text: string;
   *   succeeded: boolean;
   *   label: string;
   *   message: string;
   *   id: string;
   *   create_time: string;
   *   update_time: string;
   *   create_time_ms: number;
   *   update_time_ms: number;
   *   status: 'open' | 'closed' | 'cancelled';
   *   currency_pair: string;
   *   type: 'limit' | 'market';
   *   account: 'spot' | 'margin' | 'cross_margin' | 'unified';
   *   side: 'buy' | 'sell';
   *   amount: string;
   *   price: string;
   *   time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
   *   iceberg: string;
   *   auto_repay: boolean;
   *   left: string;
   *   filled_amount: string;
   *   fill_price: string;
   *   filled_total: string;
   *   avg_deal_price: string;
   *   fee: string;
   *   fee_currency: string;
   *   point_fee: string;
   *   gt_fee: string;
   *   gt_discount: boolean;
   *   rebated_fee: string;
   *   rebated_fee_currency: string;
   *   stp_id: number;
   *   stp_act: 'cn' | 'co' | 'cb' | '-';
   *   finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
   * }[]>>
   */
  createBatchOrders(params: {
    body: {
      currency_pair: string;
      text: string;
      type: 'limit' | 'market';
      account: 'spot' | 'margin' | 'cross_margin' | 'unified';
      side: 'buy' | 'sell';
      amount: string;
      price?: string;
      time_in_force?: 'gtc' | 'ioc' | 'poc' | 'fok';
      iceberg?: string;
      auto_repay?: boolean;
    }[];
  }): Promise<
    APIResponse<
      {
        order_id: string;
        amend_text: string;
        text: string;
        succeeded: boolean;
        label: string;
        message: string;
        id: string;
        create_time: string;
        update_time: string;
        create_time_ms: number;
        update_time_ms: number;
        status: 'open' | 'closed' | 'cancelled';
        currency_pair: string;
        type: 'limit' | 'market';
        account: 'spot' | 'margin' | 'cross_margin' | 'unified';
        side: 'buy' | 'sell';
        amount: string;
        price: string;
        time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
        iceberg: string;
        auto_repay: boolean;
        left: string;
        filled_amount: string;
        fill_price: string;
        filled_total: string;
        avg_deal_price: string;
        fee: string;
        fee_currency: string;
        point_fee: string;
        gt_fee: string;
        gt_discount: boolean;
        rebated_fee: string;
        rebated_fee_currency: string;
        stp_id: number;
        stp_act: 'cn' | 'co' | 'cb' | '-';
        finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
      }[]
    >
  > {
    return this.postPrivate('/spot/batch_orders', params);
  }

  /**
   * List all open orders
   *
   * List open orders in all currency pairs.
   * Note that pagination parameters affect record number in each currency pair's open order list. No pagination is applied to the number of currency pairs returned. All currency pairs with open orders will be returned.
   * Spot, portfolio, and margin orders are returned by default. To list cross margin orders, account must be set to cross_margin.
   *
   * @param params Parameters for listing all open orders
   * @returns Promise<APIResponse<{
   *   currency_pair: string;
   *   total: number;
   *   orders: {
   *     id: string;
   *     text: string;
   *     amend_text: string;
   *     create_time: string;
   *     update_time: string;
   *     create_time_ms: number;
   *     update_time_ms: number;
   *     status: 'open' | 'closed' | 'cancelled';
   *     currency_pair: string;
   *     type: 'limit' | 'market';
   *     account: 'spot' | 'margin' | 'cross_margin' | 'unified';
   *     side: 'buy' | 'sell';
   *     amount: string;
   *     price: string;
   *     time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
   *     iceberg: string;
   *     auto_repay: boolean;
   *     left: string;
   *     filled_amount: string;
   *     fill_price: string;
   *     filled_total: string;
   *     avg_deal_price: string;
   *     fee: string;
   *     fee_currency: string;
   *     point_fee: string;
   *     gt_fee: string;
   *     gt_maker_fee: string;
   *     gt_taker_fee: string;
   *     gt_discount: boolean;
   *     rebated_fee: string;
   *     rebated_fee_currency: string;
   *     stp_id: number;
   *     stp_act: 'cn' | 'co' | 'cb' | '-';
   *     finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
   *   }[];
   * }[]>>
   */
  listAllOpenOrders(params?: {
    page?: number;
    limit?: number;
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  }): Promise<
    APIResponse<
      {
        currency_pair: string;
        total: number;
        orders: {
          id: string;
          text: string;
          amend_text: string;
          create_time: string;
          update_time: string;
          create_time_ms: number;
          update_time_ms: number;
          status: 'open' | 'closed' | 'cancelled';
          currency_pair: string;
          type: 'limit' | 'market';
          account: 'spot' | 'margin' | 'cross_margin' | 'unified';
          side: 'buy' | 'sell';
          amount: string;
          price: string;
          time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
          iceberg: string;
          auto_repay: boolean;
          left: string;
          filled_amount: string;
          fill_price: string;
          filled_total: string;
          avg_deal_price: string;
          fee: string;
          fee_currency: string;
          point_fee: string;
          gt_fee: string;
          gt_maker_fee: string;
          gt_taker_fee: string;
          gt_discount: boolean;
          rebated_fee: string;
          rebated_fee_currency: string;
          stp_id: number;
          stp_act: 'cn' | 'co' | 'cb' | '-';
          finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
        }[];
      }[]
    >
  > {
    return this.getPrivate('/spot/open_orders', params);
  }

  /**
   * Close position when cross-currency is disabled
   *
   * Currently, only cross-margin accounts are supported to close position when cross currencies are disabled. Maximum buy quantity = (unpaid principal and interest - currency balance - the amount of the currency in the order book) / 0.998
   *
   * @param params Parameters for closing position when cross-currency is disabled
   * @returns Promise<APIResponse<{
   *   order_id: string;
   *   text: string;
   *   currency_pair: string;
   *   amount: string;
   *   price: string;
   *   action_mode?: 'ACK' | 'RESULT' | 'FULL';
   * }>>
   */
  closePositionWhenCrossCurrencyDisabled(params: {
    text?: string;
    currency_pair: string;
    amount: string;
    price: string;
    action_mode?: 'ACK' | 'RESULT' | 'FULL';
  }): Promise<APIResponse<Order>> {
    return this.postPrivate('/spot/cross_liquidate_orders', params);
  }

  /**
   * Create an order
   *
   * You can place orders with spot, portfolio, margin or cross margin account through setting the account field. It defaults to spot, which means spot account is used to place orders. If the user is using unified account, it defaults to the unified account.
   *
   * @param params Parameters for creating an order
   * @returns Promise<APIResponse<{
   *   order_id: string;
   *   text: string;
   *   currency_pair: string;
   *   type: 'limit' | 'market';
   *   account: 'spot' | 'margin' | 'cross_margin' | 'unified';
   *   side: 'buy' | 'sell';
   *   amount: string;
   *   price?: string;
   *   time_in_force?: 'gtc' | 'ioc' | 'poc' | 'fok';
   *   iceberg?: string;
   *   auto_borrow?: boolean;
   *   auto_repay?: boolean;
   *   stp_act?: 'cn' | 'co' | 'cb' | '-';
   *   action_mode?: 'ACK' | 'RESULT' | 'FULL';
   * }>>
   */
  createOrder(params: {
    text?: string;
    currency_pair: string;
    type?: 'limit' | 'market';
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
    side: 'buy' | 'sell';
    amount: string;
    price?: string;
    time_in_force?: 'gtc' | 'ioc' | 'poc' | 'fok';
    iceberg?: string;
    auto_borrow?: boolean;
    auto_repay?: boolean;
    stp_act?: 'cn' | 'co' | 'cb' | '-';
    action_mode?: 'ACK' | 'RESULT' | 'FULL';
  }): Promise<APIResponse<Order>> {
    return this.postPrivate('/spot/orders', params);
  }

  /**
   * List orders
   *
   * Spot, portfolio and margin orders are returned by default. If cross margin orders are needed, account must be set to cross_margin.
   *
   * @param params Parameters for listing orders
   * @returns Promise<APIResponse<{
   *   id: string;
   *   text: string;
   *   amend_text: string;
   *   create_time: string;
   *   update_time: string;
   *   create_time_ms: number;
   *   update_time_ms: number;
   *   status: 'open' | 'closed' | 'cancelled';
   *   currency_pair: string;
   *   type: 'limit' | 'market';
   *   account: 'spot' | 'margin' | 'cross_margin' | 'unified';
   *   side: 'buy' | 'sell';
   *   amount: string;
   *   price: string;
   *   time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
   *   iceberg: string;
   *   auto_repay: boolean;
   *   left: string;
   *   filled_amount: string;
   *   fill_price: string;
   *   filled_total: string;
   *   avg_deal_price: string;
   *   fee: string;
   *   fee_currency: string;
   *   point_fee: string;
   *   gt_fee: string;
   *   gt_maker_fee: string;
   *   gt_taker_fee: string;
   *   gt_discount: boolean;
   *   rebated_fee: string;
   *   rebated_fee_currency: string;
   *   stp_id: number;
   *   stp_act: 'cn' | 'co' | 'cb' | '-';
   *   finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
   * }[]>>
   */
  listOrders(params: {
    currency_pair: string;
    status: 'open' | 'finished';
    page?: number;
    limit?: number;
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
    from?: number;
    to?: number;
    side?: 'buy' | 'sell';
  }): Promise<APIResponse<Order[]>> {
    return this.getPrivate('/spot/orders', params);
  }

  /**
   * Cancel all open orders in specified currency pair
   *
   * If account is not set, all open orders, including spot, portfolio, margin and cross margin ones, will be cancelled.
   * You can set account to cancel only orders within the specified account.
   *
   * @param params Parameters for cancelling all open orders in specified currency pair
   * @returns Promise<APIResponse<{
   *   id: string;
   *   text: string;
   *   amend_text: string;
   *   create_time: string;
   *   update_time: string;
   *   create_time_ms: number;
   *   update_time_ms: number;
   *   status: 'open' | 'closed' | 'cancelled';
   *   currency_pair: string;
   *   type: 'limit' | 'market';
   *   account: 'spot' | 'margin' | 'cross_margin' | 'unified';
   *   side: 'buy' | 'sell';
   *   amount: string;
   *   price: string;
   *   time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
   *   iceberg: string;
   *   auto_repay: boolean;
   *   left: string;
   *   filled_amount: string;
   *   fill_price: string;
   *   filled_total: string;
   *   avg_deal_price: string;
   *   fee: string;
   *   fee_currency: string;
   *   point_fee: string;
   *   gt_fee: string;
   *   gt_maker_fee: string;
   *   gt_taker_fee: string;
   *   gt_discount: boolean;
   *   rebated_fee: string;
   *   rebated_fee_currency: string;
   *   stp_id: number;
   *   stp_act: 'cn' | 'co' | 'cb' | '-';
   *   finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
   * }[]>>
   */
  cancelPairOpenOrders(params: {
    currency_pair: string;
    side?: 'buy' | 'sell';
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
    action_mode?: 'ACK' | 'RESULT' | 'FULL';
  }): Promise<APIResponse<Order[]>> {
    return this.deletePrivate('/spot/orders', params);
  }

  /**
   * Cancel a batch of orders with an ID list
   *
   * Multiple currency pairs can be specified, but maximum 20 orders are allowed per request.
   *
   * @param params Parameters for cancelling a batch of orders
   * @returns Promise<APIResponse<{
   *   currency_pair: string;
   *   id: string;
   *   succeeded: boolean;
   *   label: string;
   *   message: string;
   *   account: string;
   * }[]>>
   */
  cancelBatchOrders(params: {
    body: {
      currency_pair: string;
      id: string;
    }[];
  }): Promise<
    APIResponse<
      {
        currency_pair: string;
        id: string;
        succeeded: boolean;
        label: string;
        message: string;
        account: string;
      }[]
    >
  > {
    return this.postPrivate('/spot/cancel_batch_orders', params);
  }

  /**
   * Get a single order
   *
   * Spot, portfolio and margin orders are queried by default. If cross margin orders are needed or portfolio margin account are used, account must be set to cross_margin.
   *
   * @param params Parameters for getting a single order
   * @returns Promise<APIResponse<{
   *   id: string;
   *   text: string;
   *   amend_text: string;
   *   create_time: string;
   *   update_time: string;
   *   create_time_ms: number;
   *   update_time_ms: number;
   *   status: 'open' | 'closed' | 'cancelled';
   *   currency_pair: string;
   *   type: 'limit' | 'market';
   *   account: 'spot' | 'margin' | 'cross_margin' | 'unified';
   *   side: 'buy' | 'sell';
   *   amount: string;
   *   price: string;
   *   time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
   *   iceberg: string;
   *   auto_repay: boolean;
   *   left: string;
   *   filled_amount: string;
   *   fill_price: string;
   *   filled_total: string;
   *   avg_deal_price: string;
   *   fee: string;
   *   fee_currency: string;
   *   point_fee: string;
   *   gt_fee: string;
   *   gt_maker_fee: string;
   *   gt_taker_fee: string;
   *   gt_discount: boolean;
   *   rebated_fee: string;
   *   rebated_fee_currency: string;
   *   stp_id: number;
   *   stp_act: 'cn' | 'co' | 'cb' | '-';
   *   finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
   * }>>
   */
  getSingleOrder(params: {
    order_id: string;
    currency_pair: string;
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  }): Promise<APIResponse<Order>> {
    return this.getPrivate(`/spot/orders/${params.order_id}`, params);
  }

  /**
   * Amend an order
   *
   * By default, the orders of spot, portfolio and margin account are updated. If you need to modify orders of the cross-margin account, you must specify account as cross_margin. For portfolio margin account, only cross_margin account is supported.
   *
   * Currently, only supports modification of price or amount fields.
   *
   * @param params Parameters for amending an order
   * @returns Promise<APIResponse<{
   *   id: string;
   *   text: string;
   *   amend_text: string;
   *   create_time: string;
   *   update_time: string;
   *   create_time_ms: number;
   *   update_time_ms: number;
   *   status: 'open' | 'closed' | 'cancelled';
   *   currency_pair: string;
   *   type: 'limit' | 'market';
   *   account: 'spot' | 'margin' | 'cross_margin' | 'unified';
   *   side: 'buy' | 'sell';
   *   amount: string;
   *   price: string;
   *   time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
   *   iceberg: string;
   *   auto_repay: boolean;
   *   left: string;
   *   filled_amount: string;
   *   fill_price: string;
   *   filled_total: string;
   *   avg_deal_price: string;
   *   fee: string;
   *   fee_currency: string;
   *   point_fee: string;
   *   gt_fee: string;
   *   gt_maker_fee: string;
   *   gt_taker_fee: string;
   *   gt_discount: boolean;
   *   rebated_fee: string;
   *   rebated_fee_currency: string;
   *   stp_id: number;
   *   stp_act: 'cn' | 'co' | 'cb' | '-';
   *   finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
   * }>>
   */
  amendOrder(params: {
    order_id: string;
    currency_pair: string;
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
    body: {
      amount?: string;
      price?: string;
      amend_text?: string;
      action_mode?: 'ACK' | 'RESULT' | 'FULL';
    };
  }): Promise<APIResponse<Order>> {
    return this.patchPrivate(`/spot/orders/${params.order_id}`, params);
  }

  /**
   * Cancel a single order
   *
   * Spot, portfolio and margin orders are cancelled by default. If trying to cancel cross margin orders or portfolio margin account are used, account must be set to cross_margin.
   *
   * @param params Parameters for cancelling a single order
   * @returns Promise<APIResponse<{
   *   id: string;
   *   text: string;
   *   amend_text: string;
   *   create_time: string;
   *   update_time: string;
   *   create_time_ms: number;
   *   update_time_ms: number;
   *   status: 'open' | 'closed' | 'cancelled';
   *   currency_pair: string;
   *   type: 'limit' | 'market';
   *   account: 'spot' | 'margin' | 'cross_margin' | 'unified';
   *   side: 'buy' | 'sell';
   *   amount: string;
   *   price: string;
   *   time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
   *   iceberg: string;
   *   auto_repay: boolean;
   *   left: string;
   *   filled_amount: string;
   *   fill_price: string;
   *   filled_total: string;
   *   avg_deal_price: string;
   *   fee: string;
   *   fee_currency: string;
   *   point_fee: string;
   *   gt_fee: string;
   *   gt_maker_fee: string;
   *   gt_taker_fee: string;
   *   gt_discount: boolean;
   *   rebated_fee: string;
   *   rebated_fee_currency: string;
   *   stp_id: number;
   *   stp_act: 'cn' | 'co' | 'cb' | '-';
   *   finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
   * }>>
   */
  cancelSingleOrder(params: {
    order_id: string;
    currency_pair: string;
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
    action_mode?: 'ACK' | 'RESULT' | 'FULL';
  }): Promise<APIResponse<Order>> {
    return this.deletePrivate(`/spot/orders/${params.order_id}`, params);
  }

  /**
   * List personal trading history
   *
   * Spot, portfolio and margin trades are queried by default. If cross margin trades are needed, account must be set to cross_margin.
   *
   * You can also set from and/or to to query by time range. If you don't specify from and/or to parameters, only the last 7 days of data will be returned. The range of from and to is not allowed to exceed 30 days. Time range parameters are handled as order finish time.
   *
   * @param params Parameters for listing personal trading history
   * @returns Promise<APIResponse<{
   *   id: string;
   *   create_time: string;
   *   create_time_ms: string;
   *   currency_pair: string;
   *   side: 'buy' | 'sell';
   *   role: 'taker' | 'maker';
   *   amount: string;
   *   price: string;
   *   order_id: string;
   *   fee: string;
   *   fee_currency: string;
   *   point_fee: string;
   *   gt_fee: string;
   *   amend_text: string;
   *   sequence_id: string;
   *   text: string;
   * }[]>>
   */
  listPersonalTradingHistory(params?: {
    currency_pair?: string;
    limit?: number;
    page?: number;
    order_id?: string;
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        id: string;
        create_time: string;
        create_time_ms: string;
        currency_pair: string;
        side: 'buy' | 'sell';
        role: 'taker' | 'maker';
        amount: string;
        price: string;
        order_id: string;
        fee: string;
        fee_currency: string;
        point_fee: string;
        gt_fee: string;
        amend_text: string;
        sequence_id: string;
        text: string;
      }[]
    >
  > {
    return this.getPrivate('/spot/my_trades', params);
  }

  /**
   * Get server current time
   *
   * @returns Promise<APIResponse<{
   *   server_time: number;
   * }>>
   */
  getServerTime(): Promise<
    APIResponse<{
      server_time: number;
    }>
  > {
    return this.get('/spot/time');
  }

  /**
   * Countdown cancel orders
   *
   * When the timeout set by the user is reached, if there is no cancel or set a new countdown, the related pending orders will be automatically cancelled. This endpoint can be called repeatedly to set a new countdown or cancel the countdown.
   *
   * @param params Parameters for setting countdown cancel orders
   * @returns Promise<APIResponse<{
   *   triggerTime: number;
   * }>>
   */
  countdownCancelOrders(params: {
    timeout: number;
    currency_pair?: string;
  }): Promise<
    APIResponse<{
      triggerTime: number;
    }>
  > {
    return this.postPrivate('/spot/countdown_cancel_all', params);
  }

  /**
   * Batch modification of orders
   *
   * Default modification of orders for spot, portfolio, and margin accounts. To modify orders for a cross margin account, the account parameter must be specified as cross_margin. For portfolio margin accounts, the account parameter can only be specified as cross_margin. Currently, only modifications to price or quantity (choose one) are supported.
   *
   * @param params Parameters for batch modification of orders
   * @returns Promise<APIResponse<{
   *   order_id: string;
   *   amend_text: string;
   *   text: string;
   *   succeeded: boolean;
   *   label: string;
   *   message: string;
   *   id: string;
   *   create_time: string;
   *   update_time: string;
   *   create_time_ms: number;
   *   update_time_ms: number;
   *   status: 'open' | 'closed' | 'cancelled';
   *   currency_pair: string;
   *   type: 'limit' | 'market';
   *   account: 'spot' | 'margin' | 'cross_margin' | 'unified';
   *   side: 'buy' | 'sell';
   *   amount: string;
   *   price: string;
   *   time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
   *   iceberg: string;
   *   auto_repay: boolean;
   *   left: string;
   *   filled_amount: string;
   *   fill_price: string;
   *   filled_total: string;
   *   avg_deal_price: string;
   *   fee: string;
   *   fee_currency: string;
   *   point_fee: string;
   *   gt_fee: string;
   *   gt_discount: boolean;
   *   rebated_fee: string;
   *   rebated_fee_currency: string;
   *   stp_id: number;
   *   stp_act: 'cn' | 'co' | 'cb' | '-';
   *   finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
   * }[]>>
   */
  amendBatchOrders(params: {
    body: {
      order_id: string;
      amount?: string;
      price?: string;
      amend_text?: string;
    }[];
  }): Promise<
    APIResponse<
      {
        order_id: string;
        amend_text: string;
        text: string;
        succeeded: boolean;
        label: string;
        message: string;
        id: string;
        create_time: string;
        update_time: string;
        create_time_ms: number;
        update_time_ms: number;
        status: 'open' | 'closed' | 'cancelled';
        currency_pair: string;
        type: 'limit' | 'market';
        account: 'spot' | 'margin' | 'cross_margin' | 'unified';
        side: 'buy' | 'sell';
        amount: string;
        price: string;
        time_in_force: 'gtc' | 'ioc' | 'poc' | 'fok';
        iceberg: string;
        auto_repay: boolean;
        left: string;
        filled_amount: string;
        fill_price: string;
        filled_total: string;
        avg_deal_price: string;
        fee: string;
        fee_currency: string;
        point_fee: string;
        gt_fee: string;
        gt_discount: boolean;
        rebated_fee: string;
        rebated_fee_currency: string;
        stp_id: number;
        stp_act: 'cn' | 'co' | 'cb' | '-';
        finish_as: 'open' | 'filled' | 'cancelled' | 'ioc' | 'stp';
      }[]
    >
  > {
    return this.postPrivate('/spot/amend_batch_orders', params);
  }

  /**
   * Create a price-triggered order
   *
   * @param params Parameters for creating a price-triggered order
   * @returns Promise<APIResponse<{
   *   id: number;
   * }>>
   */
  createPriceTriggeredOrder(params: {
    trigger: {
      price: string;
      rule: '>=' | '<=';
      expiration: number;
    };
    put: {
      type?: 'limit' | 'market';
      side: 'buy' | 'sell';
      price: string;
      amount: string;
      account: 'normal' | 'margin' | 'cross_margin';
      time_in_force?: 'gtc' | 'ioc';
      text?: string;
    };
    market: string;
  }): Promise<
    APIResponse<{
      id: number;
    }>
  > {
    return this.postPrivate('/spot/price_orders', params);
  }

  /**
   * Retrieve running auto order list
   *
   * @param params Parameters for retrieving running auto order list
   * @returns Promise<APIResponse<{
   *   id: number;
   *   trigger: {
   *     price: string;
   *     rule: '>=' | '<=';
   *     expiration: number;
   *   };
   *   put: {
   *     type: 'limit' | 'market';
   *     side: 'buy' | 'sell';
   *     price: string;
   *     amount: string;
   *     account: 'normal' | 'margin' | 'cross_margin';
   *     time_in_force: 'gtc' | 'ioc';
   *     text: string;
   *   };
   *   market: string;
   *   status: 'open' | 'finished';
   * }[]>>
   */
  retrieveRunningAutoOrderList(params: {
    status: 'open' | 'finished';
    market?: string;
    account?: 'normal' | 'margin' | 'cross_margin';
    limit?: number;
    offset?: number;
  }): Promise<APIResponse<SpotPriceTriggeredOrder[]>> {
    return this.getPrivate('/spot/price_orders', params);
  }
  /**
   * Cancel all open orders
   *
   * @param params Parameters for cancelling all open orders
   * @returns Promise<APIResponse<{
   *   id: number;
   *   trigger: {
   *     price: string;
   *     rule: '>=' | '<=';
   *     expiration: number;
   *   };
   *   put: {
   *     type: 'limit' | 'market';
   *     side: 'buy' | 'sell';
   *     price: string;
   *     amount: string;
   *     account: 'normal' | 'margin' | 'cross_margin';
   *     time_in_force: 'gtc' | 'ioc';
   *     text: string;
   *   };
   *   market: string;
   *   status: 'open' | 'finished';
   * }[]>>
   */
  cancelAllOpenOrders(params?: {
    market?: string;
    account?: 'normal' | 'margin' | 'cross_margin';
  }): Promise<APIResponse<SpotPriceTriggeredOrder[]>> {
    return this.deletePrivate('/spot/price_orders', params);
  }

  /**
   * Get a price-triggered order
   *
   * @param params Parameters for getting a price-triggered order
   * @returns Promise<APIResponse<{
   *   id: number;
   *   trigger: {
   *     price: string;
   *     rule: '>=' | '<=';
   *     expiration: number;
   *   };
   *   put: {
   *     type: 'limit' | 'market';
   *     side: 'buy' | 'sell';
   *     price: string;
   *     amount: string;
   *     account: 'normal' | 'margin' | 'cross_margin';
   *     time_in_force: 'gtc' | 'ioc';
   *     text: string;
   *   };
   *   market: string;
   *   status: 'open' | 'finished';
   * }>>
   */
  getPriceTriggeredOrder(params: {
    order_id: string;
  }): Promise<APIResponse<SpotPriceTriggeredOrder>> {
    return this.getPrivate(`/spot/price_orders/${params.order_id}`, params);
  }

  /**
   * Cancel a price-triggered order
   *
   * @param params Parameters for cancelling a price-triggered order
   * @returns Promise<APIResponse<{
   *   id: number;
   *   trigger: {
   *     price: string;
   *     rule: '>=' | '<=';
   *     expiration: number;
   *   };
   *   put: {
   *     type: 'limit' | 'market';
   *     side: 'buy' | 'sell';
   *     price: string;
   *     amount: string;
   *     account: 'normal' | 'margin' | 'cross_margin';
   *     time_in_force: 'gtc' | 'ioc';
   *     text: string;
   *   };
   *   market: string;
   *   status: 'open' | 'finished';
   * }>>
   */
  cancelPriceTriggeredOrder(params: {
    order_id: string;
  }): Promise<APIResponse<SpotPriceTriggeredOrder>> {
    return this.deletePrivate(`/spot/price_orders/${params.order_id}`, params);
  }

  /**==========================================================================================================================
   * MARGIN
   * ==========================================================================================================================
   */

  /**
   * Margin account list
   *
   * @param params Parameters for listing margin accounts
   * @returns Promise<APIResponse<{
   *   currency_pair: string;
   *   locked: boolean;
   *   risk: string;
   *   base: {
   *     currency: string;
   *     available: string;
   *     locked: string;
   *     borrowed: string;
   *     interest: string;
   *   };
   *   quote: {
   *     currency: string;
   *     available: string;
   *     locked: string;
   *     borrowed: string;
   *     interest: string;
   *   };
   * }[]>>
   */
  listMarginAccounts(params?: { currency_pair?: string }): Promise<
    APIResponse<
      {
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
      }[]
    >
  > {
    return this.getPrivate('/margin/accounts', params);
  }

  /**
   * List margin account balance change history
   *
   * Only transferals from and to margin account are provided for now. Time range allows 30 days at most.
   *
   * @param params Parameters for listing margin account balance change history
   * @returns Promise<APIResponse<{
   *   id: string;
   *   time: string;
   *   time_ms: number;
   *   currency: string;
   *   currency_pair: string;
   *   change: string;
   *   balance: string;
   *   type: string;
   * }[]>>
   */
  listMarginAccountBalanceChangeHistory(params?: {
    currency?: string;
    currency_pair?: string;
    type?: string;
    from?: number;
    to?: number;
    page?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        id: string;
        time: string;
        time_ms: number;
        currency: string;
        currency_pair: string;
        change: string;
        balance: string;
        type: string;
      }[]
    >
  > {
    return this.getPrivate('/margin/account_book', params);
  }

  /**
   * Funding account list
   *
   * @param params Parameters for listing funding accounts
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   available: string;
   *   locked: string;
   *   lent: string;
   *   total_lent: string;
   * }[]>>
   */
  listFundingAccounts(params?: { currency?: string }): Promise<
    APIResponse<
      {
        currency: string;
        available: string;
        locked: string;
        lent: string;
        total_lent: string;
      }[]
    >
  > {
    return this.getPrivate('/margin/funding_accounts', params);
  }

  /**
   * Update user's auto repayment setting
   *
   * @param params Parameters for updating auto repayment setting
   * @returns Promise<APIResponse<{ status: 'on' | 'off' }>>
   */
  updateAutoRepaymentSetting(params: {
    status: 'on' | 'off';
  }): Promise<APIResponse<{ status: 'on' | 'off' }>> {
    return this.postPrivate('/margin/auto_repay', params);
  }

  /**
   * Retrieve user auto repayment setting
   *
   * @returns Promise<APIResponse<{ status: 'on' | 'off' }>>
   */
  retrieveAutoRepaymentSetting(): Promise<
    APIResponse<{ status: 'on' | 'off' }>
  > {
    return this.getPrivate('/margin/auto_repay');
  }

  /**
   * Get the max transferable amount for a specific margin currency
   *
   * @param params Parameters for retrieving the max transferable amount
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   currency_pair?: string;
   *   amount: string;
   * }>>
   */
  getMarginTransferableAmount(params: {
    currency: string;
    currency_pair?: string;
  }): Promise<
    APIResponse<{
      currency: string;
      currency_pair?: string;
      amount: string;
    }>
  > {
    return this.getPrivate('/margin/transferable', params);
  }

  /**
   * Currencies supported by cross margin
   *
   * @returns Promise<APIResponse<{
   *   name: string;
   *   rate: string;
   *   prec: string;
   *   discount: string;
   *   min_borrow_amount: string;
   *   user_max_borrow_amount: string;
   *   total_max_borrow_amount: string;
   *   price: string;
   *   loanable: boolean;
   *   status: number;
   * }[]>>
   */
  listCrossMarginCurrencies(): Promise<
    APIResponse<
      {
        name: string;
        rate: string;
        prec: string;
        discount: string;
        min_borrow_amount: string;
        user_max_borrow_amount: string;
        total_max_borrow_amount: string;
        price: string;
        loanable: boolean;
        status: number;
      }[]
    >
  > {
    return this.get('/margin/cross/currencies');
  }

  /**
   * Retrieve detail of one single currency supported by cross margin
   *
   * @param params Parameters containing the currency name
   * @returns Promise<APIResponse<{
   *   name: string;
   *   rate: string;
   *   prec: string;
   *   discount: string;
   *   min_borrow_amount: string;
   *   user_max_borrow_amount: string;
   *   total_max_borrow_amount: string;
   *   price: string;
   *   loanable: boolean;
   *   status: number;
   * }>>
   */
  getCrossMarginCurrency(params: { currency: string }): Promise<
    APIResponse<{
      name: string;
      rate: string;
      prec: string;
      discount: string;
      min_borrow_amount: string;
      user_max_borrow_amount: string;
      total_max_borrow_amount: string;
      price: string;
      loanable: boolean;
      status: number;
    }>
  > {
    return this.get(`/margin/cross/currencies/${params.currency}`);
  }

  /**
   * Retrieve cross margin account
   *
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   refresh_time: number;
   *   locked: boolean;
   *   balances: {
   *     [currency: string]: {
   *       available: string;
   *       freeze: string;
   *       borrowed: string;
   *       interest: string;
   *       negative_liab: string;
   *       futures_pos_liab: string;
   *       equity: string;
   *       total_freeze: string;
   *       total_liab: string;
   *     };
   *   };
   *   total: string;
   *   borrowed: string;
   *   interest: string;
   *   risk: string;
   *   total_initial_margin: string;
   *   total_margin_balance: string;
   *   total_maintenance_margin: string;
   *   total_initial_margin_rate: string;
   *   total_maintenance_margin_rate: string;
   *   total_available_margin: string;
   *   portfolio_margin_total: string;
   *   portfolio_margin_total_liab: string;
   *   portfolio_margin_total_equity: string;
   * }>>
   */
  retrieveCrossMarginAccount(): Promise<
    APIResponse<{
      user_id: number;
      refresh_time: number;
      locked: boolean;
      balances: {
        [currency: string]: {
          available: string;
          freeze: string;
          borrowed: string;
          interest: string;
          negative_liab: string;
          futures_pos_liab: string;
          equity: string;
          total_freeze: string;
          total_liab: string;
        };
      };
      total: string;
      borrowed: string;
      interest: string;
      risk: string;
      total_initial_margin: string;
      total_margin_balance: string;
      total_maintenance_margin: string;
      total_initial_margin_rate: string;
      total_maintenance_margin_rate: string;
      total_available_margin: string;
      portfolio_margin_total: string;
      portfolio_margin_total_liab: string;
      portfolio_margin_total_equity: string;
    }>
  > {
    return this.getPrivate('/margin/cross/accounts');
  }

  /**
   * Retrieve cross margin account change history
   *
   * Record time range cannot exceed 30 days.
   *
   * @param params Parameters for retrieving cross margin account change history
   * @returns Promise<APIResponse<{
   *   id: string;
   *   time: number;
   *   currency: string;
   *   change: string;
   *   balance: string;
   *   type: string;
   * }[]>>
   */
  retrieveCrossMarginAccountChangeHistory(params?: {
    currency?: string;
    from?: number;
    to?: number;
    page?: number;
    limit?: number;
    type?: string;
  }): Promise<
    APIResponse<
      {
        id: string;
        time: number;
        currency: string;
        change: string;
        balance: string;
        type: string;
      }[]
    >
  > {
    return this.getPrivate('/margin/cross/account_book', params);
  }

  /**
   * Create a cross margin borrow loan
   *
   * Borrow amount cannot be less than currency minimum borrow amount.
   *
   * @param params Parameters for creating a cross margin borrow loan
   * @returns Promise<APIResponse<{
   *   id: string;
   *   create_time: number;
   *   update_time: number;
   *   currency: string;
   *   amount: string;
   *   text?: string;
   *   status: number;
   *   repaid: string;
   *   repaid_interest: string;
   *   unpaid_interest: string;
   * }>>
   */
  createCrossMarginBorrowLoan(params: {
    currency: string;
    amount: string;
    text?: string;
  }): Promise<
    APIResponse<{
      id: string;
      create_time: number;
      update_time: number;
      currency: string;
      amount: string;
      text?: string;
      status: number;
      repaid: string;
      repaid_interest: string;
      unpaid_interest: string;
    }>
  > {
    return this.postPrivate('/margin/cross/loans', params);
  }

  /**
   * List cross margin borrow history
   *
   * Sort by creation time in descending order by default. Set reverse=false to return ascending results.
   *
   * @param params Parameters for listing cross margin borrow history
   * @returns Promise<APIResponse<{
   *   id: string;
   *   create_time: number;
   *   update_time: number;
   *   currency: string;
   *   amount: string;
   *   text: string;
   *   status: number;
   *   repaid: string;
   *   repaid_interest: string;
   *   unpaid_interest: string;
   * }[]>>
   */
  listCrossMarginBorrowHistory(params: {
    status: number;
    currency?: string;
    limit?: number;
    offset?: number;
    reverse?: boolean;
  }): Promise<
    APIResponse<
      {
        id: string;
        create_time: number;
        update_time: number;
        currency: string;
        amount: string;
        text: string;
        status: number;
        repaid: string;
        repaid_interest: string;
        unpaid_interest: string;
      }[]
    >
  > {
    return this.getPrivate('/margin/cross/loans', params);
  }

  /**
   * Retrieve single borrow loan detail
   *
   * @param params Parameters containing the borrow loan ID
   * @returns Promise<APIResponse<{
   *   id: string;
   *   create_time: number;
   *   update_time: number;
   *   currency: string;
   *   amount: string;
   *   text: string;
   *   status: number;
   *   repaid: string;
   *   repaid_interest: string;
   *   unpaid_interest: string;
   * }>>
   */
  getSingleBorrowLoanDetail(params: { loan_id: string }): Promise<
    APIResponse<{
      id: string;
      create_time: number;
      update_time: number;
      currency: string;
      amount: string;
      text: string;
      status: number;
      repaid: string;
      repaid_interest: string;
      unpaid_interest: string;
    }>
  > {
    return this.getPrivate(`/margin/cross/loans/${params.loan_id}`);
  }
  /**
   * Cross margin repayments
   *
   * When the liquidity of the currency is insufficient and the transaction risk is high, the currency will be disabled, and funds cannot be transferred. When the available balance of cross-margin is insufficient, the balance of the spot account can be used for repayment. Please ensure that the balance of the spot account is sufficient, and system uses cross-margin account for repayment first.
   *
   * @param params Parameters for cross margin repayments
   * @returns Promise<APIResponse<{
   *   id: string;
   *   create_time: number;
   *   update_time: number;
   *   currency: string;
   *   amount: string;
   *   text?: string;
   *   status: number;
   *   repaid: string;
   *   repaid_interest: string;
   *   unpaid_interest: string;
   * }[]>>
   */
  crossMarginRepayments(params: { currency: string; amount: string }): Promise<
    APIResponse<
      {
        id: string;
        create_time: number;
        update_time: number;
        currency: string;
        amount: string;
        text?: string;
        status: number;
        repaid: string;
        repaid_interest: string;
        unpaid_interest: string;
      }[]
    >
  > {
    return this.postPrivate('/margin/cross/repayments', params);
  }

  /**
   * Retrieve cross margin repayments
   *
   * Sort by creation time in descending order by default. Set reverse=false to return ascending results.
   *
   * @param params Parameters for retrieving cross margin repayments
   * @returns Promise<APIResponse<{
   *   id: string;
   *   create_time: number;
   *   loan_id: string;
   *   currency: string;
   *   principal: string;
   *   interest: string;
   *   repayment_type: string;
   * }[]>>
   */
  retrieveCrossMarginRepayments(params?: {
    currency?: string;
    loan_id?: string;
    limit?: number;
    offset?: number;
    reverse?: boolean;
  }): Promise<
    APIResponse<
      {
        id: string;
        create_time: number;
        loan_id: string;
        currency: string;
        principal: string;
        interest: string;
        repayment_type: string;
      }[]
    >
  > {
    return this.getPrivate('/margin/cross/repayments', params);
  }

  /**
   * Interest records for the cross margin account
   *
   * @param params Parameters for retrieving interest records
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   currency_pair: string;
   *   actual_rate: string;
   *   interest: string;
   *   status: number;
   *   type: string;
   *   create_time: number;
   * }[]>>
   */
  getCrossMarginInterestRecords(params?: {
    currency?: string;
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        currency: string;
        currency_pair: string;
        actual_rate: string;
        interest: string;
        status: number;
        type: string;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate('/margin/cross/interest_records', params);
  }

  /**
   * Get the max transferable amount for a specific cross margin currency
   *
   * @param params Parameters for retrieving the max transferable amount
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   amount: string;
   * }>>
   */
  getCrossMarginTransferableAmount(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      amount: string;
    }>
  > {
    return this.getPrivate('/margin/cross/transferable', params);
  }

  /**
   * Estimated interest rates
   *
   * Please note that the interest rates are subject to change based on the borrowing and lending demand, and therefore, the provided rates may not be entirely accurate.
   *
   * @param params Parameters for retrieving estimated interest rates
   * @returns Promise<APIResponse<Record<string, string>>>
   */
  getEstimatedInterestRates(params: {
    currencies: string[];
  }): Promise<APIResponse<Record<string, string>>> {
    return this.getPrivate('/margin/cross/estimate_rate', params);
  }

  /**
   * Get the max borrowable amount for a specific cross margin currency
   *
   * @param params Parameters for retrieving the max borrowable amount
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   amount: string;
   * }>>
   */
  getCrossMarginBorrowableAmount(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      amount: string;
    }>
  > {
    return this.getPrivate('/margin/cross/borrowable', params);
  }

  /**==========================================================================================================================
   * MARGIN UNI
   * ==========================================================================================================================
   */
  /**==========================================================================================================================
   * WALLET
   * ==========================================================================================================================
   */

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
