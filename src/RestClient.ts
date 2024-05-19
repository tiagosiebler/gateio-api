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
  submitWithdraw(params: {
    body: {
      withdraw_order_id?: string;
      amount: string;
      currency: string;
      address?: string;
      memo?: string;
      chain: string;
    };
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
  getCurrencyChains(params: { currency: string }): Promise<
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
  createDepositAddress(params: { currency: string }): Promise<
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
  getWithdrawalRecords(params?: {
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
  getDepositRecords(params?: {
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
  submitTransfer(params: {
    body: {
      currency: string;
      from:
        | 'spot'
        | 'margin'
        | 'futures'
        | 'delivery'
        | 'cross_margin'
        | 'options';
      to:
        | 'spot'
        | 'margin'
        | 'futures'
        | 'delivery'
        | 'cross_margin'
        | 'options';
      amount: string;
      currency_pair?: string;
      settle?: string;
    };
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
  submitMainSubTransfer(params: {
    body: {
      currency: string;
      sub_account: string;
      direction: 'to' | 'from';
      amount: string;
      client_order_id?: string;
      sub_account_type?: 'spot' | 'futures' | 'cross_margin' | 'delivery';
    };
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
  getMainSubTransfers(params?: {
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
  getSubToSubTransfer(params: {
    body: {
      currency: string;
      sub_account_type?: string;
      sub_account_from: string;
      sub_account_from_type: 'spot' | 'futures' | 'delivery' | 'cross_margin';
      sub_account_to: string;
      sub_account_to_type: 'spot' | 'futures' | 'delivery' | 'cross_margin';
      amount: string;
    };
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
  getWithdrawalStatus(params?: { currency?: string }): Promise<
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
  getSubBalance(params?: { sub_uid?: string }): Promise<
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
  getSubMarginBalances(params?: { sub_uid?: string }): Promise<
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
  getSubFuturesBalances(params?: {
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
  getSubCrossMarginBalances(params?: { sub_uid?: string }): Promise<
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
  getSavedAddress(params: {
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
  getTradingFees(params?: {
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
  getSmallBalances(): Promise<
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
    body: {
      currency?: string[];
    };
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
  getSmallBalanceHistory(params?: {
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
    body: {
      remark?: string;
      login_name: string;
      password?: string;
      email?: string;
    };
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
  getSubAccounts(params?: { type?: string }): Promise<
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
    body: SubAccountKey;
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
  getSubAccountApiKeys(params: {
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
    body: SubAccountKey;
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
  getUnifiedMaxBorrow(params: { currency: string }): Promise<
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
  getUnifiedMaxTransferable(params: { currency: string }): Promise<
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
  submitUnifiedBorrowOrRepay(params: {
    body: {
      currency: string;
      type: 'borrow' | 'repay';
      amount: string;
      repaid_all?: boolean;
      text?: string;
    };
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
  getUnifiedLoans(params?: {
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
  getUnifiedLoanRecords(params?: {
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
  getUnifiedInterestRecords(params?: {
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
  getUnifiedRiskUnitDetails(): Promise<
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
    body: {
      mode: 'classic' | 'multi_currency' | 'portfolio';
      settings?: {
        usdt_futures?: boolean;
        spot_hedge?: boolean;
      };
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
  getUnifiedAccountMode(): Promise<
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
  getUnifiedCurrencyDiscountTiers(): Promise<
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
    body: {
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
    };
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
  getSpotCurrencies(): Promise<
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
  getSpotCurrency(params: { currency: string }): Promise<
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
  getSpotCurrencyPairs(): Promise<APIResponse<CurrencyPair[]>> {
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
  getSpotCurrencyPair(params: {
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
  getSpotTicker(params?: {
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
  getSpotOrderBook(params: {
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
  getSpotTrades(params: {
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
  getSpotCandlesticks(params: {
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
  getSpotFeeRates(params?: { currency_pair?: string }): Promise<
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
  getSpotBatchFeeRates(params: { currency_pairs: string }): Promise<
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
  getSpotAccounts(params?: { currency?: string }): Promise<
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
  getSpotAccountBook(params?: {
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
  submitSpotBatchOrders(params: { body: Order[] }): Promise<
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
  getSpotOpenOrders(params?: {
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
  submitSpotClosePosCrossDisabled(params: {
    body: {
      text?: string;
      currency_pair: string;
      amount: string;
      price: string;
      action_mode?: 'ACK' | 'RESULT' | 'FULL';
    };
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
  submitSpotOrder(params: { body: Order }): Promise<APIResponse<Order>> {
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
  getSpotOrders(params: {
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
  deleteSpotPairOpenOrders(params: {
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
  deleteSpotBatchOrders(params: { body: CancelBatchOrder[] }): Promise<
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
  getSpotOrder(params: {
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
  updateSpotOrder(params: {
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
  deleteSpotOrder(params: {
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
  getSpotTradingHistory(params?: {
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
  submitSpotCountdownOrders(params: {
    body: {
      timeout: number;
      currency_pair?: string;
    };
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
  updateSpotBatchOrders(params: {
    body: {
      order_id?: string;
      currency_pair?: string;
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
  submitSpotPriceTriggerOrder(params: {
    body: SpotPriceTriggeredOrder;
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
  getSpotAutoOrders(params: {
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
  deleteSpotAllOpenOrders(params?: {
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
  deleteSpotPriceTriggeredOrder(params: {
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
  getMarginAccounts(params?: { currency_pair?: string }): Promise<
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
  getMarginBalanceHistory(params?: {
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
  getFundingAccounts(params?: { currency?: string }): Promise<
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
  getAutoRepaymentSetting(): Promise<APIResponse<{ status: 'on' | 'off' }>> {
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
  getCrossMarginCurrencies(): Promise<
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
  getCrossMarginAccount(): Promise<
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
  getCrossMarginAccountHistory(params?: {
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
  submitCrossMarginBorrowLoan(params: {
    body: {
      currency: string;
      amount: string;
      text?: string;
    };
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
  getCrossMarginBorrowHistory(params: {
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
  getCrossMarginBorrowLoan(params: { loan_id: string }): Promise<
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
  submitCrossMarginRepayment(params: {
    body: { currency: string; amount: string };
  }): Promise<
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
  getCrossMarginRepayments(params?: {
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
  /**
   * List lending markets
   *
   * @returns Promise<APIResponse<{
   *   currency_pair: string;
   *   base_min_borrow_amount: string;
   *   quote_min_borrow_amount: string;
   *   leverage: string;
   * }[]>>
   */
  getLendingMarkets(): Promise<
    APIResponse<
      {
        currency_pair: string;
        base_min_borrow_amount: string;
        quote_min_borrow_amount: string;
        leverage: string;
      }[]
    >
  > {
    return this.get('/margin/uni/currency_pairs');
  }

  /**
   * Get detail of lending market
   *
   * @param params Parameters containing the currency pair
   * @returns Promise<APIResponse<{
   *   currency_pair: string;
   *   base_min_borrow_amount: string;
   *   quote_min_borrow_amount: string;
   *   leverage: string;
   * }>>
   */
  getLendingMarket(params: { currency_pair: string }): Promise<
    APIResponse<{
      currency_pair: string;
      base_min_borrow_amount: string;
      quote_min_borrow_amount: string;
      leverage: string;
    }>
  > {
    return this.get(`/margin/uni/currency_pairs/${params.currency_pair}`);
  }

  /**
   * Estimate interest rate
   *
   * Please note that the interest rates are subject to change based on the borrowing and lending demand, and therefore, the provided rates may not be entirely accurate.
   *
   * @param params Parameters for retrieving estimated interest rates
   * @returns Promise<APIResponse<Record<string, string>>>
   */
  estimateInterestRate(params: {
    currencies: string[];
  }): Promise<APIResponse<Record<string, string>>> {
    return this.getPrivate('/margin/uni/estimate_rate', params);
  }

  /**
   * Borrow or repay
   *
   * @param params Parameters for borrowing or repaying
   * @returns Promise<void>
   */
  submitMarginUNIBorrowOrRepay(params: {
    body: {
      currency: string;
      type: 'borrow' | 'repay';
      amount: string;
      repaid_all?: boolean;
      currency_pair: string;
    };
  }): Promise<void> {
    return this.postPrivate('/margin/uni/loans', params);
  }

  /**
   * List loans
   *
   * @param params Parameters for listing loans
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   currency_pair: string;
   *   amount: string;
   *   type: string;
   *   create_time: number;
   *   update_time: number;
   * }[]>>
   */
  getMarginUNILoans(params?: {
    currency_pair?: string;
    currency?: string;
    page?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        currency: string;
        currency_pair: string;
        amount: string;
        type: string;
        create_time: number;
        update_time: number;
      }[]
    >
  > {
    return this.getPrivate('/margin/uni/loans', params);
  }

  /**
   * Get loan records
   *
   * @param params Parameters for retrieving loan records
   * @returns Promise<APIResponse<{
   *   type: string;
   *   currency_pair: string;
   *   currency: string;
   *   amount: string;
   *   create_time: number;
   * }[]>>
   */
  getMarginUNILoanRecords(params?: {
    type?: 'borrow' | 'repay';
    currency?: string;
    currency_pair?: string;
    page?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        type: string;
        currency_pair: string;
        currency: string;
        amount: string;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate('/margin/uni/loan_records', params);
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
   *   type: string;
   *   create_time: number;
   * }[]>>
   */
  getMarginUNIInterestRecords(params?: {
    currency_pair?: string;
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
    return this.getPrivate('/margin/uni/interest_records', params);
  }

  /**
   * Get maximum borrowable
   *
   * @param params Parameters for retrieving the maximum borrowable amount
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   currency_pair: string;
   *   borrowable: string;
   * }>>
   */
  getMarginUNIMaxBorrow(params: {
    currency: string;
    currency_pair: string;
  }): Promise<
    APIResponse<{
      currency: string;
      currency_pair: string;
      borrowable: string;
    }>
  > {
    return this.getPrivate('/margin/uni/borrowable', params);
  }

  /**==========================================================================================================================
   * FLASH SWAP
   * ==========================================================================================================================
   */

  /**
   * List All Supported Currency Pairs In Flash Swap
   *
   * @param params Parameters for retrieving data of the specified currency
   * @returns Promise<APIResponse<{
   *   currency_pair: string;
   *   sell_currency: string;
   *   buy_currency: string;
   *   sell_min_amount: string;
   *   sell_max_amount: string;
   *   buy_min_amount: string;
   *   buy_max_amount: string;
   * }[]>>
   */
  getFlashSwapCurrencyPairs(params?: { currency?: string }): Promise<
    APIResponse<
      {
        currency_pair: string;
        sell_currency: string;
        buy_currency: string;
        sell_min_amount: string;
        sell_max_amount: string;
        buy_min_amount: string;
        buy_max_amount: string;
      }[]
    >
  > {
    return this.get('/flash_swap/currency_pairs', params);
  }

  /**
   * Create a flash swap order
   *
   * Initiate a flash swap preview in advance because order creation requires a preview result.
   *
   * @param params Parameters for creating a flash swap order
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   user_id: number;
   *   sell_currency: string;
   *   sell_amount: string;
   *   buy_currency: string;
   *   buy_amount: string;
   *   price: string;
   *   status: number;
   * }>>
   */
  submitFlashSwapOrder(params: {
    body: {
      preview_id: string;
      sell_currency: string;
      sell_amount: string;
      buy_currency: string;
      buy_amount: string;
    };
  }): Promise<
    APIResponse<{
      id: number;
      create_time: number;
      user_id: number;
      sell_currency: string;
      sell_amount: string;
      buy_currency: string;
      buy_amount: string;
      price: string;
      status: number;
    }>
  > {
    return this.postPrivate('/flash_swap/orders', params);
  }

  /**
   * List all flash swap orders
   *
   * @param params Parameters for listing flash swap orders
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   user_id: number;
   *   sell_currency: string;
   *   sell_amount: string;
   *   buy_currency: string;
   *   buy_amount: string;
   *   price: string;
   *   status: number;
   * }[]>>
   */
  getFlashSwapOrders(params?: {
    status?: number;
    sell_currency?: string;
    buy_currency?: string;
    reverse?: boolean;
    limit?: number;
    page?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        create_time: number;
        user_id: number;
        sell_currency: string;
        sell_amount: string;
        buy_currency: string;
        buy_amount: string;
        price: string;
        status: number;
      }[]
    >
  > {
    return this.getPrivate('/flash_swap/orders', params);
  }

  /**
   * Get a single flash swap order's detail
   *
   * @param params Parameters containing the flash swap order ID
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   user_id: number;
   *   sell_currency: string;
   *   sell_amount: string;
   *   buy_currency: string;
   *   buy_amount: string;
   *   price: string;
   *   status: number;
   * }>>
   */
  getFlashSwapOrder(params: { order_id: number }): Promise<
    APIResponse<{
      id: number;
      create_time: number;
      user_id: number;
      sell_currency: string;
      sell_amount: string;
      buy_currency: string;
      buy_amount: string;
      price: string;
      status: number;
    }>
  > {
    return this.getPrivate(`/flash_swap/orders/${params.order_id}`);
  }

  /**
   * Initiate a flash swap order preview
   *
   * @param params Parameters for initiating a flash swap order preview
   * @returns Promise<APIResponse<{
   *   preview_id: string;
   *   sell_currency: string;
   *   sell_amount: string;
   *   buy_currency: string;
   *   buy_amount: string;
   *   price: string;
   * }>>
   */
  submitFlashSwapOrderPreview(params: {
    body: {
      sell_currency: string;
      sell_amount?: string;
      buy_currency: string;
      buy_amount?: string;
    };
  }): Promise<
    APIResponse<{
      preview_id: string;
      sell_currency: string;
      sell_amount: string;
      buy_currency: string;
      buy_amount: string;
      price: string;
    }>
  > {
    return this.postPrivate('/flash_swap/orders/preview', params);
  }
  /**==========================================================================================================================
   * FUTURES
   * ==========================================================================================================================
   */

  /**
   * List all futures contracts
   *
   * @param params Parameters for listing futures contracts
   * @returns Promise<APIResponse<Contract[]>>
   */
  getFuturesContracts(params: {
    settle: 'btc' | 'usdt' | 'usd';
    limit?: number;
    offset?: number;
  }): Promise<APIResponse<Contract[]>> {
    return this.get(`/futures/${params.settle}/contracts`, params);
  }

  /**
   * Get a single contract
   *
   * @param params Parameters for retrieving a single contract
   * @returns Promise<APIResponse<Contract>>
   */
  getFuturesContract(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
  }): Promise<APIResponse<Contract>> {
    return this.get(
      `/futures/${params.settle}/contracts/${params.contract}`,
      params,
    );
  }

  /**
   * Futures order book
   *
   * Bids will be sorted by price from high to low, while asks sorted reversely.
   *
   * @param params Parameters for retrieving the futures order book
   * @returns Promise<APIResponse<{
   *   id?: number;
   *   current: number;
   *   update: number;
   *   asks: { p: string; s: number }[];
   *   bids: { p: string; s: number }[];
   * }>>
   */
  getFuturesOrderBook(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    interval?: string;
    limit?: number;
    with_id?: boolean;
  }): Promise<
    APIResponse<{
      id?: number;
      current: number;
      update: number;
      asks: { p: string; s: number }[];
      bids: { p: string; s: number }[];
    }>
  > {
    return this.get(`/futures/${params.settle}/order_book`, params);
  }

  /**
   * Futures trading history
   *
   * @param params Parameters for retrieving futures trading history
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   create_time_ms: number;
   *   contract: string;
   *   size: number;
   *   price: string;
   *   is_internal?: boolean;
   * }[]>>
   */
  getFuturesTrades(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    limit?: number;
    offset?: number;
    last_id?: string;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        create_time: number;
        create_time_ms: number;
        contract: string;
        size: number;
        price: string;
        is_internal?: boolean;
      }[]
    >
  > {
    return this.get(`/futures/${params.settle}/trades`, params);
  }

  /**
   * Get futures candlesticks
   *
   * Return specified contract candlesticks. If prefix contract with mark_, the contract's mark price candlesticks are returned; if prefix with index_, index price candlesticks will be returned.
   *
   * Maximum of 2000 points are returned in one query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving futures candlesticks
   * @returns Promise<APIResponse<{
   *   t: number;
   *   v?: number;
   *   c: string;
   *   h: string;
   *   l: string;
   *   o: string;
   *   sum: string;
   * }[]>>
   */
  getFuturesCandlesticks(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    from?: number;
    to?: number;
    limit?: number;
    interval?: string;
  }): Promise<
    APIResponse<
      {
        t: number;
        v?: number;
        c: string;
        h: string;
        l: string;
        o: string;
        sum: string;
      }[]
    >
  > {
    return this.get(`/futures/${params.settle}/candlesticks`, params);
  }

  /**
   * Premium Index K-Line
   *
   * Maximum of 1000 points can be returned in a query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving premium index K-Line
   * @returns Promise<APIResponse<{
   *   t: number;
   *   c: string;
   *   h: string;
   *   l: string;
   *   o: string;
   * }[]>>
   */
  getPremiumIndexKLine(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    from?: number;
    to?: number;
    limit?: number;
    interval?: string;
  }): Promise<
    APIResponse<
      {
        t: number;
        c: string;
        h: string;
        l: string;
        o: string;
      }[]
    >
  > {
    return this.get(`/futures/${params.settle}/premium_index`, params);
  }

  /**
   * List futures tickers
   *
   * @param params Parameters for listing futures tickers
   * @returns Promise<APIResponse<{
   *   contract: string;
   *   last: string;
   *   change_percentage: string;
   *   total_size: string;
   *   low_24h: string;
   *   high_24h: string;
   *   volume_24h: string;
   *   volume_24h_btc?: string;
   *   volume_24h_usd?: string;
   *   volume_24h_base: string;
   *   volume_24h_quote: string;
   *   volume_24h_settle: string;
   *   mark_price: string;
   *   funding_rate: string;
   *   funding_rate_indicative: string;
   *   index_price: string;
   *   quanto_base_rate?: string;
   *   basis_rate: string;
   *   basis_value: string;
   *   lowest_ask: string;
   *   highest_bid: string;
   * }[]>>
   */
  getFuturesTickers(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
  }): Promise<
    APIResponse<
      {
        contract: string;
        last: string;
        change_percentage: string;
        total_size: string;
        low_24h: string;
        high_24h: string;
        volume_24h: string;
        volume_24h_btc?: string;
        volume_24h_usd?: string;
        volume_24h_base: string;
        volume_24h_quote: string;
        volume_24h_settle: string;
        mark_price: string;
        funding_rate: string;
        funding_rate_indicative: string;
        index_price: string;
        quanto_base_rate?: string;
        basis_rate: string;
        basis_value: string;
        lowest_ask: string;
        highest_bid: string;
      }[]
    >
  > {
    return this.get(`/futures/${params.settle}/tickers`, params);
  }

  /**
   * Funding rate history
   *
   * @param params Parameters for retrieving funding rate history
   * @returns Promise<APIResponse<{
   *   t: number;
   *   r: string;
   * }[]>>
   */
  getFundingRates(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        t: number;
        r: string;
      }[]
    >
  > {
    return this.get(`/futures/${params.settle}/funding_rate`, params);
  }

  /**
   * Futures insurance balance history
   *
   * @param params Parameters for retrieving futures insurance balance history
   * @returns Promise<APIResponse<{
   *   t: number;
   *   b: string;
   * }[]>>
   */
  getFuturesInsuranceBalance(params: {
    settle: 'btc' | 'usdt' | 'usd';
    limit?: number;
  }): Promise<
    APIResponse<
      {
        t: number;
        b: string;
      }[]
    >
  > {
    return this.get(`/futures/${params.settle}/insurance`, params);
  }

  /**
   * Futures stats
   *
   * @param params Parameters for retrieving futures stats
   * @returns Promise<APIResponse<{
   *   time: number;
   *   lsr_taker: number;
   *   lsr_account: number;
   *   long_liq_size: number;
   *   long_liq_amount: number;
   *   long_liq_usd: number;
   *   short_liq_size: number;
   *   short_liq_amount: number;
   *   short_liq_usd: number;
   *   open_interest: number;
   *   open_interest_usd: number;
   *   top_lsr_account: number;
   *   top_lsr_size: number;
   * }[]>>
   */
  getFuturesStats(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    from?: number;
    interval?: string;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        lsr_taker: number;
        lsr_account: number;
        long_liq_size: number;
        long_liq_amount: number;
        long_liq_usd: number;
        short_liq_size: number;
        short_liq_amount: number;
        short_liq_usd: number;
        open_interest: number;
        open_interest_usd: number;
        top_lsr_account: number;
        top_lsr_size: number;
      }[]
    >
  > {
    return this.get(`/futures/${params.settle}/contract_stats`, params);
  }

  /**
   * Get index constituents
   *
   * @param params Parameters for retrieving index constituents
   * @returns Promise<APIResponse<{
   *   index: string;
   *   constituents: {
   *     exchange: string;
   *     symbols: string[];
   *   }[];
   * }>>
   */
  getIndexConstituents(params: {
    settle: 'btc' | 'usdt' | 'usd';
    index: string;
  }): Promise<
    APIResponse<{
      index: string;
      constituents: {
        exchange: string;
        symbols: string[];
      }[];
    }>
  > {
    return this.get(
      `/futures/${params.settle}/index_constituents/${params.index}`,
      params,
    );
  }

  /**
   * Retrieve liquidation history
   *
   * Interval between from and to cannot exceed 3600. Some private fields will not be returned in public endpoints. Refer to field description for detail.
   *
   * @param params Parameters for retrieving liquidation history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   size: number;
   *   order_price: string;
   *   fill_price: string;
   *   left: number;
   * }[]>>
   */
  getLiquidationHistory(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
    from?: number;
    to?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        size: number;
        order_price: string;
        fill_price: string;
        left: number;
      }[]
    >
  > {
    return this.get(`/futures/${params.settle}/liq_orders`, params);
  }

  /**
   * List risk limit tiers
   *
   * When the 'contract' parameter is not passed, the default is to query the risk limits for the top 100 markets.
   * 'Limit' and 'offset' correspond to pagination queries at the market level, not to the length of the returned array.
   * This only takes effect when the 'contract' parameter is empty.
   *
   * @param params Parameters for listing risk limit tiers
   * @returns Promise<APIResponse<{
   *   tier: number;
   *   risk_limit: string;
   *   initial_rate: string;
   *   maintenance_rate: string;
   *   leverage_max: string;
   *   contract: string;
   * }[]>>
   */
  getRiskLimitTiers(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    limit?: number;
    offset?: number;
  }): Promise<
    APIResponse<
      {
        tier: number;
        risk_limit: string;
        initial_rate: string;
        maintenance_rate: string;
        leverage_max: string;
        contract: string;
      }[]
    >
  > {
    return this.get(`/futures/${params.settle}/risk_limit_tiers`, params);
  }

  /**
   * Query futures account
   *
   * @param params Parameters for querying futures account
   * @returns Promise<APIResponse<{
   *   total: string;
   *   unrealised_pnl: string;
   *   position_margin: string;
   *   order_margin: string;
   *   available: string;
   *   point: string;
   *   currency: string;
   *   in_dual_mode: boolean;
   *   enable_credit: boolean;
   *   position_initial_margin: string;
   *   maintenance_margin: string;
   *   bonus: string;
   *   enable_evolved_classic: boolean;
   *   history: {
   *     dnw: string;
   *     pnl: string;
   *     fee: string;
   *     refr: string;
   *     fund: string;
   *     point_dnw: string;
   *     point_fee: string;
   *     point_refr: string;
   *     bonus_dnw: string;
   *     bonus_offset: string;
   *   };
   * }>>
   */
  getFuturesAccount(params: { settle: 'btc' | 'usdt' | 'usd' }): Promise<
    APIResponse<{
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
    }>
  > {
    return this.getPrivate(`/futures/${params.settle}/accounts`, params);
  }

  /**
   * Query account book
   *
   * If the contract field is provided, it can only filter records that include this field after 2023-10-30.
   *
   * @param params Parameters for querying account book
   * @returns Promise<APIResponse<{
   *   time: number;
   *   change: string;
   *   balance: string;
   *   type: string;
   *   text: string;
   *   contract?: string;
   *   trade_id: string;
   * }[]>>
   */
  getFuturesAccountBook(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
    type?:
      | 'dnw'
      | 'pnl'
      | 'fee'
      | 'refr'
      | 'fund'
      | 'point_dnw'
      | 'point_fee'
      | 'point_refr'
      | 'bonus_offset';
  }): Promise<
    APIResponse<
      {
        time: number;
        change: string;
        balance: string;
        type: string;
        text: string;
        contract?: string;
        trade_id: string;
      }[]
    >
  > {
    return this.getPrivate(`/futures/${params.settle}/account_book`, params);
  }

  /**
   * List all positions of a user
   *
   * @param params Parameters for listing all positions of a user
   * @returns Promise<APIResponse<Position[]>>
   */
  getFuturesPositions(params: {
    settle: 'btc' | 'usdt' | 'usd';
    holding?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<APIResponse<Position[]>> {
    return this.getPrivate(`/futures/${params.settle}/positions`, params);
  }

  /**
   * Get single position
   *
   * @param params Parameters for retrieving a single position
   * @returns Promise<APIResponse<Position>>
   */
  getFuturesPosition(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
  }): Promise<APIResponse<Position>> {
    return this.getPrivate(
      `/futures/${params.settle}/positions/${params.contract}`,
      params,
    );
  }

  /**
   * Update position margin
   *
   * @param params Parameters for updating position margin
   * @returns Promise<APIResponse<Position>>
   */
  updateFuturesMargin(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    change: string;
  }): Promise<APIResponse<Position>> {
    return this.postPrivate(
      `/futures/${params.settle}/positions/${params.contract}/margin`,
      params,
    );
  }

  /**
   * Update position leverage
   *
   * @param params Parameters for updating position leverage
   * @returns Promise<APIResponse<Position>>
   */
  updateFuturesLeverage(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    leverage: string;
    cross_leverage_limit?: string;
  }): Promise<APIResponse<Position>> {
    return this.postPrivate(
      `/futures/${params.settle}/positions/${params.contract}/leverage`,
      params,
    );
  }

  /**
   * Update position risk limit
   *
   * @param params Parameters for updating position risk limit
   * @returns Promise<APIResponse<Position>>
   */
  updatePositionRiskLimit(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    risk_limit: string;
  }): Promise<APIResponse<Position>> {
    return this.postPrivate(
      `/futures/${params.settle}/positions/${params.contract}/risk_limit`,
      params,
    );
  }

  /**
   * Enable or disable dual mode
   *
   * Before setting dual mode, make sure all positions are closed and no orders are open.
   *
   * @param params Parameters for enabling or disabling dual mode
   * @returns Promise<APIResponse<{
   *   total: string;
   *   unrealised_pnl: string;
   *   position_margin: string;
   *   order_margin: string;
   *   available: string;
   *   point: string;
   *   currency: string;
   *   in_dual_mode: boolean;
   *   enable_credit: boolean;
   *   position_initial_margin: string;
   *   maintenance_margin: string;
   *   bonus: string;
   *   enable_evolved_classic: boolean;
   *   history: {
   *     dnw: string;
   *     pnl: string;
   *     fee: string;
   *     refr: string;
   *     fund: string;
   *     point_dnw: string;
   *     point_fee: string;
   *     point_refr: string;
   *     bonus_dnw: string;
   *     bonus_offset: string;
   *   };
   * }>>
   */
  toggleFuturesDualMode(params: {
    settle: 'btc' | 'usdt' | 'usd';
    dual_mode: boolean;
  }): Promise<
    APIResponse<{
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
    }>
  > {
    return this.postPrivate(`/futures/${params.settle}/dual_mode`, params);
  }

  /**
   * Retrieve position detail in dual mode
   *
   * @param params Parameters for retrieving position detail in dual mode
   * @returns Promise<APIResponse<Position[]>>
   */
  getDualModePosition(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
  }): Promise<APIResponse<Position[]>> {
    return this.getPrivate(
      `/futures/${params.settle}/dual_comp/positions/${params.contract}`,
      params,
    );
  }

  /**
   * Update position margin in dual mode
   *
   * @param params Parameters for updating position margin in dual mode
   * @returns Promise<APIResponse<Position[]>>
   */
  updateDualModePositionMargin(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    change: string;
    dual_side: 'dual_long' | 'dual_short';
  }): Promise<APIResponse<Position[]>> {
    return this.postPrivate(
      `/futures/${params.settle}/dual_comp/positions/${params.contract}/margin`,
      params,
    );
  }

  /**
   * Update position leverage in dual mode
   *
   * @param params Parameters for updating position leverage in dual mode
   * @returns Promise<APIResponse<Position[]>>
   */
  updateDualModePositionLeverage(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    leverage: string;
    cross_leverage_limit?: string;
  }): Promise<APIResponse<Position[]>> {
    return this.postPrivate(
      `/futures/${params.settle}/dual_comp/positions/${params.contract}/leverage`,
      params,
    );
  }

  /**
   * Update position risk limit in dual mode
   *
   * @param params Parameters for updating position risk limit in dual mode
   * @returns Promise<APIResponse<Position[]>>
   */
  updateDualModePositionRiskLimit(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    risk_limit: string;
  }): Promise<APIResponse<Position[]>> {
    return this.postPrivate(
      `/futures/${params.settle}/dual_comp/positions/${params.contract}/risk_limit`,
      params,
    );
  }

  /**
   * Create a futures order
   *
   * Creating futures orders requires size, which is the number of contracts instead of currency amount. You can use quanto_multiplier in the contract detail response to know how much currency 1 size contract represents.
   * Zero-filled order cannot be retrieved 10 minutes after order cancellation. You will get a 404 not found for such orders.
   * Set reduce_only to true to keep the position from changing side when reducing position size.
   * In single position mode, to close a position, you need to set size to 0 and close to true.
   * In dual position mode, to close one side position, you need to set auto_size side, reduce_only to true, and size to 0.
   * Set stp_act to decide the strategy of self-trade prevention. For detailed usage, refer to the stp_act parameter in the request body.
   *
   * @param params Parameters for creating a futures order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  submitFuturesOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    body: FuturesOrder;
  }): Promise<APIResponse<FuturesOrder>> {
    return this.postPrivate(`/futures/${params.settle}/orders`, params);
  }

  /**
   * List futures orders
   *
   * Zero-fill order cannot be retrieved for 10 minutes after cancellation.
   * Historical orders, by default, only data within the past 6 months is supported. If you need to query data for a longer period, please use GET /futures/{settle}/orders_timerange.
   *
   * @param params Parameters for listing futures orders
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  getFuturesOrders(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
    status: string;
    limit?: number;
    offset?: number;
    last_id?: string;
  }): Promise<APIResponse<FuturesOrder[]>> {
    return this.getPrivate(`/futures/${params.settle}/orders`, params);
  }

  /**
   * Cancel all open orders matched
   *
   * Zero-filled order cannot be retrieved 10 minutes after order cancellation.
   *
   * @param params Parameters for cancelling all open orders matched
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  deleteAllFuturesOrders(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
    side?: string;
  }): Promise<APIResponse<FuturesOrder[]>> {
    return this.deletePrivate(`/futures/${params.settle}/orders`, params);
  }

  /**
   * List Futures Orders By Time Range
   *
   * @param params Parameters for listing futures orders by time range
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  getFuturesOrdersByTimeRange(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
    from?: number;
    to?: number;
    limit?: number;
    offset?: number;
  }): Promise<APIResponse<FuturesOrder[]>> {
    return this.getPrivate(
      `/futures/${params.settle}/orders_timerange`,
      params,
    );
  }

  /**
   * Create a batch of futures orders
   *
   * Up to 10 orders per request.
   * If any of the order's parameters are missing or in the wrong format, all of them will not be executed, and a http status 400 error will be returned directly.
   * If the parameters are checked and passed, all are executed. Even if there is a business logic error in the middle (such as insufficient funds), it will not affect other execution orders.
   * The returned result is in array format, and the order corresponds to the orders in the request body.
   * In the returned result, the succeeded field of type bool indicates whether the execution was successful or not.
   * If the execution is successful, the normal order content is included; if the execution fails, the label field is included to indicate the cause of the error.
   * In the rate limiting, each order is counted individually.
   *
   * @param params Parameters for creating a batch of futures orders
   * @returns Promise<APIResponse<{
   *   succeeded: boolean;
   *   label?: string;
   *   detail?: string;
   *   id: number;
   *   user: number;
   *   create_time: number;
   *   finish_time?: number;
   *   finish_as?: string;
   *   status: string;
   *   contract: string;
   *   size: number;
   *   iceberg: number;
   *   price: string;
   *   is_close: boolean;
   *   is_reduce_only: boolean;
   *   is_liq: boolean;
   *   tif: string;
   *   left: number;
   *   fill_price: string;
   *   text: string;
   *   tkfr: string;
   *   mkfr: string;
   *   refu: number;
   *   stp_act: string;
   *   stp_id: number;
   * }[]>>
   */
  submitFuturesBatchOrders(params: {
    settle: 'btc' | 'usdt' | 'usd';
    body: FuturesOrder[];
  }): Promise<
    APIResponse<
      {
        succeeded: boolean;
        label?: string;
        detail?: string;
        id: number;
        user: number;
        create_time: number;
        finish_time?: number;
        finish_as?: string;
        status: string;
        contract: string;
        size: number;
        iceberg: number;
        price: string;
        is_close: boolean;
        is_reduce_only: boolean;
        is_liq: boolean;
        tif: string;
        left: number;
        fill_price: string;
        text: string;
        tkfr: string;
        mkfr: string;
        refu: number;
        stp_act: string;
        stp_id: number;
      }[]
    >
  > {
    return this.postPrivate(`/futures/${params.settle}/batch_orders`, params);
  }

  /**
   * Get a single order
   *
   * Zero-fill order cannot be retrieved for 10 minutes after cancellation.
   * Historical orders, by default, only data within the past 6 months is supported.
   *
   * @param params Parameters for retrieving a single order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  getFuturesOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    order_id: string;
  }): Promise<APIResponse<FuturesOrder>> {
    return this.getPrivate(
      `/futures/${params.settle}/orders/${params.order_id}`,
      params,
    );
  }

  /**
   * Cancel a single order
   *
   * @param params Parameters for cancelling a single order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  deleteFuturesOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    order_id: string;
  }): Promise<APIResponse<FuturesOrder>> {
    return this.deletePrivate(
      `/futures/${params.settle}/orders/${params.order_id}`,
    );
  }

  /**
   * Amend an order
   *
   * @param params Parameters for amending an order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  updateFuturesOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    order_id: string;
    body: {
      size?: number;
      price?: string;
      amend_text?: string;
    };
  }): Promise<APIResponse<FuturesOrder>> {
    return this.putPrivate(
      `/futures/${params.settle}/orders/${params.order_id}`,
      params,
    );
  }

  /**
   * List personal trading history
   *
   * By default, only data within the past 6 months is supported. If you need to query data for a longer period, please use GET /futures/{settle}/my_trades_timerange.
   *
   * @param params Parameters for listing personal trading history
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   contract: string;
   *   order_id: string;
   *   size: number;
   *   price: string;
   *   role: 'taker' | 'maker';
   *   text: string;
   *   fee: string;
   *   point_fee: string;
   * }[]>>
   */
  getFuturesTradingHistory(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
    order?: number;
    limit?: number;
    offset?: number;
    last_id?: string;
  }): Promise<
    APIResponse<
      {
        id: number;
        create_time: number;
        contract: string;
        order_id: string;
        size: number;
        price: string;
        role: 'taker' | 'maker';
        text: string;
        fee: string;
        point_fee: string;
      }[]
    >
  > {
    return this.getPrivate(`/futures/${params.settle}/my_trades`, params);
  }

  /**
   * List position close history
   *
   * @param params Parameters for listing position close history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   side: 'long' | 'short';
   *   pnl: string;
   *   pnl_pnl: string;
   *   pnl_fund: string;
   *   pnl_fee: string;
   *   text: string;
   *   max_size: string;
   *   first_open_time: number;
   *   long_price: string;
   *   short_price: string;
   * }[]>>
   */
  getFuturesPositionHistory(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
    side?: 'long' | 'short';
    pnl?: string;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        side: 'long' | 'short';
        pnl: string;
        pnl_pnl: string;
        pnl_fund: string;
        pnl_fee: string;
        text: string;
        max_size: string;
        first_open_time: number;
        long_price: string;
        short_price: string;
      }[]
    >
  > {
    return this.getPrivate(`/futures/${params.settle}/position_close`, params);
  }

  /**
   * List liquidation history
   *
   * @param params Parameters for listing liquidation history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   leverage: string;
   *   size: number;
   *   margin: string;
   *   entry_price: string;
   *   liq_price: string;
   *   mark_price: string;
   *   order_id: number;
   *   order_price: string;
   *   fill_price: string;
   *   left: number;
   * }[]>>
   */
  getFuturesLiquidationHistory(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
    limit?: number;
    at?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        leverage: string;
        size: number;
        margin: string;
        entry_price: string;
        liq_price: string;
        mark_price: string;
        order_id: number;
        order_price: string;
        fill_price: string;
        left: number;
      }[]
    >
  > {
    return this.getPrivate(`/futures/${params.settle}/liquidates`, params);
  }

  /**
   * List Auto-Deleveraging History
   *
   * @param params Parameters for listing auto-deleveraging history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   user: number;
   *   order_id: number;
   *   contract: string;
   *   leverage: string;
   *   cross_leverage_limit: string;
   *   entry_price: string;
   *   fill_price: string;
   *   trade_size: number;
   *   position_size: number;
   * }[]>>
   */
  getFuturesAutoDeleveragingHistory(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
    limit?: number;
    at?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        user: number;
        order_id: number;
        contract: string;
        leverage: string;
        cross_leverage_limit: string;
        entry_price: string;
        fill_price: string;
        trade_size: number;
        position_size: number;
      }[]
    >
  > {
    return this.getPrivate(
      `/futures/${params.settle}/auto_deleverages`,
      params,
    );
  }

  /**
   * Countdown cancel orders
   *
   * When the timeout set by the user is reached, if there is no cancel or set a new countdown, the related pending orders will be automatically cancelled. This endpoint can be called repeatedly to set a new countdown or cancel the countdown.
   * For example, call this endpoint at 30s intervals, each countdown timeout is set to 30s. If this endpoint is not called again within 30 seconds, all pending orders on the specified market will be automatically cancelled, if no market is specified, all market pending orders will be cancelled.
   * If the timeout is set to 0 within 30 seconds, the countdown timer will expire and the cancel function will be cancelled.
   *
   * @param params Parameters for setting countdown cancel orders
   * @returns Promise<APIResponse<{ triggerTime: number }>>
   */
  deleteFuturesOrdersCountdown(params: {
    settle: 'btc' | 'usdt' | 'usd';
    body: {
      timeout: number;
      contract?: string;
    };
  }): Promise<APIResponse<{ triggerTime: number }>> {
    return this.postPrivate(
      `/futures/${params.settle}/countdown_cancel_all`,
      params,
    );
  }

  /**
   * Query user trading fee rates
   *
   * @param params Parameters for querying user trading fee rates
   * @returns Promise<APIResponse<Record<string, { taker_fee: string; maker_fee: string }>>>
   */
  getFuturesUserTradingFees(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
  }): Promise<
    APIResponse<Record<string, { taker_fee: string; maker_fee: string }>>
  > {
    return this.getPrivate(`/futures/${params.settle}/fee`, params);
  }

  /**
   * Cancel a batch of orders with an ID list
   *
   * Multiple distinct order ID list can be specified. Each request can cancel a maximum of 20 records.
   *
   * @param params Parameters for cancelling a batch of orders with an ID list
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   id: string;
   *   succeeded: boolean;
   *   message: string;
   * }[]>>
   */
  deleteFuturesBatchOrders(params: {
    settle: 'btc' | 'usdt' | 'usd';
    body: string[];
  }): Promise<
    APIResponse<
      {
        user_id: number;
        id: string;
        succeeded: boolean;
        message: string;
      }[]
    >
  > {
    return this.postPrivate(
      `/futures/${params.settle}/batch_cancel_orders`,
      params,
    );
  }

  /**
   * Create a price-triggered order
   *
   * @param params Parameters for creating a price-triggered order
   * @returns Promise<APIResponse<{ id: number }>>
   */
  submitFuturesPriceTriggeredOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    body: FuturesPriceTriggeredOrder;
  }): Promise<APIResponse<{ id: number }>> {
    return this.postPrivate(`/futures/${params.settle}/price_orders`, params);
  }

  /**
   * List all auto orders
   *
   * @param params Parameters for listing all auto orders
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder[]>>
   */
  getFuturesAutoOrders(params: {
    settle: 'btc' | 'usdt' | 'usd';
    status: 'open' | 'finished';
    contract?: string;
    limit?: number;
    offset?: number;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder[]>> {
    return this.getPrivate(`/futures/${params.settle}/price_orders`, params);
  }

  /**
   * Cancel all open orders
   *
   * @param params Parameters for cancelling all open orders
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder[]>>
   */
  deleteFuturesAllOpenOrders(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder[]>> {
    return this.deletePrivate(`/futures/${params.settle}/price_orders`, params);
  }

  /**
   * Get a price-triggered order
   *
   * @param params Parameters for retrieving a price-triggered order
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder>>
   */
  getFuturesPriceTriggeredOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    order_id: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder>> {
    return this.getPrivate(
      `/futures/${params.settle}/price_orders/${params.order_id}`,
      params,
    );
  }

  /**
   * Cancel a price-triggered order
   *
   * @param params Parameters for cancelling a price-triggered order
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder>>
   */
  deleteFuturesPriceTriggeredOrder(params: {
    settle: 'btc' | 'usdt' | 'usd';
    order_id: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder>> {
    return this.deletePrivate(
      `/futures/${params.settle}/price_orders/${params.order_id}`,
      params,
    );
  }
  /**==========================================================================================================================
   * DELIVERY
   * ==========================================================================================================================
   */

  /**
   * List all futures contracts
   *
   * @param params Parameters for listing all futures contracts
   * @returns Promise<APIResponse<DeliveryContract[]>>
   */
  getAllDeliveryContracts(params: {
    settle: 'usdt';
  }): Promise<APIResponse<DeliveryContract[]>> {
    return this.get(`/delivery/${params.settle}/contracts`, params);
  }

  /**
   * Get a single contract
   *
   * @param params Parameters for retrieving a single contract
   * @returns Promise<APIResponse<DeliveryContract>>
   */
  getDeliveryContract(params: {
    settle: 'usdt';
    contract: string;
  }): Promise<APIResponse<DeliveryContract>> {
    return this.get(
      `/delivery/${params.settle}/contracts/${params.contract}`,
      params,
    );
  }

  /**
   * Futures order book
   *
   * Bids will be sorted by price from high to low, while asks sorted reversely
   *
   * @param params Parameters for retrieving the futures order book
   * @returns Promise<APIResponse<{
   *   id?: number;
   *   current: number;
   *   update: number;
   *   asks: { p: string; s: number }[];
   *   bids: { p: string; s: number }[];
   * }>>
   */
  getDeliveryOrderBook(params: {
    settle: 'usdt';
    contract: string;
    interval?: '0' | '0.1' | '0.01';
    limit?: number;
    with_id?: boolean;
  }): Promise<
    APIResponse<{
      id?: number;
      current: number;
      update: number;
      asks: { p: string; s: number }[];
      bids: { p: string; s: number }[];
    }>
  > {
    return this.get(`/delivery/${params.settle}/order_book`, params);
  }

  /**
   * Futures trading history
   *
   * @param params Parameters for retrieving the futures trading history
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   create_time_ms: number;
   *   contract: string;
   *   size: number;
   *   price: string;
   *   is_internal?: boolean;
   * }[]>>
   */
  getDeliveryTrades(params: {
    settle: 'usdt';
    contract: string;
    limit?: number;
    last_id?: string;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        create_time: number;
        create_time_ms: number;
        contract: string;
        size: number;
        price: string;
        is_internal?: boolean;
      }[]
    >
  > {
    return this.get(`/delivery/${params.settle}/trades`, params);
  }

  /**
   * Get futures candlesticks
   *
   * Return specified contract candlesticks. If prefix contract with mark_, the contract's mark price candlesticks are returned; if prefix with index_, index price candlesticks will be returned.
   * Maximum of 2000 points are returned in one query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving futures candlesticks
   * @returns Promise<APIResponse<{
   *   t: number;
   *   v?: number;
   *   c: string;
   *   h: string;
   *   l: string;
   *   o: string;
   * }[]>>
   */
  getDeliveryCandlesticks(params: {
    settle: 'usdt';
    contract: string;
    from?: number;
    to?: number;
    limit?: number;
    interval?:
      | '10s'
      | '30s'
      | '1m'
      | '5m'
      | '15m'
      | '30m'
      | '1h'
      | '2h'
      | '4h'
      | '6h'
      | '8h'
      | '12h'
      | '1d'
      | '7d'
      | '1w'
      | '30d';
  }): Promise<
    APIResponse<
      {
        t: number;
        v?: number;
        c: string;
        h: string;
        l: string;
        o: string;
      }[]
    >
  > {
    return this.get(`/delivery/${params.settle}/candlesticks`, params);
  }

  /**
   * List futures tickers
   *
   * @param params Parameters for listing futures tickers
   * @returns Promise<APIResponse<{
   *   contract: string;
   *   last: string;
   *   change_percentage: string;
   *   total_size: string;
   *   low_24h: string;
   *   high_24h: string;
   *   volume_24h: string;
   *   volume_24h_btc?: string;
   *   volume_24h_usd?: string;
   *   volume_24h_base: string;
   *   volume_24h_quote: string;
   *   volume_24h_settle: string;
   *   mark_price: string;
   *   funding_rate: string;
   *   funding_rate_indicative: string;
   *   index_price: string;
   *   quanto_base_rate?: string;
   *   basis_rate: string;
   *   basis_value: string;
   *   lowest_ask: string;
   *   highest_bid: string;
   * }[]>>
   */
  getDeliveryTickers(params: { settle: 'usdt'; contract?: string }): Promise<
    APIResponse<
      {
        contract: string;
        last: string;
        change_percentage: string;
        total_size: string;
        low_24h: string;
        high_24h: string;
        volume_24h: string;
        volume_24h_btc?: string;
        volume_24h_usd?: string;
        volume_24h_base: string;
        volume_24h_quote: string;
        volume_24h_settle: string;
        mark_price: string;
        funding_rate: string;
        funding_rate_indicative: string;
        index_price: string;
        quanto_base_rate?: string;
        basis_rate: string;
        basis_value: string;
        lowest_ask: string;
        highest_bid: string;
      }[]
    >
  > {
    return this.get(`/delivery/${params.settle}/tickers`, params);
  }

  /**
   * Futures insurance balance history
   *
   * @param params Parameters for retrieving the futures insurance balance history
   * @returns Promise<APIResponse<{
   *   t: number;
   *   b: string;
   * }[]>>
   */
  getDeliveryInsuranceBalanceHistory(params: {
    settle: 'usdt';
    limit?: number;
  }): Promise<
    APIResponse<
      {
        t: number;
        b: string;
      }[]
    >
  > {
    return this.get(`/delivery/${params.settle}/insurance`, params);
  }

  /**
   * Query futures account
   *
   * @param params Parameters for querying futures account
   * @returns Promise<APIResponse<{
   *   total: string;
   *   unrealised_pnl: string;
   *   position_margin: string;
   *   order_margin: string;
   *   available: string;
   *   point: string;
   *   currency: string;
   *   in_dual_mode: boolean;
   *   enable_credit: boolean;
   *   position_initial_margin: string;
   *   maintenance_margin: string;
   *   bonus: string;
   *   enable_evolved_classic: boolean;
   *   history: {
   *     dnw: string;
   *     pnl: string;
   *     fee: string;
   *     refr: string;
   *     fund: string;
   *     point_dnw: string;
   *     point_fee: string;
   *     point_refr: string;
   *     bonus_dnw: string;
   *     bonus_offset: string;
   *   };
   * }>>
   */
  getDeliveryAccount(params: { settle: 'usdt' }): Promise<
    APIResponse<{
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
    }>
  > {
    return this.getPrivate(`/delivery/${params.settle}/accounts`, params);
  }

  /**
   * Query account book
   *
   * @param params Parameters for querying account book
   * @returns Promise<APIResponse<{
   *   time: number;
   *   change: string;
   *   balance: string;
   *   type: 'dnw' | 'pnl' | 'fee' | 'refr' | 'fund' | 'point_dnw' | 'point_fee' | 'point_refr' | 'bonus_offset';
   *   text: string;
   *   contract?: string;
   *   trade_id?: string;
   * }[]>>
   */
  getDeliveryBook(params: {
    settle: 'usdt';
    limit?: number;
    from?: number;
    to?: number;
    type?:
      | 'dnw'
      | 'pnl'
      | 'fee'
      | 'refr'
      | 'fund'
      | 'point_dnw'
      | 'point_fee'
      | 'point_refr'
      | 'bonus_offset';
  }): Promise<
    APIResponse<
      {
        time: number;
        change: string;
        balance: string;
        type:
          | 'dnw'
          | 'pnl'
          | 'fee'
          | 'refr'
          | 'fund'
          | 'point_dnw'
          | 'point_fee'
          | 'point_refr'
          | 'bonus_offset';
        text: string;
        contract?: string;
        trade_id?: string;
      }[]
    >
  > {
    return this.getPrivate(`/delivery/${params.settle}/account_book`, params);
  }

  /**
   * List all positions of a user
   *
   * @param params Parameters for listing all positions of a user
   * @returns Promise<APIResponse<Position[]>>
   */
  getDeliveryPositions(params: {
    settle: 'usdt';
  }): Promise<APIResponse<Position[]>> {
    return this.getPrivate(`/delivery/${params.settle}/positions`, params);
  }

  /**
   * Get single position
   *
   * @param params Parameters for retrieving a single position
   * @returns Promise<APIResponse<Position>>
   */
  getDeliveryPosition(params: {
    settle: 'usdt';
    contract: string;
  }): Promise<APIResponse<Position>> {
    return this.getPrivate(
      `/delivery/${params.settle}/positions/${params.contract}`,
      params,
    );
  }

  /**
   * Update position margin
   *
   * @param params Parameters for updating position margin
   * @returns Promise<APIResponse<Position>>
   */
  updateDeliveryMargin(params: {
    settle: 'usdt';
    contract: string;
    change: string;
  }): Promise<APIResponse<Position>> {
    return this.postPrivate(
      `/delivery/${params.settle}/positions/${params.contract}/margin`,
      params,
    );
  }

  /**
   * Update position leverage
   *
   * @param params Parameters for updating position leverage
   * @returns Promise<APIResponse<Position>>
   */
  updateDeliveryLeverage(params: {
    settle: 'usdt';
    contract: string;
    leverage: string;
  }): Promise<APIResponse<Position>> {
    return this.postPrivate(
      `/delivery/${params.settle}/positions/${params.contract}/leverage`,
      params,
    );
  }

  /**
   * Update position risk limit
   *
   * @param params Parameters for updating position risk limit
   * @returns Promise<APIResponse<Position>>
   */
  updateDeliveryRiskLimit(params: {
    settle: 'usdt';
    contract: string;
    risk_limit: string;
  }): Promise<APIResponse<Position>> {
    return this.postPrivate(
      `/delivery/${params.settle}/positions/${params.contract}/risk_limit`,
      params,
    );
  }

  /**
   * Create a futures order
   *
   * Zero-filled order cannot be retrieved 10 minutes after order cancellation
   *
   * @param params Parameters for creating a futures order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  submitDeliveryOrder(params: {
    settle: 'usdt';
    body: FuturesOrder;
  }): Promise<APIResponse<FuturesOrder>> {
    return this.postPrivate(`/delivery/${params.settle}/orders`, params);
  }

  /**
   * List futures orders
   *
   * Zero-fill order cannot be retrieved 10 minutes after order cancellation.
   *
   * @param params Parameters for listing futures orders
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  getDeliveryOrders(params: {
    settle: 'usdt';
    contract?: string;
    status: 'open' | 'finished';
    limit?: number;
    offset?: number;
    last_id?: string;
    count_total?: 0 | 1;
  }): Promise<APIResponse<FuturesOrder[]>> {
    return this.getPrivate(`/delivery/${params.settle}/orders`, params);
  }

  /**
   * Cancel all open orders matched
   *
   * Zero-filled order cannot be retrieved 10 minutes after order cancellation
   *
   * @param params Parameters for cancelling all open orders matched
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  deleteAllDeliveryOrders(params: {
    settle: 'usdt';
    contract: string;
    side?: 'ask' | 'bid';
  }): Promise<APIResponse<FuturesOrder[]>> {
    return this.deletePrivate(`/delivery/${params.settle}/orders`, params);
  }

  /**
   * Get a single order
   *
   * Zero-filled order cannot be retrieved 10 minutes after order cancellation
   *
   * @param params Parameters for retrieving a single order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  getDeliveryOrder(params: {
    settle: 'usdt';
    order_id: string;
  }): Promise<APIResponse<FuturesOrder>> {
    return this.getPrivate(
      `/delivery/${params.settle}/orders/${params.order_id}`,
    );
  }

  /**
   * Cancel a single order
   *
   * @param params Parameters for cancelling a single order
   * @returns Promise<APIResponse<FuturesOrder>>
   */
  deleteDeliveryOrder(params: {
    settle: 'usdt';
    order_id: string;
  }): Promise<APIResponse<FuturesOrder>> {
    return this.deletePrivate(
      `/delivery/${params.settle}/orders/${params.order_id}`,
    );
  }

  /**
   * List personal trading history
   *
   * @param params Parameters for listing personal trading history
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   contract: string;
   *   order_id: string;
   *   size: number;
   *   price: string;
   *   role: 'taker' | 'maker';
   *   text: string;
   *   fee: string;
   *   point_fee: string;
   * }[]>>
   */
  getDeliveryTradingHistory(params: {
    settle: 'usdt';
    contract?: string;
    order?: number;
    limit?: number;
    offset?: number;
    last_id?: string;
    count_total?: 0 | 1;
  }): Promise<
    APIResponse<
      {
        id: number;
        create_time: number;
        contract: string;
        order_id: string;
        size: number;
        price: string;
        role: 'taker' | 'maker';
        text: string;
        fee: string;
        point_fee: string;
      }[]
    >
  > {
    return this.getPrivate(`/delivery/${params.settle}/my_trades`, params);
  }

  /**
   * List position close history
   *
   * @param params Parameters for listing position close history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   side: 'long' | 'short';
   *   pnl: string;
   *   pnl_pnl: string;
   *   pnl_fund: string;
   *   pnl_fee: string;
   *   text: string;
   *   max_size: string;
   *   first_open_time: number;
   *   long_price: string;
   *   short_price: string;
   * }[]>>
   */
  getDeliveryClosedPositions(params: {
    settle: 'usdt';
    contract?: string;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        side: 'long' | 'short';
        pnl: string;
        pnl_pnl: string;
        pnl_fund: string;
        pnl_fee: string;
        text: string;
        max_size: string;
        first_open_time: number;
        long_price: string;
        short_price: string;
      }[]
    >
  > {
    return this.getPrivate(`/delivery/${params.settle}/position_close`, params);
  }

  /**
   * List liquidation history
   *
   * @param params Parameters for listing liquidation history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   leverage?: string;
   *   size: number;
   *   margin?: string;
   *   entry_price?: string;
   *   liq_price?: string;
   *   mark_price?: string;
   *   order_id?: number;
   *   order_price: string;
   *   fill_price: string;
   *   left: number;
   * }[]>>
   */
  getDeliveryLiquidationHistory(params: {
    settle: 'usdt';
    contract?: string;
    limit?: number;
    at?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        leverage?: string;
        size: number;
        margin?: string;
        entry_price?: string;
        liq_price?: string;
        mark_price?: string;
        order_id?: number;
        order_price: string;
        fill_price: string;
        left: number;
      }[]
    >
  > {
    return this.getPrivate(`/delivery/${params.settle}/liquidates`, params);
  }

  /**
   * List settlement history
   *
   * @param params Parameters for listing settlement history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   leverage: string;
   *   size: number;
   *   margin: string;
   *   entry_price: string;
   *   settle_price: string;
   *   profit: string;
   *   fee: string;
   * }[]>>
   */
  getDeliverySettlementHistory(params: {
    settle: 'usdt';
    contract?: string;
    limit?: number;
    at?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        leverage: string;
        size: number;
        margin: string;
        entry_price: string;
        settle_price: string;
        profit: string;
        fee: string;
      }[]
    >
  > {
    return this.getPrivate(`/delivery/${params.settle}/settlements`, params);
  }

  /**
   * Create a price-triggered order
   *
   * @param params Parameters for creating a price-triggered order
   * @returns Promise<APIResponse<{ id: number }>>
   */
  submitDeliveryTriggeredOrder(params: {
    settle: 'usdt';
    body: FuturesPriceTriggeredOrder;
  }): Promise<APIResponse<{ id: number }>> {
    return this.postPrivate(`/delivery/${params.settle}/price_orders`, params);
  }

  /**
   * List all auto orders
   *
   * @param params Parameters for listing all auto orders
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder[]>>
   */
  getDeliveryAutoOrders(params: {
    settle: 'usdt';
    status: 'open' | 'finished';
    contract?: string;
    limit?: number;
    offset?: number;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder[]>> {
    return this.getPrivate(`/delivery/${params.settle}/price_orders`, params);
  }

  /**
   * Cancel all open orders
   *
   * @param params Parameters for cancelling all open orders
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder[]>>
   */
  deleteDeliveryOrders(params: {
    settle: 'usdt';
    contract: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder[]>> {
    return this.deletePrivate(
      `/delivery/${params.settle}/price_orders`,
      params,
    );
  }

  /**
   * Get a price-triggered order
   *
   * @param params Parameters for retrieving a price-triggered order
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder>>
   */
  getDeliveryTriggeredOrder(params: {
    settle: 'usdt';
    order_id: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder>> {
    return this.getPrivate(
      `/delivery/${params.settle}/price_orders/${params.order_id}`,
      params,
    );
  }

  /**
   * Cancel a price-triggered order
   *
   * @param params Parameters for cancelling a price-triggered order
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder>>
   */
  deleteDeliveryTriggeredOrder(params: {
    settle: 'usdt';
    order_id: string;
  }): Promise<APIResponse<FuturesPriceTriggeredOrder>> {
    return this.deletePrivate(
      `/delivery/${params.settle}/price_orders/${params.order_id}`,
    );
  }

  /**==========================================================================================================================
   * OPTIONS
   * ==========================================================================================================================
   */

  /**
   * List all underlyings
   *
   * @returns Promise<APIResponse<{ name: string; index_price: string }[]>>
   */
  getOptionsUnderlyings(): Promise<
    APIResponse<{ name: string; index_price: string }[]>
  > {
    return this.get(`/options/underlyings`);
  }

  /**
   * List all expiration times
   *
   * @param params Parameters for listing expiration times
   * @returns Promise<APIResponse<number[]>>
   */
  getOptionsExpirationTimes(params: {
    underlying: string;
  }): Promise<APIResponse<number[]>> {
    return this.get(`/options/expirations`, params);
  }

  /**
   * List all the contracts with specified underlying and expiration time
   *
   * @param params Parameters for listing contracts
   * @returns Promise<APIResponse<{
   *   name: string;
   *   tag: string;
   *   create_time: number;
   *   expiration_time: number;
   *   is_call: boolean;
   *   strike_price: string;
   *   last_price: string;
   *   mark_price: string;
   *   orderbook_id: number;
   *   trade_id: number;
   *   trade_size: number;
   *   position_size: number;
   *   underlying: string;
   *   underlying_price: string;
   *   multiplier: string;
   *   order_price_round: string;
   *   mark_price_round: string;
   *   maker_fee_rate: string;
   *   taker_fee_rate: string;
   *   price_limit_fee_rate: string;
   *   ref_discount_rate: string;
   *   ref_rebate_rate: string;
   *   order_price_deviate: string;
   *   order_size_min: number;
   *   order_size_max: number;
   *   orders_limit: number;
   * }[]>>
   */
  getOptionsContracts(params: {
    underlying: string;
    expiration?: number;
  }): Promise<
    APIResponse<
      {
        name: string;
        tag: string;
        create_time: number;
        expiration_time: number;
        is_call: boolean;
        strike_price: string;
        last_price: string;
        mark_price: string;
        orderbook_id: number;
        trade_id: number;
        trade_size: number;
        position_size: number;
        underlying: string;
        underlying_price: string;
        multiplier: string;
        order_price_round: string;
        mark_price_round: string;
        maker_fee_rate: string;
        taker_fee_rate: string;
        price_limit_fee_rate: string;
        ref_discount_rate: string;
        ref_rebate_rate: string;
        order_price_deviate: string;
        order_size_min: number;
        order_size_max: number;
        orders_limit: number;
      }[]
    >
  > {
    return this.get(`/options/contracts`, params);
  }

  /**
   * Query specified contract detail
   *
   * @param params Parameters for querying specified contract detail
   * @returns Promise<APIResponse<{
   *   name: string;
   *   tag: string;
   *   create_time: number;
   *   expiration_time: number;
   *   is_call: boolean;
   *   strike_price: string;
   *   last_price: string;
   *   mark_price: string;
   *   orderbook_id: number;
   *   trade_id: number;
   *   trade_size: number;
   *   position_size: number;
   *   underlying: string;
   *   underlying_price: string;
   *   multiplier: string;
   *   order_price_round: string;
   *   mark_price_round: string;
   *   maker_fee_rate: string;
   *   taker_fee_rate: string;
   *   price_limit_fee_rate: string;
   *   ref_discount_rate: string;
   *   ref_rebate_rate: string;
   *   order_price_deviate: string;
   *   order_size_min: number;
   *   order_size_max: number;
   *   orders_limit: number;
   * }>>
   */
  getOptionsContract(params: { contract: string }): Promise<
    APIResponse<{
      name: string;
      tag: string;
      create_time: number;
      expiration_time: number;
      is_call: boolean;
      strike_price: string;
      last_price: string;
      mark_price: string;
      orderbook_id: number;
      trade_id: number;
      trade_size: number;
      position_size: number;
      underlying: string;
      underlying_price: string;
      multiplier: string;
      order_price_round: string;
      mark_price_round: string;
      maker_fee_rate: string;
      taker_fee_rate: string;
      price_limit_fee_rate: string;
      ref_discount_rate: string;
      ref_rebate_rate: string;
      order_price_deviate: string;
      order_size_min: number;
      order_size_max: number;
      orders_limit: number;
    }>
  > {
    return this.get(`/options/contracts/${params.contract}`, params);
  }

  /**
   * List settlement history
   *
   * @param params Parameters for listing settlement history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   profit: string;
   *   fee: string;
   *   strike_price: string;
   *   settle_price: string;
   * }[]>>
   */
  getOptionsSettlementHistory(params: {
    underlying: string;
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        profit: string;
        fee: string;
        strike_price: string;
        settle_price: string;
      }[]
    >
  > {
    return this.get(`/options/settlements`, params);
  }

  /**
   * Get specified contract's settlement
   *
   * @param params Parameters for retrieving specified contract's settlement
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   profit: string;
   *   fee: string;
   *   strike_price: string;
   *   settle_price: string;
   * }>>
   */
  getOptionsContractSettlement(params: {
    contract: string;
    underlying: string;
    at: number;
  }): Promise<
    APIResponse<{
      time: number;
      contract: string;
      profit: string;
      fee: string;
      strike_price: string;
      settle_price: string;
    }>
  > {
    return this.get(`/options/settlements/${params.contract}`, params);
  }

  /**
   * List my options settlements
   *
   * @param params Parameters for listing my options settlements
   * @returns Promise<APIResponse<{
   *   time: number;
   *   underlying: string;
   *   contract: string;
   *   strike_price: string;
   *   settle_price: string;
   *   size: number;
   *   settle_profit: string;
   *   fee: string;
   *   realised_pnl: string;
   * }[]>>
   */
  getOptionsMySettlements(params: {
    underlying: string;
    contract?: string;
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        time: number;
        underlying: string;
        contract: string;
        strike_price: string;
        settle_price: string;
        size: number;
        settle_profit: string;
        fee: string;
        realised_pnl: string;
      }[]
    >
  > {
    return this.getPrivate(`/options/my_settlements`, params);
  }

  /**
   * Options order book
   *
   * Bids will be sorted by price from high to low, while asks sorted reversely
   *
   * @param params Parameters for retrieving options order book
   * @returns Promise<APIResponse<{
   *   id?: number;
   *   current: number;
   *   update: number;
   *   asks: { p: string; s: number }[];
   *   bids: { p: string; s: number }[];
   * }>>
   */
  getOptionsOrderBook(params: {
    contract: string;
    interval?: '0' | '0.1' | '0.01';
    limit?: number;
    with_id?: boolean;
  }): Promise<
    APIResponse<{
      id?: number;
      current: number;
      update: number;
      asks: { p: string; s: number }[];
      bids: { p: string; s: number }[];
    }>
  > {
    return this.get(`/options/order_book`, params);
  }

  /**
   * List tickers of options contracts
   *
   * @param params Parameters for listing tickers of options contracts
   * @returns Promise<APIResponse<{
   *   name: string;
   *   last_price: string;
   *   mark_price: string;
   *   index_price: string;
   *   ask1_size: number;
   *   ask1_price: string;
   *   bid1_size: number;
   *   bid1_price: string;
   *   position_size: number;
   *   mark_iv: string;
   *   bid_iv: string;
   *   ask_iv: string;
   *   leverage: string;
   *   delta: string;
   *   gamma: string;
   *   vega: string;
   *   theta: string;
   *   rho: string;
   * }[]>>
   */
  getOptionsTickers(params: { underlying: string }): Promise<
    APIResponse<
      {
        name: string;
        last_price: string;
        mark_price: string;
        index_price: string;
        ask1_size: number;
        ask1_price: string;
        bid1_size: number;
        bid1_price: string;
        position_size: number;
        mark_iv: string;
        bid_iv: string;
        ask_iv: string;
        leverage: string;
        delta: string;
        gamma: string;
        vega: string;
        theta: string;
        rho: string;
      }[]
    >
  > {
    return this.get(`/options/tickers`, params);
  }

  /**
   * Get underlying ticker
   *
   * @param params Parameters for retrieving underlying ticker
   * @returns Promise<APIResponse<{
   *   trade_put: number;
   *   trade_call: number;
   *   index_price: string;
   * }>>
   */
  getOptionsUnderlyingTicker(params: { underlying: string }): Promise<
    APIResponse<{
      trade_put: number;
      trade_call: number;
      index_price: string;
    }>
  > {
    return this.get(`/options/underlying/tickers/${params.underlying}`);
  }

  /**
   * Get options candlesticks
   *
   * @param params Parameters for retrieving options candlesticks
   * @returns Promise<APIResponse<{
   *   t: number;
   *   v?: number;
   *   c: string;
   *   h: string;
   *   l: string;
   *   o: string;
   * }[]>>
   */
  getOptionsCandlesticks(params: {
    contract: string;
    limit?: number;
    from?: number;
    to?: number;
    interval?: '1m' | '5m' | '15m' | '30m' | '1h';
  }): Promise<
    APIResponse<
      {
        t: number;
        v?: number;
        c: string;
        h: string;
        l: string;
        o: string;
      }[]
    >
  > {
    return this.get(`/options/candlesticks`, params);
  }

  /**
   * Mark price candlesticks of an underlying
   *
   * @param params Parameters for retrieving mark price candlesticks of an underlying
   * @returns Promise<APIResponse<{
   *   t: number;
   *   v?: number;
   *   c: string;
   *   h: string;
   *   l: string;
   *   o: string;
   *   sum: string;
   * }[]>>
   */
  getOptionsUnderlyingCandlesticks(params: {
    underlying: string;
    limit?: number;
    from?: number;
    to?: number;
    interval?: '1m' | '5m' | '15m' | '30m' | '1h';
  }): Promise<
    APIResponse<
      {
        t: number;
        v?: number;
        c: string;
        h: string;
        l: string;
        o: string;
        sum: string;
      }[]
    >
  > {
    return this.get(`/options/underlying/candlesticks`, params);
  }

  /**
   * Options trade history
   *
   * @param params Parameters for retrieving options trade history
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   create_time_ms: number;
   *   contract: string;
   *   size: number;
   *   price: string;
   *   is_internal?: boolean;
   * }[]>>
   */
  getOptionsTrades(params: {
    contract?: string;
    type?: 'C' | 'P';
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        create_time: number;
        create_time_ms: number;
        contract: string;
        size: number;
        price: string;
        is_internal?: boolean;
      }[]
    >
  > {
    return this.get(`/options/trades`, params);
  }

  /**
   * List options account
   *
   * @returns Promise<APIResponse<{
   *   user: number;
   *   total: string;
   *   short_enabled: boolean;
   *   unrealised_pnl: string;
   *   init_margin: string;
   *   maint_margin: string;
   *   order_margin: string;
   *   available: string;
   *   point: string;
   *   currency: string;
   * }>>
   */
  getOptionsAccount(): Promise<
    APIResponse<{
      user: number;
      total: string;
      short_enabled: boolean;
      unrealised_pnl: string;
      init_margin: string;
      maint_margin: string;
      order_margin: string;
      available: string;
      point: string;
      currency: string;
    }>
  > {
    return this.getPrivate(`/options/accounts`);
  }

  /**
   * List account changing history
   *
   * @param params Parameters for listing account changing history
   * @returns Promise<APIResponse<{
   *   time: number;
   *   change: string;
   *   balance: string;
   *   type: 'dnw' | 'prem' | 'fee' | 'refr' | 'set';
   *   text: string;
   * }[]>>
   */
  getOptionsAccountChange(params: {
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
    type?: 'dnw' | 'prem' | 'fee' | 'refr' | 'set';
  }): Promise<
    APIResponse<
      {
        time: number;
        change: string;
        balance: string;
        type: 'dnw' | 'prem' | 'fee' | 'refr' | 'set';
        text: string;
      }[]
    >
  > {
    return this.getPrivate(`/options/account_book`, params);
  }

  /**
   * List user's positions of specified underlying
   *
   * @param params Parameters for listing user's positions of specified underlying
   * @returns Promise<APIResponse<{
   *   user: number;
   *   underlying: string;
   *   underlying_price: string;
   *   contract: string;
   *   size: number;
   *   entry_price: string;
   *   mark_price: string;
   *   mark_iv: string;
   *   realised_pnl: string;
   *   unrealised_pnl: string;
   *   pending_orders: number;
   *   close_order: {
   *     id: number;
   *     price: string;
   *     is_liq: boolean;
   *   } | null;
   *   delta: string;
   *   gamma: string;
   *   vega: string;
   *   theta: string;
   * }[]>>
   */

  getOptionsPositionsUnderlying(params: { underlying?: string }): Promise<
    APIResponse<
      {
        user: number;
        underlying: string;
        underlying_price: string;
        contract: string;
        size: number;
        entry_price: string;
        mark_price: string;
        mark_iv: string;
        realised_pnl: string;
        unrealised_pnl: string;
        pending_orders: number;
        close_order: {
          id: number;
          price: string;
          is_liq: boolean;
        } | null;
        delta: string;
        gamma: string;
        vega: string;
        theta: string;
      }[]
    >
  > {
    return this.getPrivate(`/options/positions`, params);
  }
  /**
   * Get specified contract position
   *
   * @param params Parameters for retrieving specified contract position
   * @returns Promise<APIResponse<{
   *   user: number;
   *   underlying: string;
   *   underlying_price: string;
   *   contract: string;
   *   size: number;
   *   entry_price: string;
   *   mark_price: string;
   *   mark_iv: string;
   *   realised_pnl: string;
   *   unrealised_pnl: string;
   *   pending_orders: number;
   *   close_order: {
   *     id: number;
   *     price: string;
   *     is_liq: boolean;
   *   } | null;
   *   delta: string;
   *   gamma: string;
   *   vega: string;
   *   theta: string;
   * }>>
   */
  getOptionsPositionContract(params: { contract: string }): Promise<
    APIResponse<{
      user: number;
      underlying: string;
      underlying_price: string;
      contract: string;
      size: number;
      entry_price: string;
      mark_price: string;
      mark_iv: string;
      realised_pnl: string;
      unrealised_pnl: string;
      pending_orders: number;
      close_order: {
        id: number;
        price: string;
        is_liq: boolean;
      } | null;
      delta: string;
      gamma: string;
      vega: string;
      theta: string;
    }>
  > {
    return this.getPrivate(`/options/positions/${params.contract}`, params);
  }

  /**
   * List user's liquidation history of specified underlying
   *
   * @param params Parameters for listing user's liquidation history of specified underlying
   * @returns Promise<APIResponse<{
   *   time: number;
   *   contract: string;
   *   side: 'long' | 'short';
   *   pnl: string;
   *   text: string;
   *   settle_size: string;
   * }[]>>
   */
  getOptionsLiquidation(params: {
    underlying: string;
    contract?: string;
  }): Promise<
    APIResponse<
      {
        time: number;
        contract: string;
        side: 'long' | 'short';
        pnl: string;
        text: string;
        settle_size: string;
      }[]
    >
  > {
    return this.getPrivate(`/options/position_close`, params);
  }

  /**
   * Create an options order
   *
   * @param params Parameters for creating an options order
   * @returns Promise<APIResponse<{
   *   id: number;
   *   user: number;
   *   create_time: number;
   *   finish_time: number;
   *   finish_as: 'filled' | 'cancelled' | 'liquidated' | 'ioc' | 'auto_deleveraged' | 'reduce_only' | 'position_closed';
   *   status: 'open' | 'finished';
   *   contract: string;
   *   size: number;
   *   iceberg: number;
   *   price: string;
   *   is_close: boolean;
   *   is_reduce_only: boolean;
   *   is_liq: boolean;
   *   tif: 'gtc' | 'ioc' | 'poc';
   *   left: number;
   *   fill_price: string;
   *   text: string;
   *   tkfr: string;
   *   mkfr: string;
   *   refu: number;
   *   refr: string;
   * }>>
   */
  submitOptionsOrder(params: {
    body: {
      contract: string;
      size: number;
      iceberg?: number;
      price?: string;
      close?: boolean;
      reduce_only?: boolean;
      tif?: 'gtc' | 'ioc' | 'poc';
      text?: string;
    };
  }): Promise<
    APIResponse<{
      id: number;
      user: number;
      create_time: number;
      finish_time: number;
      finish_as:
        | 'filled'
        | 'cancelled'
        | 'liquidated'
        | 'ioc'
        | 'auto_deleveraged'
        | 'reduce_only'
        | 'position_closed';
      status: 'open' | 'finished';
      contract: string;
      size: number;
      iceberg: number;
      price: string;
      is_close: boolean;
      is_reduce_only: boolean;
      is_liq: boolean;
      tif: 'gtc' | 'ioc' | 'poc';
      left: number;
      fill_price: string;
      text: string;
      tkfr: string;
      mkfr: string;
      refu: number;
      refr: string;
    }>
  > {
    return this.postPrivate(`/options/orders`, params);
  }

  /**
   * List options orders
   *
   * @param params Parameters for listing options orders
   * @returns Promise<APIResponse<{
   *   id: number;
   *   user: number;
   *   create_time: number;
   *   finish_time: number;
   *   finish_as: 'filled' | 'cancelled' | 'liquidated' | 'ioc' | 'auto_deleveraged' | 'reduce_only' | 'position_closed';
   *   status: 'open' | 'finished';
   *   contract: string;
   *   size: number;
   *   iceberg: number;
   *   price: string;
   *   is_close: boolean;
   *   is_reduce_only: boolean;
   *   is_liq: boolean;
   *   tif: 'gtc' | 'ioc' | 'poc';
   *   left: number;
   *   fill_price: string;
   *   text: string;
   *   tkfr: string;
   *   mkfr: string;
   *   refu: number;
   *   refr: string;
   * }[]>>
   */
  getOptionsOrders(params: {
    contract?: string;
    underlying?: string;
    status: 'open' | 'finished';
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        user: number;
        create_time: number;
        finish_time: number;
        finish_as:
          | 'filled'
          | 'cancelled'
          | 'liquidated'
          | 'ioc'
          | 'auto_deleveraged'
          | 'reduce_only'
          | 'position_closed';
        status: 'open' | 'finished';
        contract: string;
        size: number;
        iceberg: number;
        price: string;
        is_close: boolean;
        is_reduce_only: boolean;
        is_liq: boolean;
        tif: 'gtc' | 'ioc' | 'poc';
        left: number;
        fill_price: string;
        text: string;
        tkfr: string;
        mkfr: string;
        refu: number;
        refr: string;
      }[]
    >
  > {
    return this.getPrivate(`/options/orders`, params);
  }

  /**
   * Cancel all open orders matched
   *
   * @param params Parameters for canceling all open orders matched
   * @returns Promise<APIResponse<{
   *   id: number;
   *   user: number;
   *   create_time: number;
   *   finish_time: number;
   *   finish_as: 'filled' | 'cancelled' | 'liquidated' | 'ioc' | 'auto_deleveraged' | 'reduce_only' | 'position_closed';
   *   status: 'open' | 'finished';
   *   contract: string;
   *   size: number;
   *   iceberg: number;
   *   price: string;
   *   is_close: boolean;
   *   is_reduce_only: boolean;
   *   is_liq: boolean;
   *   tif: 'gtc' | 'ioc' | 'poc';
   *   left: number;
   *   fill_price: string;
   *   text: string;
   *   tkfr: string;
   *   mkfr: string;
   *   refu: number;
   *   refr: string;
   * }[]>>
   */
  deleteOptionsOrders(params: {
    contract?: string;
    underlying?: string;
    side?: 'ask' | 'bid';
  }): Promise<
    APIResponse<
      {
        id: number;
        user: number;
        create_time: number;
        finish_time: number;
        finish_as:
          | 'filled'
          | 'cancelled'
          | 'liquidated'
          | 'ioc'
          | 'auto_deleveraged'
          | 'reduce_only'
          | 'position_closed';
        status: 'open' | 'finished';
        contract: string;
        size: number;
        iceberg: number;
        price: string;
        is_close: boolean;
        is_reduce_only: boolean;
        is_liq: boolean;
        tif: 'gtc' | 'ioc' | 'poc';
        left: number;
        fill_price: string;
        text: string;
        tkfr: string;
        mkfr: string;
        refu: number;
        refr: string;
      }[]
    >
  > {
    return this.deletePrivate(`/options/orders`, params);
  }

  /**
   * Get a single order
   *
   * @param params Parameters for retrieving a single order
   * @returns Promise<APIResponse<{
   *   id: number;
   *   user: number;
   *   create_time: number;
   *   finish_time: number;
   *   finish_as: 'filled' | 'cancelled' | 'liquidated' | 'ioc' | 'auto_deleveraged' | 'reduce_only' | 'position_closed';
   *   status: 'open' | 'finished';
   *   contract: string;
   *   size: number;
   *   iceberg: number;
   *   price: string;
   *   is_close: boolean;
   *   is_reduce_only: boolean;
   *   is_liq: boolean;
   *   tif: 'gtc' | 'ioc' | 'poc';
   *   left: number;
   *   fill_price: string;
   *   text: string;
   *   tkfr: string;
   *   mkfr: string;
   *   refu: number;
   *   refr: string;
   * }>>
   */
  getOptionsOrder(params: { order_id: number }): Promise<
    APIResponse<{
      id: number;
      user: number;
      create_time: number;
      finish_time: number;
      finish_as:
        | 'filled'
        | 'cancelled'
        | 'liquidated'
        | 'ioc'
        | 'auto_deleveraged'
        | 'reduce_only'
        | 'position_closed';
      status: 'open' | 'finished';
      contract: string;
      size: number;
      iceberg: number;
      price: string;
      is_close: boolean;
      is_reduce_only: boolean;
      is_liq: boolean;
      tif: 'gtc' | 'ioc' | 'poc';
      left: number;
      fill_price: string;
      text: string;
      tkfr: string;
      mkfr: string;
      refu: number;
      refr: string;
    }>
  > {
    return this.getPrivate(`/options/orders/${params.order_id}`);
  }

  /**
   * Cancel a single order
   *
   * @param params Parameters for canceling a single order
   * @returns Promise<APIResponse<{
   *   id: number;
   *   user: number;
   *   create_time: number;
   *   finish_time: number;
   *   finish_as: 'filled' | 'cancelled' | 'liquidated' | 'ioc' | 'auto_deleveraged' | 'reduce_only' | 'position_closed';
   *   status: 'open' | 'finished';
   *   contract: string;
   *   size: number;
   *   iceberg: number;
   *   price: string;
   *   is_close: boolean;
   *   is_reduce_only: boolean;
   *   is_liq: boolean;
   *   tif: 'gtc' | 'ioc' | 'poc';
   *   left: number;
   *   fill_price: string;
   *   text: string;
   *   tkfr: string;
   *   mkfr: string;
   *   refu: number;
   *   refr: string;
   * }>>
   */
  deleteOptionsOrder(params: { order_id: number }): Promise<
    APIResponse<{
      id: number;
      user: number;
      create_time: number;
      finish_time: number;
      finish_as:
        | 'filled'
        | 'cancelled'
        | 'liquidated'
        | 'ioc'
        | 'auto_deleveraged'
        | 'reduce_only'
        | 'position_closed';
      status: 'open' | 'finished';
      contract: string;
      size: number;
      iceberg: number;
      price: string;
      is_close: boolean;
      is_reduce_only: boolean;
      is_liq: boolean;
      tif: 'gtc' | 'ioc' | 'poc';
      left: number;
      fill_price: string;
      text: string;
      tkfr: string;
      mkfr: string;
      refu: number;
      refr: string;
    }>
  > {
    return this.deletePrivate(`/options/orders/${params.order_id}`);
  }

  /**
   * List personal trading history
   *
   * @param params Parameters for listing personal trading history
   * @returns Promise<APIResponse<{
   *   id: number;
   *   create_time: number;
   *   contract: string;
   *   order_id: number;
   *   size: number;
   *   price: string;
   *   underlying_price: string;
   *   role: 'taker' | 'maker';
   * }[]>>
   */
  getOptionsPersonalHistory(params: {
    underlying: string;
    contract?: string;
    limit?: number;
    offset?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        create_time: number;
        contract: string;
        order_id: number;
        size: number;
        price: string;
        underlying_price: string;
        role: 'taker' | 'maker';
      }[]
    >
  > {
    return this.getPrivate(`/options/my_trades`, params);
  }

  /**==========================================================================================================================
   * EARN UNI
   * ==========================================================================================================================
   */

  /**
   * List currencies for lending
   *
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   min_lend_amount: string;
   *   max_lend_amount: string;
   *   max_rate: string;
   *   min_rate: string;
   * }[]>>
   */
  getLendingCurrencies(): Promise<
    APIResponse<
      {
        currency: string;
        min_lend_amount: string;
        max_lend_amount: string;
        max_rate: string;
        min_rate: string;
      }[]
    >
  > {
    return this.get(`/earn/uni/currencies`);
  }

  /**
   * Get currency detail for lending
   *
   * @param params Parameters for retrieving currency detail for lending
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   min_lend_amount: string;
   *   max_lend_amount: string;
   *   max_rate: string;
   *   min_rate: string;
   * }>>
   */
  getLendingCurrency(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      min_lend_amount: string;
      max_lend_amount: string;
      max_rate: string;
      min_rate: string;
    }>
  > {
    return this.get(`/earn/uni/currencies/${params.currency}`, params);
  }

  /**
   * Lend or redeem
   *
   * @param params Parameters for lending or redeeming
   * @returns Promise<APIResponse<void>>
   */
  submitLendOrRedeem(params: {
    body: {
      currency: string;
      amount: string;
      type: 'lend' | 'redeem';
      min_rate?: string;
    };
  }): Promise<APIResponse<void>> {
    return this.postPrivate(`/earn/uni/lends`, params);
  }

  /**
   * List user's lending orders
   *
   * @param params Parameters for listing user's lending orders
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   current_amount: string;
   *   amount: string;
   *   lent_amount: string;
   *   frozen_amount: string;
   *   min_rate: string;
   *   interest_status: string;
   *   reinvest_left_amount: string;
   *   create_time: number;
   *   update_time: number;
   * }[]>>
   */
  getLendingOrders(params?: {
    currency?: string;
    page?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
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
      }[]
    >
  > {
    return this.getPrivate(`/earn/uni/lends`, params);
  }

  /**
   * Amend lending order
   *
   * Currently only supports amending the minimum interest rate (hour)
   *
   * @param params Parameters for amending lending order
   * @returns Promise<APIResponse<void>>
   */
  updateLendingOrder(params: {
    body: {
      currency?: string;
      min_rate?: string;
    };
  }): Promise<APIResponse<void>> {
    return this.patchPrivate(`/earn/uni/lends`, params);
  }

  /**
   * List records of lending
   *
   * @param params Parameters for listing records of lending
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   amount: string;
   *   last_wallet_amount: string;
   *   last_lent_amount: string;
   *   last_frozen_amount: string;
   *   type: 'lend' | 'redeem';
   *   create_time: number;
   * }[]>>
   */
  getLendingRecords(params?: {
    currency?: string;
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
    type?: 'lend' | 'redeem';
  }): Promise<
    APIResponse<
      {
        currency: string;
        amount: string;
        last_wallet_amount: string;
        last_lent_amount: string;
        last_frozen_amount: string;
        type: 'lend' | 'redeem';
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/earn/uni/lend_records`, params);
  }

  /**
   * Get the user's total interest income of specified currency
   *
   * @param params Parameters for retrieving the user's total interest income of specified currency
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   interest: string;
   * }>>
   */
  getLendingTotalInterest(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      interest: string;
    }>
  > {
    return this.getPrivate(`/earn/uni/interests/${params.currency}`);
  }

  /**
   * List interest records
   *
   * @param params Parameters for listing interest records
   * @returns Promise<APIResponse<{
   *   status: number;
   *   currency: string;
   *   actual_rate: string;
   *   interest: string;
   *   interest_status: string;
   *   create_time: number;
   * }[]>>
   */
  getLendingInterestRecords(params?: {
    currency?: string;
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        status: number;
        currency: string;
        actual_rate: string;
        interest: string;
        interest_status: string;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/earn/uni/interest_records`, params);
  }

  /**
   * Set interest reinvestment toggle
   *
   * @param params Parameters for setting interest reinvestment toggle
   * @returns Promise<APIResponse<void>>
   */
  updateInterestReinvestment(params: {
    body: {
      currency: string;
      status: boolean;
    };
  }): Promise<APIResponse<void>> {
    return this.putPrivate(`/earn/uni/interest_reinvest`, params);
  }

  /**
   * Query currency interest compounding status
   *
   * @param params Parameters for querying currency interest compounding status
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   interest_status: string;
   * }>>
   */
  getLendingInterestStatus(params: { currency: string }): Promise<
    APIResponse<{
      currency: string;
      interest_status: string;
    }>
  > {
    return this.getPrivate(`/earn/uni/interest_status/${params.currency}`);
  }

  /**==========================================================================================================================
   * COLLATERAL LOAN
   * ==========================================================================================================================
   */

  /**
   * Place order
   *
   * @param params Parameters for placing an order
   * @returns Promise<APIResponse<{ order_id: number }>>
   */
  submitLoanOrder(params: {
    body: {
      collateral_amount: string;
      collateral_currency: string;
      borrow_amount: string;
      borrow_currency: string;
    };
  }): Promise<APIResponse<{ order_id: number }>> {
    return this.postPrivate(`/loan/collateral/orders`, params);
  }

  /**
   * List Orders
   *
   * @param params Parameters for listing orders
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   collateral_currency: string;
   *   collateral_amount: string;
   *   borrow_currency: string;
   *   borrow_amount: string;
   *   repaid_amount: string;
   *   repaid_principal: string;
   *   repaid_interest: string;
   *   init_ltv: string;
   *   current_ltv: string;
   *   liquidate_ltv: string;
   *   status: string;
   *   borrow_time: number;
   *   left_repay_total: string;
   *   left_repay_principal: string;
   *   left_repay_interest: string;
   * }[]>>
   */
  getLoanOrders(params?: {
    page?: number;
    limit?: number;
    collateral_currency?: string;
    borrow_currency?: string;
  }): Promise<
    APIResponse<
      {
        order_id: number;
        collateral_currency: string;
        collateral_amount: string;
        borrow_currency: string;
        borrow_amount: string;
        repaid_amount: string;
        repaid_principal: string;
        repaid_interest: string;
        init_ltv: string;
        current_ltv: string;
        liquidate_ltv: string;
        status: string;
        borrow_time: number;
        left_repay_total: string;
        left_repay_principal: string;
        left_repay_interest: string;
      }[]
    >
  > {
    return this.getPrivate(`/loan/collateral/orders`, params);
  }

  /**
   * Get a single order
   *
   * @param params Parameters for retrieving a single order
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   collateral_currency: string;
   *   collateral_amount: string;
   *   borrow_currency: string;
   *   borrow_amount: string;
   *   repaid_amount: string;
   *   repaid_principal: string;
   *   repaid_interest: string;
   *   init_ltv: string;
   *   current_ltv: string;
   *   liquidate_ltv: string;
   *   status: string;
   *   borrow_time: number;
   *   left_repay_total: string;
   *   left_repay_principal: string;
   *   left_repay_interest: string;
   * }>>
   */
  getLoanOrder(params: { order_id: number }): Promise<
    APIResponse<{
      order_id: number;
      collateral_currency: string;
      collateral_amount: string;
      borrow_currency: string;
      borrow_amount: string;
      repaid_amount: string;
      repaid_principal: string;
      repaid_interest: string;
      init_ltv: string;
      current_ltv: string;
      liquidate_ltv: string;
      status: string;
      borrow_time: number;
      left_repay_total: string;
      left_repay_principal: string;
      left_repay_interest: string;
    }>
  > {
    return this.getPrivate(`/loan/collateral/orders/${params.order_id}`);
  }

  /**
   * Repayment
   *
   * @param params Parameters for repayment
   * @returns Promise<APIResponse<{
   *   repaid_principal: string;
   *   repaid_interest: string;
   * }>>
   */
  submitLoanRepay(params: {
    body: {
      order_id: number;
      repay_amount: string;
      repaid_all: boolean;
    };
  }): Promise<
    APIResponse<{
      repaid_principal: string;
      repaid_interest: string;
    }>
  > {
    return this.postPrivate(`/loan/collateral/repay`, params);
  }

  /**
   * Repayment history
   *
   * @param params Parameters for retrieving repayment history
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   record_id: number;
   *   repaid_amount: string;
   *   borrow_currency: string;
   *   collateral_currency: string;
   *   init_ltv: string;
   *   borrow_time: number;
   *   repay_time: number;
   *   total_interest: string;
   *   before_left_principal: string;
   *   after_left_principal: string;
   *   before_left_collateral: string;
   *   after_left_collateral: string;
   * }[]>>
   */
  getLoanRepaymentHistory(params: {
    source: 'repay' | 'liquidate';
    borrow_currency?: string;
    collateral_currency?: string;
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        order_id: number;
        record_id: number;
        repaid_amount: string;
        borrow_currency: string;
        collateral_currency: string;
        init_ltv: string;
        borrow_time: number;
        repay_time: number;
        total_interest: string;
        before_left_principal: string;
        after_left_principal: string;
        before_left_collateral: string;
        after_left_collateral: string;
      }[]
    >
  > {
    return this.getPrivate(`/loan/collateral/repay_records`, params);
  }

  /**
   * Increase or redeem collateral
   *
   * @param params Parameters for increasing or redeeming collateral
   * @returns Promise<APIResponse<void>>
   */
  updateLoanCollateral(params: {
    body: {
      order_id: number;
      collateral_currency: string;
      collateral_amount: string;
      type: 'append' | 'redeem';
    };
  }): Promise<APIResponse<void>> {
    return this.postPrivate(`/loan/collateral/collaterals`, params);
  }

  /**
   * Query collateral adjustment records
   *
   * @param params Parameters for querying collateral adjustment records
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   record_id: number;
   *   borrow_currency: string;
   *   borrow_amount: string;
   *   collateral_currency: string;
   *   before_collateral: string;
   *   after_collateral: string;
   *   before_ltv: string;
   *   after_ltv: string;
   *   operate_time: number;
   * }[]>>
   */
  getLoanCollateralRecords(params?: {
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
    borrow_currency?: string;
    collateral_currency?: string;
  }): Promise<
    APIResponse<
      {
        order_id: number;
        record_id: number;
        borrow_currency: string;
        borrow_amount: string;
        collateral_currency: string;
        before_collateral: string;
        after_collateral: string;
        before_ltv: string;
        after_ltv: string;
        operate_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/loan/collateral/collaterals`, params);
  }

  /**
   * Query the total borrowing and collateral amount for the user
   *
   * @returns Promise<APIResponse<{
   *   borrow_amount: string;
   *   collateral_amount: string;
   * }>>
   */
  getLoanTotalAmount(): Promise<
    APIResponse<{
      borrow_amount: string;
      collateral_amount: string;
    }>
  > {
    return this.getPrivate(`/loan/collateral/total_amount`);
  }

  /**
   * Query user's collateralization ratio
   *
   * @param params Parameters for querying user's collateralization ratio
   * @returns Promise<APIResponse<{
   *   collateral_currency: string;
   *   borrow_currency: string;
   *   init_ltv: string;
   *   alert_ltv: string;
   *   liquidate_ltv: string;
   *   min_borrow_amount: string;
   *   left_borrowable_amount: string;
   * }>>
   */
  getLoanCollateralizationRatio(params: {
    collateral_currency: string;
    borrow_currency: string;
  }): Promise<
    APIResponse<{
      collateral_currency: string;
      borrow_currency: string;
      init_ltv: string;
      alert_ltv: string;
      liquidate_ltv: string;
      min_borrow_amount: string;
      left_borrowable_amount: string;
    }>
  > {
    return this.getPrivate(`/loan/collateral/ltv`, params);
  }

  /**
   * Query supported borrowing and collateral currencies
   *
   * @param params Parameters for querying supported borrowing and collateral currencies
   * @returns Promise<APIResponse<{
   *   loan_currency: string;
   *   collateral_currency: string[];
   * }[]>>
   */
  getLoanSupportedCurrencies(params?: { loan_currency?: string }): Promise<
    APIResponse<
      {
        loan_currency: string;
        collateral_currency: string[];
      }[]
    >
  > {
    return this.get(`/loan/collateral/currencies`, params);
  }

  /**==========================================================================================================================
   * MULTI COLLATERAL LOAN
   * ==========================================================================================================================
   */

  /**
   * Create Multi-Collateral Order
   *
   * @param params Parameters for creating a multi-collateral order
   * @returns Promise<APIResponse<{ order_id: number }>>
   */
  submitMultiLoanOrder(params: {
    body: {
      order_id?: string;
      order_type?: string;
      fixed_type?: string;
      fixed_rate?: string;
      auto_renew?: boolean;
      auto_repay?: boolean;
      borrow_currency: string;
      borrow_amount: string;
      collateral_currencies?: {
        currency?: string;
        amount?: string;
      }[];
    };
  }): Promise<APIResponse<{ order_id: number }>> {
    return this.postPrivate(`/loan/multi_collateral/orders`, params);
  }

  /**
   * List Multi-Collateral Orders
   *
   * @param params Parameters for listing multi-collateral orders
   * @returns Promise<APIResponse<{
   *   order_id: string;
   *   order_type: string;
   *   fixed_type: string;
   *   fixed_rate: string;
   *   expire_time: number;
   *   auto_renew: boolean;
   *   auto_repay: boolean;
   *   current_ltv: string;
   *   status: string;
   *   borrow_time: number;
   *   total_left_repay_usdt: string;
   *   total_left_collateral_usdt: string;
   *   borrow_currencies: {
   *     currency: string;
   *     index_price: string;
   *     left_repay_principal: string;
   *     left_repay_interest: string;
   *     left_repay_usdt: string;
   *   }[];
   *   collateral_currencies: {
   *     currency: string;
   *     index_price: string;
   *     left_collateral: string;
   *     left_collateral_usdt: string;
   *   }[];
   * }[]>>
   */
  getMultiLoanOrders(params?: {
    page?: number;
    limit?: number;
    sort?: string;
    order_type?: string;
  }): Promise<
    APIResponse<
      {
        order_id: string;
        order_type: string;
        fixed_type: string;
        fixed_rate: string;
        expire_time: number;
        auto_renew: boolean;
        auto_repay: boolean;
        current_ltv: string;
        status: string;
        borrow_time: number;
        total_left_repay_usdt: string;
        total_left_collateral_usdt: string;
        borrow_currencies: {
          currency: string;
          index_price: string;
          left_repay_principal: string;
          left_repay_interest: string;
          left_repay_usdt: string;
        }[];
        collateral_currencies: {
          currency: string;
          index_price: string;
          left_collateral: string;
          left_collateral_usdt: string;
        }[];
      }[]
    >
  > {
    return this.getPrivate(`/loan/multi_collateral/orders`, params);
  }

  /**
   * Get Multi-Collateral Order Detail
   *
   * @param params Parameters for retrieving a multi-collateral order detail
   * @returns Promise<APIResponse<{
   *   order_id: string;
   *   order_type: string;
   *   fixed_type: string;
   *   fixed_rate: string;
   *   expire_time: number;
   *   auto_renew: boolean;
   *   auto_repay: boolean;
   *   current_ltv: string;
   *   status: string;
   *   borrow_time: number;
   *   total_left_repay_usdt: string;
   *   total_left_collateral_usdt: string;
   *   borrow_currencies: {
   *     currency: string;
   *     index_price: string;
   *     left_repay_principal: string;
   *     left_repay_interest: string;
   *     left_repay_usdt: string;
   *   }[];
   *   collateral_currencies: {
   *     currency: string;
   *     index_price: string;
   *     left_collateral: string;
   *     left_collateral_usdt: string;
   *   }[];
   * }>>
   */
  getMultiLoanOrder(params: { order_id: string }): Promise<
    APIResponse<{
      order_id: string;
      order_type: string;
      fixed_type: string;
      fixed_rate: string;
      expire_time: number;
      auto_renew: boolean;
      auto_repay: boolean;
      current_ltv: string;
      status: string;
      borrow_time: number;
      total_left_repay_usdt: string;
      total_left_collateral_usdt: string;
      borrow_currencies: {
        currency: string;
        index_price: string;
        left_repay_principal: string;
        left_repay_interest: string;
        left_repay_usdt: string;
      }[];
      collateral_currencies: {
        currency: string;
        index_price: string;
        left_collateral: string;
        left_collateral_usdt: string;
      }[];
    }>
  > {
    return this.getPrivate(
      `/loan/multi_collateral/orders/${params.order_id}`,
      params,
    );
  }

  /**
   * Repay Multi-Collateral Loan
   *
   * @param params Parameters for repaying a multi-collateral loan
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   repaid_currencies: {
   *     succeeded: boolean;
   *     label?: string;
   *     message?: string;
   *     currency: string;
   *     repaid_principal: string;
   *     repaid_interest: string;
   *   }[];
   * }>>
   */
  repayMultiLoan(params: {
    body: {
      order_id: number;
      repay_items: {
        currency?: string;
        amount?: string;
        repaid_all?: boolean;
      }[];
    };
  }): Promise<
    APIResponse<{
      order_id: number;
      repaid_currencies: {
        succeeded: boolean;
        label?: string;
        message?: string;
        currency: string;
        repaid_principal: string;
        repaid_interest: string;
      }[];
    }>
  > {
    return this.postPrivate(`/loan/multi_collateral/repay`, params);
  }

  /**
   * List Multi-Collateral Repay Records
   *
   * @param params Parameters for listing multi-collateral repay records
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   record_id: number;
   *   init_ltv: string;
   *   before_ltv: string;
   *   after_ltv: string;
   *   borrow_time: number;
   *   repay_time: number;
   *   borrow_currencies: {
   *     currency: string;
   *     index_price: string;
   *     before_amount: string;
   *     before_amount_usdt: string;
   *     after_amount: string;
   *     after_amount_usdt: string;
   *   }[];
   *   collateral_currencies: {
   *     currency: string;
   *     index_price: string;
   *     before_amount: string;
   *     before_amount_usdt: string;
   *     after_amount: string;
   *     after_amount_usdt: string;
   *   }[];
   *   repaid_currencies: {
   *     currency: string;
   *     index_price: string;
   *     repaid_amount: string;
   *     repaid_principal: string;
   *     repaid_interest: string;
   *     repaid_amount_usdt: string;
   *   }[];
   *   total_interest_list: {
   *     currency: string;
   *     index_price: string;
   *     amount: string;
   *     amount_usdt: string;
   *   }[];
   *   left_repay_interest_list: {
   *     currency: string;
   *     index_price: string;
   *     before_amount: string;
   *     before_amount_usdt: string;
   *     after_amount: string;
   *     after_amount_usdt: string;
   *   }[];
   * }[]>>
   */
  getMultiLoanRepayRecords(params: {
    type: 'repay' | 'liquidate';
    borrow_currency?: string;
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
  }): Promise<
    APIResponse<
      {
        order_id: number;
        record_id: number;
        init_ltv: string;
        before_ltv: string;
        after_ltv: string;
        borrow_time: number;
        repay_time: number;
        borrow_currencies: {
          currency: string;
          index_price: string;
          before_amount: string;
          before_amount_usdt: string;
          after_amount: string;
          after_amount_usdt: string;
        }[];
        collateral_currencies: {
          currency: string;
          index_price: string;
          before_amount: string;
          before_amount_usdt: string;
          after_amount: string;
          after_amount_usdt: string;
        }[];
        repaid_currencies: {
          currency: string;
          index_price: string;
          repaid_amount: string;
          repaid_principal: string;
          repaid_interest: string;
          repaid_amount_usdt: string;
        }[];
        total_interest_list: {
          currency: string;
          index_price: string;
          amount: string;
          amount_usdt: string;
        }[];
        left_repay_interest_list: {
          currency: string;
          index_price: string;
          before_amount: string;
          before_amount_usdt: string;
          after_amount: string;
          after_amount_usdt: string;
        }[];
      }[]
    >
  > {
    return this.getPrivate(`/loan/multi_collateral/repay`, params);
  }

  /**
   * Operate Multi-Collateral
   *
   * @param params Parameters for operating multi-collateral
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   collateral_currencies: {
   *     succeeded: boolean;
   *     label?: string;
   *     message?: string;
   *     currency: string;
   *     amount: string;
   *   }[];
   * }>>
   */
  operateMultiLoan(params: {
    body: {
      order_id: number;
      type: 'append' | 'redeem';
      collaterals?: {
        currency?: string;
        amount?: string;
      }[];
    };
  }): Promise<
    APIResponse<{
      order_id: number;
      collateral_currencies: {
        succeeded: boolean;
        label?: string;
        message?: string;
        currency: string;
        amount: string;
      }[];
    }>
  > {
    return this.postPrivate(`/loan/multi_collateral/mortgage`, params);
  }

  /**
   * Query collateral adjustment records
   *
   * @param params Parameters for querying collateral adjustment records
   * @returns Promise<APIResponse<{
   *   order_id: number;
   *   record_id: number;
   *   before_ltv: string;
   *   after_ltv: string;
   *   operate_time: number;
   *   borrow_currencies: {
   *     currency: string;
   *     index_price: string;
   *     before_amount: string;
   *     before_amount_usdt: string;
   *     after_amount: string;
   *     after_amount_usdt: string;
   *   }[];
   *   collateral_currencies: {
   *     currency: string;
   *     index_price: string;
   *     before_amount: string;
   *     before_amount_usdt: string;
   *     after_amount: string;
   *     after_amount_usdt: string;
   *   }[];
   * }[]>>
   */
  getMultiLoanAdjustmentRecords(params?: {
    page?: number;
    limit?: number;
    from?: number;
    to?: number;
    collateral_currency?: string;
  }): Promise<
    APIResponse<
      {
        order_id: number;
        record_id: number;
        before_ltv: string;
        after_ltv: string;
        operate_time: number;
        borrow_currencies: {
          currency: string;
          index_price: string;
          before_amount: string;
          before_amount_usdt: string;
          after_amount: string;
          after_amount_usdt: string;
        }[];
        collateral_currencies: {
          currency: string;
          index_price: string;
          before_amount: string;
          before_amount_usdt: string;
          after_amount: string;
          after_amount_usdt: string;
        }[];
      }[]
    >
  > {
    return this.getPrivate(`/loan/multi_collateral/mortgage`, params);
  }

  /**
   * List User Currency Quota
   *
   * @param params Parameters for listing user currency quota
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   index_price: string;
   *   min_quota: string;
   *   left_quota: string;
   *   left_quote_usdt: string;
   * }[]>>
   */
  getMultiLoanCurrencyQuota(params: {
    type: 'collateral' | 'borrow';
    currency: string;
  }): Promise<
    APIResponse<
      {
        currency: string;
        index_price: string;
        min_quota: string;
        left_quota: string;
        left_quote_usdt: string;
      }[]
    >
  > {
    return this.getPrivate(`/loan/multi_collateral/currency_quota`, params);
  }

  /**
   * Query supported borrowing and collateral currencies in Multi-Collateral
   *
   * @returns Promise<APIResponse<{
   *   loan_currencies: {
   *     currency: string;
   *     price: string;
   *   }[];
   *   collateral_currencies: {
   *     currency: string;
   *     index_price: string;
   *     discount: string;
   *   }[];
   * }>>
   */
  getMultiLoanSupportedCurrencies(): Promise<
    APIResponse<{
      loan_currencies: {
        currency: string;
        price: string;
      }[];
      collateral_currencies: {
        currency: string;
        index_price: string;
        discount: string;
      }[];
    }>
  > {
    return this.get(`/loan/multi_collateral/currencies`);
  }

  /**
   * Get Multi-Collateral ratio
   *
   * @returns Promise<APIResponse<{
   *   init_ltv: string;
   *   alert_ltv: string;
   *   liquidate_ltv: string;
   * }>>
   */
  getMultiLoanRatio(): Promise<
    APIResponse<{
      init_ltv: string;
      alert_ltv: string;
      liquidate_ltv: string;
    }>
  > {
    return this.get(`/loan/multi_collateral/ltv`);
  }

  /**
   * Query fixed interest rates for the currency for 7 days and 30 days
   *
   * @returns Promise<APIResponse<{
   *   currency: string;
   *   rate_7d: string;
   *   rate_30d: string;
   *   update_time: number;
   * }[]>>
   */
  getMultiLoanFixedRates(): Promise<
    APIResponse<
      {
        currency: string;
        rate_7d: string;
        rate_30d: string;
        update_time: number;
      }[]
    >
  > {
    return this.get(`/loan/multi_collateral/fixed_rate`);
  }

  /**==========================================================================================================================
   * EARN
   * ==========================================================================================================================
   */

  /**
   * ETH2 swap
   *
   * @param params Parameters for ETH2 swap
   * @returns Promise<APIResponse<void>>
   */
  submitEth2Swap(params: {
    body: {
      side: '1' | '2';
      amount: string;
    };
  }): Promise<APIResponse<void>> {
    return this.postPrivate(`/earn/staking/eth2/swap`, params);
  }

  /**
   * Dual Investment product list
   *
   * @returns Promise<APIResponse<{
   *   id: number;
   *   instrument_name: string;
   *   invest_currency: string;
   *   exercise_currency: string;
   *   exercise_price: number;
   *   delivery_time: number;
   *   min_copies: number;
   *   max_copies: number;
   *   per_value: string;
   *   apy_display: string;
   *   start_time: number;
   *   end_time: number;
   *   status: 'NOTSTARTED' | 'ONGOING' | 'ENDED';
   * }[]>>
   */
  getDualInvestmentProducts(): Promise<
    APIResponse<
      {
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
      }[]
    >
  > {
    return this.get(`/earn/dual/investment_plan`);
  }

  /**
   * Dual Investment order list
   *
   * @returns Promise<APIResponse<{
   *   id: number;
   *   plan_id: number;
   *   copies: string;
   *   invest_amount: string;
   *   settlement_amount: string;
   *   create_time: number;
   *   complete_time: number;
   *   status: 'INIT' | 'SETTLEMENT_SUCCESS' | 'SETTLEMENT_PROCESSING' | 'CANCELED' | 'FAILED';
   *   invest_currency: string;
   *   exercise_currency: string;
   *   exercise_price: string;
   *   settlement_price: string;
   *   settlement_currency: string;
   *   apy_display: string;
   *   apy_settlement: string;
   *   delivery_time: number;
   * }[]>>
   */
  getDualInvestmentOrders(): Promise<
    APIResponse<
      {
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
      }[]
    >
  > {
    return this.getPrivate(`/earn/dual/orders`);
  }

  /**
   * Place Dual Investment order
   *
   * @param params Parameters for placing a dual investment order
   * @returns Promise<APIResponse<void>>
   */
  submitDualInvestmentOrder(params: {
    body: {
      plan_id: string;
      copies: string;
    };
  }): Promise<APIResponse<void>> {
    return this.postPrivate(`/earn/dual/orders`, params);
  }

  /**
   * Structured Product List
   *
   * @param params Parameters for listing structured products
   * @returns Promise<APIResponse<{
   *   id: number;
   *   type: string;
   *   name_en: string;
   *   investment_coin: string;
   *   investment_period: string;
   *   min_annual_rate: string;
   *   mid_annual_rate: string;
   *   max_annual_rate: string;
   *   watch_market: string;
   *   start_time: number;
   *   end_time: number;
   *   status: 'in_process' | 'will_begin' | 'wait_settlement' | 'done';
   * }[]>>
   */
  getStructuredProductList(params: {
    status: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
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
      }[]
    >
  > {
    return this.get(`/earn/structured/products`, params);
  }

  /**
   * Structured Product Order List
   *
   * @param params Parameters for listing structured product orders
   * @returns Promise<APIResponse<{
   *   id: number;
   *   pid: string;
   *   lock_coin: string;
   *   amount: string;
   *   status: 'SUCCESS' | 'FAILED' | 'DONE';
   *   income: string;
   *   create_time: number;
   * }[]>>
   */
  getStructuredProductOrders(params?: {
    from?: number;
    to?: number;
    page?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      {
        id: number;
        pid: string;
        lock_coin: string;
        amount: string;
        status: 'SUCCESS' | 'FAILED' | 'DONE';
        income: string;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/earn/structured/orders`, params);
  }

  /**
   * Place Structured Product Order
   *
   * @param params Parameters for placing a structured product order
   * @returns Promise<APIResponse<void>>
   */
  submitStructuredProductOrder(params: {
    body: {
      pid?: string;
      amount?: string;
    };
  }): Promise<APIResponse<void>> {
    return this.postPrivate(`/earn/structured/orders`, params);
  }

  /**==========================================================================================================================
   * ACCOUNT
   * ==========================================================================================================================
   */

  /**
   * Get account detail
   *
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   ip_whitelist: string[];
   *   currency_pairs: string[];
   *   key: {
   *     mode: number;
   *   };
   *   tier: number;
   * }>>
   */
  getAccountDetail(): Promise<
    APIResponse<{
      user_id: number;
      ip_whitelist: string[];
      currency_pairs: string[];
      key: {
        mode: number;
      };
      tier: number;
    }>
  > {
    return this.getPrivate(`/account/detail`);
  }

  /**
   * Create STP Group
   *
   * @param params Parameters for creating an STP group
   * @returns Promise<APIResponse<{
   *   id: number;
   *   name: string;
   *   creator_id: number;
   *   create_time: number;
   * }>>
   */
  createStpGroup(params: {
    body: {
      id?: number;
      name: string;
      creator_id?: number;
      create_time?: number;
    };
  }): Promise<
    APIResponse<{
      id: number;
      name: string;
      creator_id: number;
      create_time: number;
    }>
  > {
    return this.postPrivate(`/account/stp_groups`, params);
  }

  /**
   * List STP Groups
   *
   * @param params Parameters for listing STP groups
   * @returns Promise<APIResponse<{
   *   id: number;
   *   name: string;
   *   creator_id: number;
   *   create_time: number;
   * }[]>>
   */
  getStpGroups(params?: { name?: string }): Promise<
    APIResponse<
      {
        id: number;
        name: string;
        creator_id: number;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate(`/account/stp_groups`, params);
  }

  /**
   * List users of the STP group
   *
   * @param params Parameters for listing users of the STP group
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   stp_id: number;
   *   create_time: number;
   * }[]>>
   */
  getStpGroupUsers(params: { stp_id: number }): Promise<
    APIResponse<
      {
        user_id: number;
        stp_id: number;
        create_time: number;
      }[]
    >
  > {
    return this.getPrivate(
      `/account/stp_groups/${params.stp_id}/users`,
      params,
    );
  }

  /**
   * Add users to the STP group
   *
   * @param params Parameters for adding users to the STP group
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   stp_id: number;
   *   create_time: number;
   * }[]>>
   */
  addUsersToStpGroup(params: { stp_id: number; body: number[] }): Promise<
    APIResponse<
      {
        user_id: number;
        stp_id: number;
        create_time: number;
      }[]
    >
  > {
    return this.postPrivate(
      `/account/stp_groups/${params.stp_id}/users`,
      params,
    );
  }

  /**
   * Delete the user in the STP group
   *
   * @param params Parameters for deleting users from the STP group
   * @returns Promise<APIResponse<{
   *   user_id: number;
   *   stp_id: number;
   *   create_time: number;
   * }[]>>
   */
  deleteUserFromStpGroup(params: { stp_id: number; user_id: number }): Promise<
    APIResponse<
      {
        user_id: number;
        stp_id: number;
        create_time: number;
      }[]
    >
  > {
    return this.deletePrivate(
      `/account/stp_groups/${params.stp_id}/users`,
      params,
    );
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
