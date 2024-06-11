import { AxiosRequestConfig } from 'axios';

import {
  BaseRestClient,
  REST_CLIENT_TYPE_ENUM,
  RestClientType,
} from './lib/BaseRestClient.js';
import { RestClientOptions } from './lib/requestUtils.js';
import { CreateStpGroupReq } from './types/request/account.js';
import {
  GetLoanCollateralRecordsReq,
  GetLoanOrdersReq,
  GetLoanRepaymentHistoryReq,
  SubmitLoanOrderReq,
  UpdateLoanCollateralReq,
} from './types/request/collateralLoan.js';
import {
  GetDeliveryAutoOrdersReq,
  GetDeliveryBookReq,
  GetDeliveryCandlesticksReq,
  GetDeliveryClosedPositionsReq,
  GetDeliveryLiquidationHistoryReq,
  GetDeliveryOrderBookReq,
  GetDeliveryOrdersReq,
  GetDeliverySettlementHistoryReq,
  GetDeliveryTradesReq,
  GetDeliveryTradingHistoryReq,
  SubmitDeliveryFuturesOrderReq,
  submitDeliveryTriggeredOrderReq,
} from './types/request/delivery.js';
import {
  GetStructuredProductListReq,
  GetStructuredProductOrdersReq,
} from './types/request/earn.js';
import {
  GetLendingInterestRecordsReq,
  GetLendingOrdersReq,
  GetLendingRecordsReq,
  SubmitLendOrRedeemReq,
} from './types/request/earnuni.js';
import {
  GetFlashSwapOrdersReq,
  SubmitFlashSwapOrderPreviewReq,
  SubmitFlashSwapOrderReq,
} from './types/request/flashswap.js';
import {
  DeleteAllFuturesOrdersReq,
  GetFuturesAccountBookReq,
  GetFuturesAutoOrdersReq,
  GetFuturesCandlesticksReq,
  GetFuturesLiquidationHistoryReq,
  GetFuturesOrderBookReq,
  GetFuturesOrdersByTimeRangeReq,
  GetFuturesOrdersReq,
  GetFuturesPositionHistoryReq,
  GetFuturesPositionsReq,
  GetFuturesStatsReq,
  GetFuturesTradesReq,
  GetFuturesTradingHistoryReq,
  GetLiquidationHistoryReq,
  GetRiskLimitTiersReq,
  SubmitFuturesBatchOrdersReq,
  SubmitFuturesOrderReq,
  SubmitFuturesPriceTriggeredOrderReq,
  UpdateDualModePositionLeverageReq,
  UpdateDualModePositionMarginReq,
  UpdateFuturesOrderReq,
} from './types/request/futures.js';
import {
  GetCrossMarginAccountHistoryReq,
  GetCrossMarginBorrowHistoryReq,
  GetCrossMarginInterestRecordsReq,
  GetCrossMarginRepaymentsReq,
  GetMarginBalanceHistoryReq,
  SubmitCrossMarginBorrowLoanReq,
} from './types/request/margin.js';
import {
  GetMarginUNIInterestRecordsReq,
  GetMarginUNILoanRecordsReq,
  GetMarginUNILoansReq,
  GetMarginUNIMaxBorrowReq,
} from './types/request/marginuni.js';
import {
  GetMultiLoanAdjustmentRecordsReq,
  GetMultiLoanOrdersReq,
  GetMultiLoanRepayRecordsReq,
  RepayMultiLoanReq,
  SubmitMultiLoanOrderReq,
  UpdateMultiLoanReq,
} from './types/request/multicollateralLoan.js';
import {
  GetOptionsAccountChangeReq,
  GetOptionsCandlesticksReq,
  GetOptionsMySettlementsReq,
  GetOptionsOrderBookReq,
  GetOptionsOrdersReq,
  GetOptionsPersonalHistoryReq,
  GetOptionsSettlementHistoryReq,
  GetOptionsTradesReq,
  GetOptionsUnderlyingCandlesticksReq,
  SubmitOptionsOrderReq,
} from './types/request/options.js';
import {
  GetAgencyCommissionHistoryReq,
  GetAgencyTransactionHistoryReq,
  GetBrokerCommissionHistoryReq,
  GetBrokerTransactionHistoryReq,
} from './types/request/rebate.js';
import {
  CancelSpotBatchOrdersReq,
  DeleteSpotOrderReq,
  GetSpotAccountBookReq,
  GetSpotAutoOrdersReq,
  GetSpotCandlesticksReq,
  GetSpotOrderBookReq,
  GetSpotOrderReq,
  GetSpotOrdersReq,
  GetSpotTradesReq,
  GetSpotTradingHistoryReq,
  SubmitSpotClosePosCrossDisabledReq,
  SubmitSpotOrderReq,
  UpdateSpotBatchOrdersReq,
  UpdateSpotOrderReq,
} from './types/request/spot.js';
import {
  CreateSubAccountApiKeyReq,
  CreateSubAccountReq,
  UpdateSubAccountApiKeyReq,
} from './types/request/subaccount.js';
import {
  GetUnifiedInterestRecordsReq,
  GetUnifiedLoanRecordsReq,
  GetUnifiedLoansReq,
  PortfolioMarginCalculatorReq,
  SetUnifiedAccountModeReq,
  SubmitUnifiedBorrowOrRepayReq,
} from './types/request/unified.js';
import {
  GetMainSubTransfersReq,
  GetSavedAddressReq,
  GetSmallBalanceHistoryReq,
  GetWithdrawalDepositRecordsReq,
  SubmitMainSubTransferReq,
  SubmitSubToSubTransferReq,
  SubmitTransferReq,
} from './types/request/wallet.js';
import { SubmitWithdrawReq } from './types/request/withdrawal.js';
import {
  CreateStpGroupResp,
  GetAccountDetailResp,
  StpResp,
} from './types/response/account.js';
import {
  GetLoanCollateralizationRatioResp,
  GetLoanCollateralRecordsResp,
  GetLoanOrdersResp,
  GetLoanRepaymentHistoryResp,
} from './types/response/collateralloan.js';
import {
  GetDeliveryAccountResp,
  GetDeliveryBookResp,
  GetDeliveryCandlesticksResp,
  GetDeliveryClosedPositionsResp,
  GetDeliveryLiquidationHistoryResp,
  GetDeliveryOrderBookResp,
  GetDeliverySettlementHistoryResp,
  GetDeliveryTickersResp,
  GetDeliveryTradesResp,
  GetDeliveryTradingHistoryResp,
} from './types/response/delivery.js';
import {
  GetDualInvestmentOrdersResp,
  GetDualInvestmentProductsResp,
  GetStructuredProductListResp,
  GetStructuredProductOrdersResp,
} from './types/response/earn.js';
import {
  GetLendingCurrenciesResp,
  GetLendingInterestRecordsResp,
  GetLendingOrdersResp,
  GetLendingRecordsResp,
} from './types/response/earnuni.js';
import {
  FlashSwapOrderResp,
  GetFlashSwapCurrencyPairsResp,
  SubmitFlashSwapOrderPreviewResp,
} from './types/response/flashswap.js';
import {
  DeleteFuturesBatchOrdersResp,
  FuturesContract,
  FuturesDeliveryContract,
  FuturesOrder,
  FuturesPosition,
  FuturesPriceTriggeredOrder,
  GetFuturesAccountResp,
  GetFuturesAutoDeleveragingHistoryResp,
  GetFuturesCandlesticksResp,
  GetFuturesLiquidationHistoryResp,
  GetFuturesOrderBookResp,
  GetFuturesPositionHistoryResp,
  GetFuturesStatsResp,
  GetFuturesTickersResp,
  GetFuturesTradesResp,
  GetFuturesTradingHistoryResp,
  GetIndexConstituentsResp,
  GetLiquidationHistoryResp,
  GetPremiumIndexKLineResp,
  GetRiskLimitTiersResp,
  UpdateFuturesDualModeResp,
} from './types/response/futures.js';
import {
  GetCrossMarginAccountHistoryResp,
  GetCrossMarginAccountResp,
  GetCrossMarginCurrenciesResp,
  GetMarginAccountsResp,
  GetMarginBalanceHistoryResp,
  SubmitCrossMarginBorrowLoanResp,
} from './types/response/margin.js';
import {
  GetLendingMarketsResp,
  GetMarginUNIInterestRecordsResp,
  GetMarginUNILoanRecordsResp,
  GetMarginUNILoansResp,
  GetMarginUNIMaxBorrowResp,
} from './types/response/marginuni.js';
import {
  GetMultiLoanAdjustmentRecordsResp,
  GetMultiLoanCurrencyQuotaResp,
  GetMultiLoanFixedRatesResp,
  GetMultiLoanOrdersResp,
  GetMultiLoanRatioResp,
  GetMultiLoanRepayRecordsResp,
  GetMultiLoanSupportedCurrenciesResp,
  RepayMultiLoanResp,
  UpdateMultiLoanResp,
} from './types/response/multicollateralLoan.js';
import {
  GetOptionsAccountChangeResp,
  GetOptionsAccountResp,
  GetOptionsCandlesticksResp,
  GetOptionsContractsResp,
  GetOptionsLiquidationResp,
  GetOptionsMySettlementsResp,
  GetOptionsOrderBookResp,
  GetOptionsPersonalHistoryResp,
  GetOptionsPositionsUnderlyingResp,
  GetOptionsSettlementHistoryResp,
  GetOptionsTickersResp,
  GetOptionsTradesResp,
  GetOptionsUnderlyingCandlesticksResp,
  SubmitOptionsOrderResp,
} from './types/response/options.js';
import {
  GetAgencyCommissionHistoryResp,
  GetAgencyTransactionHistoryResp,
  GetBrokerCommissionHistoryResp,
  GetBrokerTransactionHistoryResp,
} from './types/response/rebate.js';
import { APIResponse } from './types/response/shared.types.js';
import {
  DeleteSpotBatchOrdersResp,
  GetSpotAccountBookResp,
  GetSpotAccountsResp,
  GetSpotBatchFeeRatesResp,
  GetSpotCandlesticksResp,
  GetSpotCurrenciesResp,
  GetSpotFeeRatesResp,
  GetSpotOpenOrdersResp,
  GetSpotOrderBookResp,
  GetSpotTickerResp,
  GetSpotTradesResp,
  GetSpotTradingHistoryResp,
  SpotOrder,
  SpotPriceTriggeredOrder,
  SubmitSpotBatchOrdersResp,
} from './types/response/spot.js';
import {
  CreateSubAccountApiKeyResp,
  SubAccountKey,
  SubAccountResp,
} from './types/response/subaccount.js';
import {
  GetUnifiedAccountInfoResp,
  GetUnifiedCurrencyDiscountTiersResp,
  GetUnifiedInterestRecordsResp,
  GetUnifiedLoanRecordsResp,
  GetUnifiedLoansResp,
  GetUnifiedRiskUnitDetailsResp,
  PortfolioMarginCalculatorResp,
} from './types/response/unified.js';
import {
  CreateDepositAddressResp,
  GetBalancesResp,
  GetCurrencyChainsResp,
  GetSavedAddressResp,
  GetSmallBalanceHistoryResp,
  GetSmallBalancesResp,
  GetTradingFeesResp,
  GetWithdrawalStatusResp,
  SubAccountCrossMarginBalancesResp,
  SubAccountFuturesBalancesResp,
  SubAccountMarginBalancesResp,
  SubAccountTransferRecordResp,
} from './types/response/wallet.js';
import { Withdrawal } from './types/response/withdrawal.js';
import { CurrencyPair } from './types/shared.js';

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
  submitWithdraw(params: SubmitWithdrawReq): Promise<APIResponse<Withdrawal>> {
    return this.postPrivate('/withdrawals', { query: params });
  }

  /**
   * Cancel withdrawal with specified ID
   *
   * @param params Parameters containing the withdrawal ID
   * @returns Promise<APIResponse<Withdraw>>
   */
  cancelWithdrawal(params: {
    withdrawal_id: string;
  }): Promise<APIResponse<Withdrawal>> {
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
   * @returns Promise<APIResponse< GetCurrencyChainsResp[][]>>
   */
  getCurrencyChains(params: {
    currency: string;
  }): Promise<APIResponse<GetCurrencyChainsResp[]>> {
    return this.get('/wallet/currency_chains', params);
  }

  /**
   * Generate currency deposit address
   *
   * @param params Parameters containing the currency name
   * @returns Promise<APIResponse<CreateDepositAddressResp>>
   */
  createDepositAddress(params: {
    currency: string;
  }): Promise<APIResponse<CreateDepositAddressResp>> {
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
  getWithdrawalRecords(
    params?: GetWithdrawalDepositRecordsReq,
  ): Promise<APIResponse<Withdrawal[]>> {
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
  getDepositRecords(
    params?: GetWithdrawalDepositRecordsReq,
  ): Promise<APIResponse<Withdrawal[]>> {
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
  submitTransfer(
    params: SubmitTransferReq,
  ): Promise<APIResponse<{ tx_id: number }>> {
    return this.postPrivate('/wallet/transfers', { body: params });
  }

  /**
   * Transfer between main and sub accounts
   *
   * Support transferring with sub user's spot or futures account. Note that only main user's spot account is used no matter which sub user's account is operated.
   *
   * @param params Transfer parameters
   * @returns Promise<APIResponse<any>>
   */
  submitMainSubTransfer(
    params: SubmitMainSubTransferReq,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/wallet/sub_account_transfers', { body: params });
  }

  /**
   * Retrieve transfer records between main and sub accounts
   *
   * Record time range cannot exceed 30 days
   *
   * Note: only records after 2020-04-10 can be retrieved
   *
   * @param params Parameters for filtering transfer records
   * @returns Promise<APIResponse<SubAccountTransferRecordResp[]>>
   */
  getMainSubTransfers(
    params?: GetMainSubTransfersReq,
  ): Promise<APIResponse<SubAccountTransferRecordResp[]>> {
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
  submitSubToSubTransfer(
    params: SubmitSubToSubTransferReq,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/wallet/sub_account_to_sub_account', {
      body: params,
    });
  }

  /**
   * Retrieve withdrawal status
   *
   * @param params Parameters for retrieving withdrawal status
   * @returns Promise<APIResponse<GetWithdrawalStatusResp[]>>
   */
  getWithdrawalStatus(params?: {
    currency?: string;
  }): Promise<APIResponse<GetWithdrawalStatusResp[]>> {
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
   * @returns Promise<APIResponse<SubAccountMarginBalancesResp[]>>
   */
  getSubMarginBalances(params?: {
    sub_uid?: string;
  }): Promise<APIResponse<SubAccountMarginBalancesResp[]>> {
    return this.getPrivate('/wallet/sub_account_margin_balances', params);
  }

  /**
   * Query sub accounts' futures account balances
   *
   * @param params Parameters for querying sub accounts' futures account balances
   * @returns Promise<APIResponse<SubAccountFuturesBalancesResp[]>>
   */
  getSubFuturesBalances(params?: {
    sub_uid?: string;
    settle?: string;
  }): Promise<APIResponse<SubAccountFuturesBalancesResp[]>> {
    return this.getPrivate('/wallet/sub_account_futures_balances', params);
  }

  /**
   * Query subaccount's cross_margin account info
   *
   * @param params Parameters for querying subaccount's cross_margin account info
   * @returns Promise<APIResponse<SubAccountCrossMarginBalancesResp[]>>
   */
  getSubCrossMarginBalances(params?: {
    sub_uid?: string;
  }): Promise<APIResponse<SubAccountCrossMarginBalancesResp[]>> {
    return this.getPrivate('/wallet/sub_account_cross_margin_balances', params);
  }

  /**
   * Query saved address
   *
   * @param params Parameters for querying saved address
   * @returns Promise<APIResponse<GetSavedAddressResp[]>>
   */
  getSavedAddress(
    params: GetSavedAddressReq,
  ): Promise<APIResponse<GetSavedAddressResp[]>> {
    return this.getPrivate('/wallet/saved_address', params);
  }

  /**
   * Retrieve personal trading fee
   *
   * @param params Parameters for retrieving personal trading fee
   * @returns Promise<APIResponse<GetTradingFeesResp>>
   */
  getTradingFees(params?: {
    currency_pair?: string;
    settle?: 'BTC' | 'USDT' | 'USD';
  }): Promise<APIResponse<GetTradingFeesResp>> {
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
   * @returns Promise<APIResponse<GetBalancesResp>>
   */
  getBalances(params?: {
    currency?: string;
  }): Promise<APIResponse<GetBalancesResp>> {
    return this.getPrivate('/wallet/total_balance', params);
  }

  /**
   * List small balance
   *
   * @returns Promise<APIResponse<GetSmallBalancesResp>>
   */
  getSmallBalances(): Promise<APIResponse<GetSmallBalancesResp>> {
    return this.getPrivate('/wallet/small_balance');
  }

  /**
   * Convert small balance
   *
   * @param params Parameters for converting small balance
   * @returns Promise<APIResponse<any>>
   */
  convertSmallBalance(params?: {
    currency?: string[];
  }): Promise<APIResponse<any>> {
    return this.postPrivate('/wallet/small_balance', { body: params });
  }

  /**
   * List small balance history
   *
   * @param params Parameters for listing small balance history
   * @returns Promise<APIResponse<GetSmallBalanceHistoryResp[]>>
   */
  getSmallBalanceHistory(
    params?: GetSmallBalanceHistoryReq,
  ): Promise<APIResponse<GetSmallBalanceHistoryResp[]>> {
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
   * @returns Promise<APIResponse<CreateSubAccountResp>>
   */
  createSubAccount(
    params: CreateSubAccountReq,
  ): Promise<APIResponse<SubAccountResp>> {
    return this.postPrivate('/sub_accounts', { body: params });
  }

  /**
   * List sub-accounts
   *
   * @param params Parameters for listing sub-accounts
   * @returns Promise<APIResponse<GetSubAccountsResp[]>>
   */

  getSubAccounts(params?: {
    type?: string;
  }): Promise<APIResponse<SubAccountResp[]>> {
    return this.getPrivate('/sub_accounts', params);
  }

  /**
   * Get the sub-account
   *
   * @param params Parameters containing the sub-account user ID
   * @returns Promise<APIResponse<SubAccountResp>>
   */
  getSubAccount(params: {
    user_id: number;
  }): Promise<APIResponse<SubAccountResp>> {
    return this.getPrivate(`/sub_accounts/${params.user_id}`);
  }

  /**
   * Create API Key of the sub-account
   *
   * @param params Parameters for creating API Key of the sub-account
   * @returns Promise<APIResponse<CreateSubAccountApiKeyResp>>
   */
  createSubAccountApiKey(
    params: CreateSubAccountApiKeyReq,
  ): Promise<APIResponse<CreateSubAccountApiKeyResp>> {
    const { user_id, ...body } = params;
    return this.postPrivate(`/sub_accounts/${user_id}/keys`, { body: body });
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
  updateSubAccountApiKey(
    params: UpdateSubAccountApiKeyReq,
  ): Promise<APIResponse<any>> {
    const { user_id, key, ...body } = params;
    return this.putPrivate(`/sub_accounts/${user_id}/keys/${key}`, { body });
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
   * @returns Promise<APIResponse<any>>
   */
  lockSubAccount(params: { user_id: number }): Promise<APIResponse<any>> {
    return this.postPrivate(`/sub_accounts/${params.user_id}/lock`);
  }

  /**
   * Unlock the sub-account
   *
   * @param params Parameters containing the sub-account user ID
   * @returns Promise<APIResponse<any>>
   */
  unlockSubAccount(params: { user_id: number }): Promise<APIResponse<any>> {
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
   * @returns Promise<APIResponse<GetUnifiedAccountInfoResp>>
   */
  getUnifiedAccountInfo(params?: {
    currency?: string;
  }): Promise<APIResponse<GetUnifiedAccountInfoResp>> {
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
   * @returns Promise<APIResponse<any>>
   */
  submitUnifiedBorrowOrRepay(
    params: SubmitUnifiedBorrowOrRepayReq,
  ): Promise<APIResponse<any>> {
    return this.postPrivate('/unified/loans', { body: params });
  }

  /**
   * List loans
   *
   * @param params Parameters for listing loans
   * @returns Promise<APIResponse<GetUnifiedLoansResp[]>>
   */
  getUnifiedLoans(
    params?: GetUnifiedLoansReq,
  ): Promise<APIResponse<GetUnifiedLoansResp[]>> {
    return this.getPrivate('/unified/loans', params);
  }

  /**
   * Get loan records
   *
   * @param params Parameters for getting loan records
   * @returns Promise<APIResponse<GetUnifiedLoanRecordsResp[]>>
   */
  getUnifiedLoanRecords(
    params?: GetUnifiedLoanRecordsReq,
  ): Promise<APIResponse<GetUnifiedLoanRecordsResp[]>> {
    return this.getPrivate('/unified/loan_records', params);
  }

  /**
   * List interest records
   *
   * @param params Parameters for listing interest records
   * @returns Promise<APIResponse<GetUnifiedInterestRecordsResp[]>>
   */
  getUnifiedInterestRecords(
    params?: GetUnifiedInterestRecordsReq,
  ): Promise<APIResponse<GetUnifiedInterestRecordsResp[]>> {
    return this.getPrivate('/unified/interest_records', params);
  }

  /**
   * Retrieve user risk unit details, only valid in portfolio margin mode
   *
   * @returns Promise<APIResponse<GetUnifiedRiskUnitDetailsResp>>
   */
  getUnifiedRiskUnitDetails(): Promise<
    APIResponse<GetUnifiedRiskUnitDetailsResp>
  > {
    return this.getPrivate('/unified/risk_units');
  }

  /**
   * Set mode of the unified account
   *
   * Switching between different account modes requires only passing the parameters corresponding to the target account mode. It also supports opening or closing configuration switches for the corresponding account mode when switching.
   *
   * @param params Parameters for setting the mode of the unified account
   * @returns Promise<APIResponse<any>>
   */
  updateUnifiedAccountMode(
    params: SetUnifiedAccountModeReq,
  ): Promise<APIResponse<any>> {
    return this.putPrivate('/unified/unified_mode', { body: params });
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
  getUnifiedAccountMode(): Promise<APIResponse<SetUnifiedAccountModeReq>> {
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
   * @returns Promise<APIResponse<GetUnifiedCurrencyDiscountTiersResp[]>>
   */
  getUnifiedCurrencyDiscountTiers(): Promise<
    APIResponse<GetUnifiedCurrencyDiscountTiersResp[]>
  > {
    return this.get('/unified/currency_discount_tiers');
  }

  /**
   * Portfolio margin calculator
   *
   * Portfolio Margin Calculator When inputting a simulated position portfolio, each position includes the position name and quantity held, supporting markets within the range of BTC and ETH perpetual contracts, options, and spot markets. When inputting simulated orders, each order includes the market identifier, order price, and order quantity, supporting markets within the range of BTC and ETH perpetual contracts, options, and spot markets. Market orders are not included.
   *
   * @param params Parameters for portfolio margin calculator
   * @returns Promise<APIResponse<PortfolioMarginCalculatorResp>>
   */
  portfolioMarginCalculate(
    params: PortfolioMarginCalculatorReq,
  ): Promise<APIResponse<PortfolioMarginCalculatorResp>> {
    return this.post('/unified/portfolio_calculator', { body: params });
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
   * @returns Promise<APIResponse<GetSpotCurrenciesResp[]>>
   */
  getSpotCurrencies(): Promise<APIResponse<GetSpotCurrenciesResp[]>> {
    return this.get('/spot/currencies');
  }

  /**
   * Get details of a specific currency
   *
   * @param params Parameters for retrieving details of a specific currency
   * @returns Promise<APIResponse<GetSpotCurrenciesResp>>
   */
  getSpotCurrency(params: {
    currency: string;
  }): Promise<APIResponse<GetSpotCurrenciesResp>> {
    return this.get(`/spot/currencies/${params.currency}`);
  }

  /**
   * List all currency pairs supported
   *
   * @returns Promise<APIResponse<CurrencyPair[]>>
   */
  getSpotCurrencyPairs(): Promise<APIResponse<CurrencyPair[]>> {
    return this.get('/spot/currency_pairs');
  }

  /**
   * Get details of a specific currency pair
   *
   * @param params Parameters for retrieving details of a specific currency pair
   * @returns Promise<APIResponse<CurrencyPair>>
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
   * @returns Promise<APIResponse<GetSpotTickerResp[]>>
   */
  getSpotTicker(params?: {
    currency_pair?: string;
    timezone?: 'utc0' | 'utc8' | 'all';
  }): Promise<APIResponse<GetSpotTickerResp[]>> {
    return this.get('/spot/tickers', params);
  }

  /**
   * Retrieve order book
   *
   * Order book will be sorted by price from high to low on bids; low to high on asks.
   *
   * @param params Parameters for retrieving order book
   * @returns Promise<APIResponse<GetSpotOrderBookResp>>
   */
  getSpotOrderBook(
    params: GetSpotOrderBookReq,
  ): Promise<APIResponse<GetSpotOrderBookResp>> {
    return this.get('/spot/order_book', params);
  }

  /**
   * Retrieve market trades
   *
   * You can use from and to to query by time range, or use last_id by scrolling page. The default behavior is by time range.
   * Scrolling query using last_id is not recommended any more. If last_id is specified, time range query parameters will be ignored.
   *
   * @param params Parameters for retrieving market trades
   * @returns Promise<APIResponse<GetSpotTradesResp[]>>
   */
  getSpotTrades(
    params: GetSpotTradesReq,
  ): Promise<APIResponse<GetSpotTradesResp[]>> {
    return this.get('/spot/trades', params);
  }

  /**
   * Market candlesticks
   *
   * Maximum of 1000 points can be returned in a query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving market candlesticks
   * @returns Promise<APIResponse<GetSpotCandlesticksResp>>
   */
  getSpotCandlesticks(
    params: GetSpotCandlesticksReq,
  ): Promise<APIResponse<GetSpotCandlesticksResp>> {
    return this.get('/spot/candlesticks', params);
  }

  /**
   * Query user trading fee rates
   *
   * This API is deprecated in favour of new fee retrieving API /wallet/fee.
   *
   * @param params Parameters for querying user trading fee rates
   * @returns Promise<APIResponse<GetSpotFeeRatesResp>>
   */
  getSpotFeeRates(params?: {
    currency_pair?: string;
  }): Promise<APIResponse<GetSpotFeeRatesResp>> {
    return this.getPrivate('/spot/fee', params);
  }

  /**
   * Query a batch of user trading fee rates
   *
   * @param params Parameters for querying a batch of user trading fee rates
   * @returns Promise<APIResponse<GetSpotBatchFeeRatesResp>>
   */
  getSpotBatchFeeRates(params: {
    currency_pairs: string;
  }): Promise<APIResponse<GetSpotBatchFeeRatesResp>> {
    return this.getPrivate('/spot/batch_fee', params);
  }

  /**
   * List spot accounts
   *
   * @param params Parameters for listing spot accounts
   * @returns Promise<APIResponse<GetSpotAccountsResp[]>>
   */
  getSpotAccounts(params?: {
    currency?: string;
  }): Promise<APIResponse<GetSpotAccountsResp[]>> {
    return this.getPrivate('/spot/accounts', params);
  }

  /**
   * Query account book
   *
   * Record time range cannot exceed 30 days.
   *
   * @param params Parameters for querying account book
   * @returns Promise<APIResponse<GetSpotAccountBookResp[]>>
   */
  getSpotAccountBook(
    params?: GetSpotAccountBookReq,
  ): Promise<APIResponse<GetSpotAccountBookResp[]>> {
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
   * @returns Promise<APIResponse<SubmitSpotBatchOrdersResp[]>>
   */
  submitSpotBatchOrders(
    params: SpotOrder[],
  ): Promise<APIResponse<SubmitSpotBatchOrdersResp[]>> {
    return this.postPrivate('/spot/batch_orders', { body: params });
  }

  /**
   * List all open orders
   *
   * List open orders in all currency pairs.
   * Note that pagination parameters affect record number in each currency pair's open order list. No pagination is applied to the number of currency pairs returned. All currency pairs with open orders will be returned.
   * Spot, portfolio, and margin orders are returned by default. To list cross margin orders, account must be set to cross_margin.
   *
   * @param params Parameters for listing all open orders
   * @returns Promise<APIResponse<GetSpotOpenOrdersResp[]>>
   */
  getSpotOpenOrders(params?: {
    page?: number;
    limit?: number;
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
  }): Promise<APIResponse<GetSpotOpenOrdersResp[]>> {
    return this.getPrivate('/spot/open_orders', params);
  }

  /**
   * Close position when cross-currency is disabled
   *
   * Currently, only cross-margin accounts are supported to close position when cross currencies are disabled. Maximum buy quantity = (unpaid principal and interest - currency balance - the amount of the currency in the order book) / 0.998
   *
   * @param params Parameters for closing position when cross-currency is disabled
   * @returns Promise<APIResponse<Order>>
   */
  submitSpotClosePosCrossDisabled(
    params: SubmitSpotClosePosCrossDisabledReq,
  ): Promise<APIResponse<SpotOrder>> {
    return this.postPrivate('/spot/cross_liquidate_orders', { body: params });
  }

  /**
   * Create an order
   *
   * You can place orders with spot, portfolio, margin or cross margin account through setting the account field. It defaults to spot, which means spot account is used to place orders. If the user is using unified account, it defaults to the unified account.
   *
   * @param params Parameters for creating an order
   * @returns Promise<APIResponse<Order>>
   */
  submitSpotOrder(params: SubmitSpotOrderReq): Promise<APIResponse<SpotOrder>> {
    return this.postPrivate('/spot/orders', { body: params });
  }

  /**
   * List orders
   *
   * Spot, portfolio and margin orders are returned by default. If cross margin orders are needed, account must be set to cross_margin.
   *
   * @param params Parameters for listing orders
   * @returns Promise<APIResponse<Order[]>>
   */
  getSpotOrders(params: GetSpotOrdersReq): Promise<APIResponse<SpotOrder[]>> {
    return this.getPrivate('/spot/orders', params);
  }

  /**
   * Cancel all open orders in specified currency pair
   *
   * If account is not set, all open orders, including spot, portfolio, margin and cross margin ones, will be cancelled.
   * You can set account to cancel only orders within the specified account.
   *
   * @param params Parameters for cancelling all open orders in specified currency pair
   * @returns Promise<APIResponse<Order[]>>
   */
  deleteSpotPairOpenOrders(params: {
    currency_pair: string;
    side?: 'buy' | 'sell';
    account?: 'spot' | 'margin' | 'cross_margin' | 'unified';
    action_mode?: 'ACK' | 'RESULT' | 'FULL';
  }): Promise<APIResponse<SpotOrder[]>> {
    return this.deletePrivate('/spot/orders', { query: params });
  }

  /**
   * Cancel a batch of orders with an ID list
   *
   * Multiple currency pairs can be specified, but maximum 20 orders are allowed per request.
   *
   * @param params Parameters for cancelling a batch of orders
   * @returns Promise<APIResponse<DeleteSpotBatchOrdersResp[]>>
   */
  deleteSpotBatchOrders(
    params: CancelSpotBatchOrdersReq[],
  ): Promise<APIResponse<DeleteSpotBatchOrdersResp[]>> {
    return this.postPrivate('/spot/cancel_batch_orders', { body: params });
  }

  /**
   * Get a single order
   *
   * Spot, portfolio and margin orders are queried by default. If cross margin orders are needed or portfolio margin account are used, account must be set to cross_margin.
   *
   * @param params Parameters for getting a single order
   * @returns Promise<APIResponse<Order>>
   */
  getSpotOrder(params: GetSpotOrderReq): Promise<APIResponse<SpotOrder>> {
    const { order_id, ...query } = params;
    return this.getPrivate(`/spot/orders/${order_id}`, query);
  }

  /**
   * Amend an order
   *
   * By default, the orders of spot, portfolio and margin account are updated. If you need to modify orders of the cross-margin account, you must specify account as cross_margin. For portfolio margin account, only cross_margin account is supported.
   *
   * Currently, only supports modification of price or amount fields.
   *
   * @param params Parameters for amending an order
   * @returns Promise<APIResponse<Order>>
   */
  updateSpotOrder(params: UpdateSpotOrderReq): Promise<APIResponse<SpotOrder>> {
    const { order_id, currency_pair, account, ...body } = params;

    const query = {
      currency_pair: currency_pair,
      account: account,
    };

    return this.patchPrivate(`/spot/orders/${order_id}`, {
      query: query,
      body: body,
    });
  }

  /**
   * Cancel a single order
   *
   * Spot, portfolio and margin orders are cancelled by default. If trying to cancel cross margin orders or portfolio margin account are used, account must be set to cross_margin.
   *
   * @param params Parameters for cancelling a single order
   * @returns Promise<APIResponse<Order>>
   */
  deleteSpotOrder(params: DeleteSpotOrderReq): Promise<APIResponse<SpotOrder>> {
    const { order_id, ...query } = params;
    return this.deletePrivate(`/spot/orders/${order_id}`, {
      query: query,
    });
  }

  /**
   * List personal trading history
   *
   * Spot, portfolio and margin trades are queried by default. If cross margin trades are needed, account must be set to cross_margin.
   *
   * You can also set from and/or to to query by time range. If you don't specify from and/or to parameters, only the last 7 days of data will be returned. The range of from and to is not allowed to exceed 30 days. Time range parameters are handled as order finish time.
   *
   * @param params Parameters for listing personal trading history
   * @returns Promise<APIResponse<GetSpotTradingHistoryResp[]>>
   */
  getSpotTradingHistory(
    params?: GetSpotTradingHistoryReq,
  ): Promise<APIResponse<GetSpotTradingHistoryResp[]>> {
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
    timeout: number;
    currency_pair?: string;
  }): Promise<
    APIResponse<{
      triggerTime: number;
    }>
  > {
    return this.postPrivate('/spot/countdown_cancel_all', { body: params });
  }

  /**
   * Batch modification of orders
   *
   * Default modification of orders for spot, portfolio, and margin accounts. To modify orders for a cross margin account, the account parameter must be specified as cross_margin. For portfolio margin accounts, the account parameter can only be specified as cross_margin. Currently, only modifications to price or quantity (choose one) are supported.
   *
   * @param params Parameters for batch modification of orders
   * @returns Promise<APIResponse<Order[]>>
   */
  updateSpotBatchOrders(
    params: UpdateSpotBatchOrdersReq[],
  ): Promise<APIResponse<SpotOrder[]>> {
    return this.postPrivate('/spot/amend_batch_orders', { body: params });
  }

  /**
   * Create a price-triggered order
   *
   * @param params Parameters for creating a price-triggered order
   * @returns Promise<APIResponse<{
   *   id: number;
   * }>>
   */
  submitSpotPriceTriggerOrder(params: SpotPriceTriggeredOrder): Promise<
    APIResponse<{
      id: number;
    }>
  > {
    return this.postPrivate('/spot/price_orders', { body: params });
  }

  /**
   * Retrieve running auto order list
   *
   * @param params Parameters for retrieving running auto order list
   * @returns Promise<APIResponse<SpotPriceTriggeredOrder[]>>
   */
  getSpotAutoOrders(
    params: GetSpotAutoOrdersReq,
  ): Promise<APIResponse<SpotPriceTriggeredOrder[]>> {
    return this.getPrivate('/spot/price_orders', params);
  }

  /**
   * Cancel all open orders
   *
   * @param params Parameters for cancelling all open orders
   * @returns Promise<APIResponse<SpotPriceTriggeredOrder[]>>
   */
  deleteSpotAllOpenOrders(params?: {
    market?: string;
    account?: 'normal' | 'margin' | 'cross_margin';
  }): Promise<APIResponse<SpotPriceTriggeredOrder[]>> {
    return this.deletePrivate('/spot/price_orders', { query: params });
  }

  /**
   * Get a price-triggered order
   *
   * @param params Parameters for getting a price-triggered order
   * @returns Promise<APIResponse<SpotPriceTriggeredOrder>>
   */
  getPriceTriggeredOrder(params: {
    order_id: string;
  }): Promise<APIResponse<SpotPriceTriggeredOrder>> {
    return this.getPrivate(`/spot/price_orders/${params.order_id}`);
  }

  /**
   * Cancel a price-triggered order
   *
   * @param params Parameters for cancelling a price-triggered order
   * @returns Promise<APIResponse<SpotPriceTriggeredOrder>>
   */
  deleteSpotPriceTriggeredOrder(params: {
    order_id: string;
  }): Promise<APIResponse<SpotPriceTriggeredOrder>> {
    return this.deletePrivate(`/spot/price_orders/${params.order_id}`);
  }

  /**==========================================================================================================================
   * MARGIN
   * ==========================================================================================================================
   */

  /**
   * Margin account list
   *
   * @param params Parameters for listing margin accounts
   * @returns Promise<APIResponse<GetMarginAccountsResp[]>>
   */
  getMarginAccounts(params?: {
    currency_pair?: string;
  }): Promise<APIResponse<GetMarginAccountsResp[]>> {
    return this.getPrivate('/margin/accounts', params);
  }

  /**
   * List margin account balance change history
   *
   * Only transferals from and to margin account are provided for now. Time range allows 30 days at most.
   *
   * @param params Parameters for listing margin account balance change history
   * @returns Promise<APIResponse<GetMarginBalanceHistoryResp[]>>
   */
  getMarginBalanceHistory(
    params?: GetMarginBalanceHistoryReq,
  ): Promise<APIResponse<GetMarginBalanceHistoryResp[]>> {
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
    return this.postPrivate('/margin/auto_repay', { query: params });
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
   * @returns Promise<APIResponse<GetCrossMarginCurrenciesResp[]>>
   */
  getCrossMarginCurrencies(): Promise<
    APIResponse<GetCrossMarginCurrenciesResp[]>
  > {
    return this.get('/margin/cross/currencies');
  }

  /**
   * Retrieve detail of one single currency supported by cross margin
   *
   * @param params Parameters containing the currency name
   * @returns Promise<APIResponse<GetCrossMarginCurrenciesResp>>
   */
  getCrossMarginCurrency(params: {
    currency: string;
  }): Promise<APIResponse<GetCrossMarginCurrenciesResp>> {
    return this.get(`/margin/cross/currencies/${params.currency}`);
  }

  /**
   * Retrieve cross margin account
   *
   * @returns Promise<APIResponse<GetCrossMarginAccountResp>>
   */
  getCrossMarginAccount(): Promise<APIResponse<GetCrossMarginAccountResp>> {
    return this.getPrivate('/margin/cross/accounts');
  }

  /**
   * Retrieve cross margin account change history
   *
   * Record time range cannot exceed 30 days.
   *
   * @param params Parameters for retrieving cross margin account change history
   * @returns Promise<APIResponse<GetCrossMarginAccountHistoryResp[]>>
   */
  getCrossMarginAccountHistory(
    params?: GetCrossMarginAccountHistoryReq,
  ): Promise<APIResponse<GetCrossMarginAccountHistoryResp[]>> {
    return this.getPrivate('/margin/cross/account_book', params);
  }

  /**
   * Create a cross margin borrow loan
   *
   * Borrow amount cannot be less than currency minimum borrow amount.
   *
   * @param params Parameters for creating a cross margin borrow loan
   * @returns Promise<APIResponse<SubmitCrossMarginBorrowLoanResp>>
   */
  submitCrossMarginBorrowLoan(
    params: SubmitCrossMarginBorrowLoanReq,
  ): Promise<APIResponse<SubmitCrossMarginBorrowLoanResp>> {
    return this.postPrivate('/margin/cross/loans', { body: params });
  }

  /**
   * List cross margin borrow history
   *
   * Sort by creation time in descending order by default. Set reverse=false to return ascending results.
   *
   * @param params Parameters for listing cross margin borrow history
   * @returns Promise<APIResponse<SubmitCrossMarginBorrowLoanResp[]>>
   */
  getCrossMarginBorrowHistory(
    params: GetCrossMarginBorrowHistoryReq,
  ): Promise<APIResponse<SubmitCrossMarginBorrowLoanResp[]>> {
    return this.getPrivate('/margin/cross/loans', params);
  }

  /**
   * Retrieve single borrow loan detail
   *
   * @param params Parameters containing the borrow loan ID
   * @returns Promise<APIResponse<SubmitCrossMarginBorrowLoanResp>>
   */
  getCrossMarginBorrowLoan(params: {
    loan_id: string;
  }): Promise<APIResponse<SubmitCrossMarginBorrowLoanResp>> {
    return this.getPrivate(`/margin/cross/loans/${params.loan_id}`);
  }
  /**
   * Cross margin repayments
   *
   * When the liquidity of the currency is insufficient and the transaction risk is high, the currency will be disabled, and funds cannot be transferred. When the available balance of cross-margin is insufficient, the balance of the spot account can be used for repayment. Please ensure that the balance of the spot account is sufficient, and system uses cross-margin account for repayment first.
   *
   * @param params Parameters for cross margin repayments
   * @returns Promise<APIResponse<SubmitCrossMarginBorrowLoanResp[]>>
   */
  submitCrossMarginRepayment(params: {
    currency: string;
    amount: string;
  }): Promise<APIResponse<SubmitCrossMarginBorrowLoanResp[]>> {
    return this.postPrivate('/margin/cross/repayments', { body: params });
  }

  /**
   * Retrieve cross margin repayments
   *
   * Sort by creation time in descending order by default. Set reverse=false to return ascending results.
   *
   * @param params Parameters for retrieving cross margin repayments
   * @returns Promise<APIResponse<GetCrossMarginRepaymentsResp[]>>
   */
  getCrossMarginRepayments(
    params?: GetCrossMarginRepaymentsReq,
  ): Promise<APIResponse<GetCrossMarginAccountResp[]>> {
    return this.getPrivate('/margin/cross/repayments', params);
  }

  /**
   * Interest records for the cross margin account
   *
   * @param params Parameters for retrieving interest records
   * @returns Promise<APIResponse<GetCrossMarginInterestRecordsResp[]>>
   */
  getCrossMarginInterestRecords(
    params?: GetCrossMarginInterestRecordsReq,
  ): Promise<APIResponse<GetCrossMarginInterestRecordsReq[]>> {
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
   * @returns Promise<APIResponse<any>>
   */
  getEstimatedInterestRates(params: {
    currencies: string[];
  }): Promise<APIResponse<any>> {
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
   * @returns Promise<APIResponse<GetLendingMarketsResp[]>>
   */
  getLendingMarkets(): Promise<APIResponse<GetLendingMarketsResp[]>> {
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
  getLendingMarket(params: {
    currency_pair: string;
  }): Promise<APIResponse<GetLendingMarketsResp>> {
    return this.get(`/margin/uni/currency_pairs/${params.currency_pair}`);
  }

  /**
   * Estimate interest rate
   *
   * Please note that the interest rates are subject to change based on the borrowing and lending demand, and therefore, the provided rates may not be entirely accurate.
   *
   * @param params Parameters for retrieving estimated interest rates
   * @returns Promise<APIResponse<any>>
   */
  getEstimatedInterestRate(params: {
    currencies: string[];
  }): Promise<APIResponse<any>> {
    return this.getPrivate('/margin/uni/estimate_rate', params);
  }

  /**
   * Borrow or repay
   *
   * @param params Parameters for borrowing or repaying
   * @returns Promise<any>
   */
  submitMarginUNIBorrowOrRepay(params: {
    currency: string;
    type: 'borrow' | 'repay';
    amount: string;
    currency_pair: string;
    repaid_all?: boolean;
  }): Promise<any> {
    return this.postPrivate('/margin/uni/loans', { body: params });
  }

  /**
   * List loans
   *
   * @param params Parameters for listing loans
   * @returns Promise<APIResponse<GetMarginUNILoansResp[]>>
   */
  getMarginUNILoans(
    params?: GetMarginUNILoansReq,
  ): Promise<APIResponse<GetMarginUNILoansResp[]>> {
    return this.getPrivate('/margin/uni/loans', params);
  }

  /**
   * Get loan records
   *
   * @param params Parameters for retrieving loan records
   * @returns Promise<APIResponse<GetMarginUNILoanRecordsResp[]>>
   */
  getMarginUNILoanRecords(
    params?: GetMarginUNILoanRecordsReq,
  ): Promise<APIResponse<GetMarginUNILoanRecordsResp[]>> {
    return this.getPrivate('/margin/uni/loan_records', params);
  }

  /**
   * List interest records
   *
   * @param params Parameters for listing interest records
   * @returns Promise<APIResponse<GetMarginUNIInterestRecordsResp[]>>
   */
  getMarginUNIInterestRecords(
    params?: GetMarginUNIInterestRecordsReq,
  ): Promise<APIResponse<GetMarginUNIInterestRecordsResp[]>> {
    return this.getPrivate('/margin/uni/interest_records', params);
  }

  /**
   * Get maximum borrowable
   *
   * @param params Parameters for retrieving the maximum borrowable amount
   * @returns Promise<APIResponse<GetMarginUNIMaxBorrowResp>>
   */
  getMarginUNIMaxBorrow(
    params: GetMarginUNIMaxBorrowReq,
  ): Promise<APIResponse<GetMarginUNIMaxBorrowResp>> {
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
   * @returns Promise<APIResponse<GetFlashSwapCurrencyPairsResp[]>>
   */
  getFlashSwapCurrencyPairs(params?: {
    currency?: string;
  }): Promise<APIResponse<GetFlashSwapCurrencyPairsResp[]>> {
    return this.get('/flash_swap/currency_pairs', params);
  }

  /**
   * Create a flash swap order
   *
   * Initiate a flash swap preview in advance because order creation requires a preview result.
   *
   * @param params Parameters for creating a flash swap order
   * @returns Promise<APIResponse<SubmitFlashSwapOrderResp>>
   */
  submitFlashSwapOrder(
    params: SubmitFlashSwapOrderReq,
  ): Promise<APIResponse<FlashSwapOrderResp>> {
    return this.postPrivate('/flash_swap/orders', { body: params });
  }

  /**
   * List all flash swap orders
   *
   * @param params Parameters for listing flash swap orders
   * @returns Promise<APIResponse<GetFlashSwapOrdersResp[]>>
   */
  getFlashSwapOrders(
    params?: GetFlashSwapOrdersReq,
  ): Promise<APIResponse<FlashSwapOrderResp[]>> {
    return this.getPrivate('/flash_swap/orders', params);
  }

  /**
   * Get a single flash swap order's detail
   *
   * @param params Parameters containing the flash swap order ID
   * @returns Promise<APIResponse<GetFlashSwapOrderResp>>
   */
  getFlashSwapOrder(params: {
    order_id: number;
  }): Promise<APIResponse<FlashSwapOrderResp>> {
    return this.getPrivate(`/flash_swap/orders/${params.order_id}`);
  }

  /**
   * Initiate a flash swap order preview
   *
   * @param params Parameters for initiating a flash swap order preview
   * @returns Promise<APIResponse<SubmitFlashSwapOrderPreviewResp>>
   */
  submitFlashSwapOrderPreview(
    params: SubmitFlashSwapOrderPreviewReq,
  ): Promise<APIResponse<SubmitFlashSwapOrderPreviewResp>> {
    return this.postPrivate('/flash_swap/orders/preview', { body: params });
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
  }): Promise<APIResponse<FuturesContract[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/contracts`, query);
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
  }): Promise<APIResponse<FuturesContract>> {
    return this.get(`/futures/${params.settle}/contracts/${params.contract}`);
  }

  /**
   * Futures order book
   *
   * Bids will be sorted by price from high to low, while asks sorted reversely.
   *
   * @param params Parameters for retrieving the futures order book
   * @returns Promise<APIResponse<GetFuturesOrderBookResp>>
   */
  getFuturesOrderBook(
    params: GetFuturesOrderBookReq,
  ): Promise<APIResponse<GetFuturesOrderBookResp>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/order_book`, query);
  }

  /**
   * Futures trading history
   *
   * @param params Parameters for retrieving futures trading history
   * @returns Promise<APIResponse<GetFuturesTradesResp[]>>
   */
  getFuturesTrades(
    params: GetFuturesTradesReq,
  ): Promise<APIResponse<GetFuturesTradesResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/trades`, query);
  }

  /**
   * Get futures candlesticks
   *
   * Return specified contract candlesticks. If prefix contract with mark_, the contract's mark price candlesticks are returned; if prefix with index_, index price candlesticks will be returned.
   *
   * Maximum of 2000 points are returned in one query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving futures candlesticks
   * @returns Promise<APIResponse<GetFuturesCandlesticksResp[]>>
   */
  getFuturesCandlesticks(
    params: GetFuturesCandlesticksReq,
  ): Promise<APIResponse<GetFuturesCandlesticksResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/candlesticks`, query);
  }

  /**
   * Premium Index K-Line
   *
   * Maximum of 1000 points can be returned in a query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving premium index K-Line
   * @returns Promise<APIResponse<GetPremiumIndexKLineResp[]>>
   */
  getPremiumIndexKLine(
    params: GetFuturesCandlesticksReq,
  ): Promise<APIResponse<GetPremiumIndexKLineResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/premium_index`, query);
  }

  /**
   * List futures tickers
   *
   * @param params Parameters for listing futures tickers
   * @returns Promise<APIResponse<GetFuturesTickersResp[]>>
   */
  getFuturesTickers(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
  }): Promise<APIResponse<GetFuturesTickersResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/tickers`, query);
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
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/funding_rate`, query);
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
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/insurance`, query);
  }

  /**
   * Futures stats
   *
   * @param params Parameters for retrieving futures stats
   * @returns Promise<APIResponse<GetFuturesStatsResp[]>>
   */
  getFuturesStats(
    params: GetFuturesStatsReq,
  ): Promise<APIResponse<GetFuturesStatsResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/contract_stats`, query);
  }

  /**
   * Get index constituents
   *
   * @param params Parameters for retrieving index constituents
   * @returns Promise<APIResponse<GetIndexConstituentsResp>>
   */
  getIndexConstituents(params: {
    settle: 'btc' | 'usdt' | 'usd';
    index: string;
  }): Promise<APIResponse<GetIndexConstituentsResp>> {
    return this.get(
      `/futures/${params.settle}/index_constituents/${params.index}`,
    );
  }

  /**
   * Retrieve liquidation history
   *
   * Interval between from and to cannot exceed 3600. Some private fields will not be returned in public endpoints. Refer to field description for detail.
   *
   * @param params Parameters for retrieving liquidation history
   * @returns Promise<APIResponse<GetLiquidationHistoryResp[]>>
   */
  getLiquidationHistory(
    params: GetLiquidationHistoryReq,
  ): Promise<APIResponse<GetLiquidationHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/liq_orders`, query);
  }

  /**
   * List risk limit tiers
   *
   * When the 'contract' parameter is not passed, the default is to query the risk limits for the top 100 markets.
   * 'Limit' and 'offset' correspond to pagination queries at the market level, not to the length of the returned array.
   * This only takes effect when the 'contract' parameter is empty.
   *
   * @param params Parameters for listing risk limit tiers
   * @returns Promise<APIResponse<GetRiskLimitTiersResp[]>>
   */
  getRiskLimitTiers(
    params: GetRiskLimitTiersReq,
  ): Promise<APIResponse<GetRiskLimitTiersResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/futures/${settle}/risk_limit_tiers`, query);
  }

  /**
   * Query futures account
   *
   * @param params Parameters for querying futures account
   * @returns Promise<APIResponse<GetFuturesAccountResp>>
   */
  getFuturesAccount(params: {
    settle: 'btc' | 'usdt' | 'usd';
  }): Promise<APIResponse<GetFuturesAccountResp>> {
    return this.getPrivate(`/futures/${params.settle}/accounts`);
  }

  /**
   * Query account book
   *
   * If the contract field is provided, it can only filter records that include this field after 2023-10-30.
   *
   * @param params Parameters for querying account book
   * @returns Promise<APIResponse<GetFuturesAccountBookResp[]>>
   */
  getFuturesAccountBook(
    params: GetFuturesAccountBookReq,
  ): Promise<APIResponse<GetFuturesAccountBookReq[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/account_book`, query);
  }

  /**
   * List all positions of a user
   *
   * @param params Parameters for listing all positions of a user
   * @returns Promise<APIResponse<Position[]>>
   */
  getFuturesPositions(
    params: GetFuturesPositionsReq,
  ): Promise<APIResponse<FuturesPosition[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/positions`, query);
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
  }): Promise<APIResponse<FuturesPosition>> {
    return this.getPrivate(
      `/futures/${params.settle}/positions/${params.contract}`,
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
  }): Promise<APIResponse<FuturesPosition>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(`/futures/${settle}/positions/${contract}/margin`, {
      query: query,
    });
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
  }): Promise<APIResponse<FuturesPosition>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/futures/${settle}/positions/${contract}/leverage`,
      { query: query },
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
  }): Promise<APIResponse<FuturesPosition>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/futures/${settle}/positions/${contract}/risk_limit`,
      { query: query },
    );
  }

  /**
   * Enable or disable dual mode
   *
   * Before setting dual mode, make sure all positions are closed and no orders are open.
   *
   * @param params Parameters for enabling or disabling dual mode
   * @returns Promise<APIResponse<ToggleFuturesDualModeResp>>
   */
  updateFuturesDualMode(params: {
    settle: 'btc' | 'usdt' | 'usd';
    dual_mode: boolean;
  }): Promise<APIResponse<UpdateFuturesDualModeResp>> {
    const { settle, ...query } = params;
    return this.postPrivate(`/futures/${settle}/dual_mode`, {
      query: query,
    });
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
  }): Promise<APIResponse<FuturesPosition[]>> {
    return this.getPrivate(
      `/futures/${params.settle}/dual_comp/positions/${params.contract}`,
    );
  }

  /**
   * Update position margin in dual mode
   *
   * @param params Parameters for updating position margin in dual mode
   * @returns Promise<APIResponse<Position[]>>
   */
  updateDualModePositionMargin(
    params: UpdateDualModePositionMarginReq,
  ): Promise<APIResponse<FuturesPosition[]>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/futures/${settle}/dual_comp/positions/${contract}/margin`,
      { query: query },
    );
  }

  /**
   * Update position leverage in dual mode
   *
   * @param params Parameters for updating position leverage in dual mode
   * @returns Promise<APIResponse<Position[]>>
   */
  updateDualModePositionLeverage(
    params: UpdateDualModePositionLeverageReq,
  ): Promise<APIResponse<FuturesPosition[]>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/futures/${settle}/dual_comp/positions/${contract}/leverage`,
      { query: query },
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
  }): Promise<APIResponse<FuturesPosition[]>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/futures/${settle}/dual_comp/positions/${contract}/risk_limit`,
      { query: query },
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
   * @returns Promise<APIResponse<SubmitFuturesOrderReq>>
   */
  submitFuturesOrder(
    params: SubmitFuturesOrderReq,
  ): Promise<APIResponse<FuturesOrder>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/futures/${settle}/orders`, { body: body });
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
  getFuturesOrders(
    params: GetFuturesOrdersReq,
  ): Promise<APIResponse<FuturesOrder[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/orders`, query);
  }

  /**
   * Cancel all open orders matched
   *
   * Zero-filled order cannot be retrieved 10 minutes after order cancellation.
   *
   * @param params Parameters for cancelling all open orders matched
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  deleteAllFuturesOrders(
    params: DeleteAllFuturesOrdersReq,
  ): Promise<APIResponse<FuturesOrder[]>> {
    const { settle, ...query } = params;
    return this.deletePrivate(`/futures/${settle}/orders`, {
      query: query,
    });
  }

  /**
   * List Futures Orders By Time Range
   *
   * @param params Parameters for listing futures orders by time range
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  getFuturesOrdersByTimeRange(
    params: GetFuturesOrdersByTimeRangeReq,
  ): Promise<APIResponse<FuturesOrder[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/orders_timerange`, query);
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
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  submitFuturesBatchOrders(
    params: SubmitFuturesBatchOrdersReq,
  ): Promise<APIResponse<FuturesOrder[]>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/futures/${settle}/batch_orders`, { body: body });
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
  updateFuturesOrder(
    params: UpdateFuturesOrderReq,
  ): Promise<APIResponse<FuturesOrder>> {
    const { settle, order_id, ...body } = params;
    return this.putPrivate(`/futures/${settle}/orders/${order_id}`, {
      body: body,
    });
  }

  /**
   * List personal trading history
   *
   * By default, only data within the past 6 months is supported. If you need to query data for a longer period, please use GET /futures/{settle}/my_trades_timerange.
   *
   * @param params Parameters for listing personal trading history
   * @returns Promise<APIResponse<GetFuturesTradingHistoryResp[]>>
   */
  getFuturesTradingHistory(
    params: GetFuturesTradingHistoryReq,
  ): Promise<APIResponse<GetFuturesTradingHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/my_trades`, query);
  }

  /**
   * List position close history
   *
   * @param params Parameters for listing position close history
   * @returns Promise<APIResponse<GetFuturesPositionHistoryResp[]>>
   */
  getFuturesPositionHistory(
    params: GetFuturesPositionHistoryReq,
  ): Promise<APIResponse<GetFuturesPositionHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/position_close`, query);
  }

  /**
   * List liquidation history
   *
   * @param params Parameters for listing liquidation history
   * @returns Promise<APIResponse<GetFuturesLiquidationHistoryResp[]>>
   */
  getFuturesLiquidationHistory(
    params: GetFuturesLiquidationHistoryReq,
  ): Promise<APIResponse<GetFuturesLiquidationHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/liquidates`, query);
  }

  /**
   * List Auto-Deleveraging History
   *
   * @param params Parameters for listing auto-deleveraging history
   * @returns Promise<APIResponse<GetFuturesAutoDeleveragingHistoryResp[]>>
   */
  getFuturesAutoDeleveragingHistory(
    params: GetFuturesLiquidationHistoryReq,
  ): Promise<APIResponse<GetFuturesAutoDeleveragingHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/auto_deleverages`, query);
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
    timeout: number;
    contract?: string;
  }): Promise<APIResponse<{ triggerTime: number }>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/futures/${settle}/countdown_cancel_all`, {
      body: body,
    });
  }

  /**
   * Query user trading fee rates
   *
   * @param params Parameters for querying user trading fee rates
   * @returns Promise<APIResponse<any>>>
   */
  getFuturesUserTradingFees(params: {
    settle: 'btc' | 'usdt' | 'usd';
    contract?: string;
  }): Promise<APIResponse<any>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/fee`, query);
  }

  /**
   * Cancel a batch of orders with an ID list
   *
   * Multiple distinct order ID list can be specified. Each request can cancel a maximum of 20 records.
   *
   * @param params Parameters for cancelling a batch of orders with an ID list
   * @returns Promise<APIResponse<DeleteFuturesBatchOrdersResp[]>>
   */
  deleteFuturesBatchOrders(params: {
    settle: 'btc' | 'usdt' | 'usd';
    body: string[];
  }): Promise<APIResponse<DeleteFuturesBatchOrdersResp[]>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/futures/${settle}/batch_cancel_orders`, {
      body: body,
    });
  }

  /**
   * Create a price-triggered order
   *
   * @param params Parameters for creating a price-triggered order
   * @returns Promise<APIResponse<{ id: number }>>
   */
  submitFuturesPriceTriggeredOrder(
    params: SubmitFuturesPriceTriggeredOrderReq,
  ): Promise<APIResponse<{ id: number }>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/futures/${settle}/price_orders`, { body: body });
  }

  /**
   * List all auto orders
   *
   * @param params Parameters for listing all auto orders
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder[]>>
   */
  getFuturesAutoOrders(
    params: GetFuturesAutoOrdersReq,
  ): Promise<APIResponse<FuturesPriceTriggeredOrder[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/futures/${settle}/price_orders`, query);
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
    const { settle, ...query } = params;
    return this.deletePrivate(`/futures/${settle}/price_orders`, {
      query: query,
    });
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
  }): Promise<APIResponse<FuturesDeliveryContract[]>> {
    return this.get(`/delivery/${params.settle}/contracts`);
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
  }): Promise<APIResponse<FuturesDeliveryContract>> {
    return this.get(`/delivery/${params.settle}/contracts/${params.contract}`);
  }

  /**
   * Futures order book
   *
   * Bids will be sorted by price from high to low, while asks sorted reversely
   *
   * @param params Parameters for retrieving the futures order book
   * @returns Promise<APIResponse<GetDeliveryOrderBookResp>>
   */
  getDeliveryOrderBook(
    params: GetDeliveryOrderBookReq,
  ): Promise<APIResponse<GetDeliveryOrderBookResp>> {
    const { settle, ...query } = params;
    return this.get(`/delivery/${settle}/order_book`, query);
  }

  /**
   * Futures trading history
   *
   * @param params Parameters for retrieving the futures trading history
   * @returns Promise<APIResponse<GetDeliveryTradesResp[]>>
   */
  getDeliveryTrades(
    params: GetDeliveryTradesReq,
  ): Promise<APIResponse<GetDeliveryTradesResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/delivery/${settle}/trades`, query);
  }

  /**
   * Get futures candlesticks
   *
   * Return specified contract candlesticks. If prefix contract with mark_, the contract's mark price candlesticks are returned; if prefix with index_, index price candlesticks will be returned.
   * Maximum of 2000 points are returned in one query. Be sure not to exceed the limit when specifying from, to and interval.
   *
   * @param params Parameters for retrieving futures candlesticks
   * @returns Promise<APIResponse<GetDeliveryCandlesticksResp[]>>
   */
  getDeliveryCandlesticks(
    params: GetDeliveryCandlesticksReq,
  ): Promise<APIResponse<GetDeliveryCandlesticksResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/delivery/${settle}/candlesticks`, query);
  }

  /**
   * List futures tickers
   *
   * @param params Parameters for listing futures tickers
   * @returns Promise<APIResponse<GetDeliveryTickersResp[]>>
   */
  getDeliveryTickers(params: {
    settle: 'usdt';
    contract?: string;
  }): Promise<APIResponse<GetDeliveryTickersResp[]>> {
    const { settle, ...query } = params;
    return this.get(`/delivery/${settle}/tickers`, query);
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
    const { settle, ...query } = params;
    return this.get(`/delivery/${settle}/insurance`, query);
  }

  /**
   * Query futures account
   *
   * @param params Parameters for querying futures account
   * @returns Promise<APIResponse<GetDeliveryAccountResp>>
   */
  getDeliveryAccount(params: {
    settle: 'usdt';
  }): Promise<APIResponse<GetDeliveryAccountResp>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/delivery/${settle}/accounts`, query);
  }

  /**
   * Query account book
   *
   * @param params Parameters for querying account book
   * @returns Promise<APIResponse<GetDeliveryBookResp[]>>
   */
  getDeliveryBook(
    params: GetDeliveryBookReq,
  ): Promise<APIResponse<GetDeliveryBookResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/delivery/${settle}/account_book`, query);
  }

  /**
   * List all positions of a user
   *
   * @param params Parameters for listing all positions of a user
   * @returns Promise<APIResponse<Position[]>>
   */
  getDeliveryPositions(params: {
    settle: 'usdt';
  }): Promise<APIResponse<FuturesPosition[]>> {
    return this.getPrivate(`/delivery/${params.settle}/positions`);
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
  }): Promise<APIResponse<FuturesPosition>> {
    return this.getPrivate(
      `/delivery/${params.settle}/positions/${params.contract}`,
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
  }): Promise<APIResponse<FuturesPosition>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/delivery/${settle}/positions/${contract}/margin`,
      { query: query },
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
  }): Promise<APIResponse<FuturesPosition>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/delivery/${settle}/positions/${contract}/leverage`,
      { query: query },
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
  }): Promise<APIResponse<FuturesPosition>> {
    const { settle, contract, ...query } = params;
    return this.postPrivate(
      `/delivery/${settle}/positions/${contract}/risk_limit`,
      { query: query },
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
  submitDeliveryOrder(
    params: SubmitDeliveryFuturesOrderReq,
  ): Promise<APIResponse<FuturesOrder>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/delivery/${settle}/orders`, { body: body });
  }

  /**
   * List futures orders
   *
   * Zero-fill order cannot be retrieved 10 minutes after order cancellation.
   *
   * @param params Parameters for listing futures orders
   * @returns Promise<APIResponse<FuturesOrder[]>>
   */
  getDeliveryOrders(
    params: GetDeliveryOrdersReq,
  ): Promise<APIResponse<FuturesOrder[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/delivery/${settle}/orders`, query);
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
    const { settle, ...query } = params;
    return this.deletePrivate(`/delivery/${settle}/orders`, {
      query: query,
    });
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
   * @returns Promise<APIResponse<GetDeliveryTradingHistoryResp[]>>
   */
  getDeliveryTradingHistory(
    params: GetDeliveryTradingHistoryReq,
  ): Promise<APIResponse<GetDeliveryTradingHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/delivery/${settle}/my_trades`, query);
  }

  /**
   * List position close history
   *
   * @param params Parameters for listing position close history
   * @returns Promise<APIResponse<GetDeliveryClosedPositionsResp[]>>
   */
  getDeliveryClosedPositions(
    params: GetDeliveryClosedPositionsReq,
  ): Promise<APIResponse<GetDeliveryClosedPositionsResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/delivery/${settle}/position_close`, query);
  }

  /**
   * List liquidation history
   *
   * @param params Parameters for listing liquidation history
   * @returns Promise<APIResponse<GetDeliveryLiquidationHistoryResp[]>>
   */
  getDeliveryLiquidationHistory(
    params: GetDeliveryLiquidationHistoryReq,
  ): Promise<APIResponse<GetDeliveryLiquidationHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/delivery/${settle}/liquidates`, query);
  }

  /**
   * List settlement history
   *
   * @param params Parameters for listing settlement history
   * @returns Promise<APIResponse<GetDeliverySettlementHistoryResp[]>>
   */
  getDeliverySettlementHistory(
    params: GetDeliverySettlementHistoryReq,
  ): Promise<APIResponse<GetDeliverySettlementHistoryResp[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/delivery/${settle}/settlements`, query);
  }

  /**
   * Create a price-triggered order
   *
   * @param params Parameters for creating a price-triggered order
   * @returns Promise<APIResponse<{ id: number }>>
   */
  submitDeliveryTriggeredOrder(
    params: submitDeliveryTriggeredOrderReq,
  ): Promise<APIResponse<{ id: number }>> {
    const { settle, ...body } = params;
    return this.postPrivate(`/delivery/${settle}/price_orders`, {
      body: body,
    });
  }

  /**
   * List all auto orders
   *
   * @param params Parameters for listing all auto orders
   * @returns Promise<APIResponse<FuturesPriceTriggeredOrder[]>>
   */
  getDeliveryAutoOrders(
    params: GetDeliveryAutoOrdersReq,
  ): Promise<APIResponse<FuturesPriceTriggeredOrder[]>> {
    const { settle, ...query } = params;
    return this.getPrivate(`/delivery/${settle}/price_orders`, query);
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
    const { settle, ...query } = params;
    return this.deletePrivate(`/delivery/${settle}/price_orders`, {
      query: query,
    });
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
   * @returns Promise<APIResponse<GetOptionsContractsResp[]>>
   */
  getOptionsContracts(params: {
    underlying: string;
    expiration?: number;
  }): Promise<APIResponse<GetOptionsContractsResp[]>> {
    return this.get(`/options/contracts`, params);
  }

  /**
   * Query specified contract detail
   *
   * @param params Parameters for querying specified contract detail
   * @returns Promise<APIResponse<GetOptionsContractsResp>>
   */
  getOptionsContract(params: {
    contract: string;
  }): Promise<APIResponse<GetOptionsContractsResp>> {
    return this.get(`/options/contracts/${params.contract}`);
  }

  /**
   * List settlement history
   *
   * @param params Parameters for listing settlement history
   * @returns Promise<APIResponse<GetOptionsSettlementHistoryResp[]>>
   */
  getOptionsSettlementHistory(
    params: GetOptionsSettlementHistoryReq,
  ): Promise<APIResponse<GetOptionsSettlementHistoryResp[]>> {
    return this.get(`/options/settlements`, params);
  }

  /**
   * Get specified contract's settlement
   *
   * @param params Parameters for retrieving specified contract's settlement
   * @returns Promise<APIResponse<GetOptionsSettlementHistoryResp}>>
   */
  getOptionsContractSettlement(params: {
    contract: string;
    underlying: string;
    at: number;
  }): Promise<APIResponse<GetOptionsSettlementHistoryResp>> {
    const { contract, ...query } = params;
    return this.get(`/options/settlements/${contract}`, query);
  }

  /**
   * List my options settlements
   *
   * @param params Parameters for listing my options settlements
   * @returns Promise<APIResponse<GetOptionsMySettlementsResp[]>>
   */
  getOptionsMySettlements(
    params: GetOptionsMySettlementsReq,
  ): Promise<APIResponse<GetOptionsMySettlementsResp[]>> {
    return this.getPrivate(`/options/my_settlements`, params);
  }

  /**
   * Options order book
   *
   * Bids will be sorted by price from high to low, while asks sorted reversely
   *
   * @param params Parameters for retrieving options order book
   * @returns Promise<APIResponse<GetOptionsOrderBookResp>>
   */
  getOptionsOrderBook(
    params: GetOptionsOrderBookReq,
  ): Promise<APIResponse<GetOptionsOrderBookResp>> {
    return this.get(`/options/order_book`, params);
  }

  /**
   * List tickers of options contracts
   *
   * @param params Parameters for listing tickers of options contracts
   * @returns Promise<APIResponse<GetOptionsTickersResp[]>>
   */
  getOptionsTickers(params: {
    underlying: string;
  }): Promise<APIResponse<GetOptionsTickersResp[]>> {
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
   * @returns Promise<APIResponse<GetOptionsCandlesticksResp[]>>
   */
  getOptionsCandlesticks(
    params: GetOptionsCandlesticksReq,
  ): Promise<APIResponse<GetOptionsCandlesticksResp[]>> {
    return this.get(`/options/candlesticks`, params);
  }

  /**
   * Mark price candlesticks of an underlying
   *
   * @param params Parameters for retrieving mark price candlesticks of an underlying
   * @returns Promise<APIResponse<GetOptionsUnderlyingCandlesticksResp[]>>
   */
  getOptionsUnderlyingCandlesticks(
    params: GetOptionsUnderlyingCandlesticksReq,
  ): Promise<APIResponse<GetOptionsUnderlyingCandlesticksResp[]>> {
    return this.get(`/options/underlying/candlesticks`, params);
  }

  /**
   * Options trade history
   *
   * @param params Parameters for retrieving options trade history
   * @returns Promise<APIResponse<GetOptionsTradesResp[]>>
   */
  getOptionsTrades(
    params: GetOptionsTradesReq,
  ): Promise<APIResponse<GetOptionsTradesResp[]>> {
    return this.get(`/options/trades`, params);
  }

  /**
   * List options account
   *
   * @returns Promise<APIResponse<GetOptionsAccountResp>>
   */
  getOptionsAccount(): Promise<APIResponse<GetOptionsAccountResp>> {
    return this.getPrivate(`/options/accounts`);
  }

  /**
   * List account changing history
   *
   * @param params Parameters for listing account changing history
   * @returns Promise<APIResponse<GetOptionsAccountChangeResp[]>>
   */
  getOptionsAccountChange(
    params?: GetOptionsAccountChangeReq,
  ): Promise<APIResponse<GetOptionsAccountChangeResp[]>> {
    return this.getPrivate(`/options/account_book`, params);
  }

  /**
   * List user's positions of specified underlying
   *
   * @param params Parameters for listing user's positions of specified underlying
   * @returns Promise<APIResponse<GetOptionsPositionsUnderlyingResp[]>>
   */
  getOptionsPositionsUnderlying(params: {
    underlying?: string;
  }): Promise<APIResponse<GetOptionsPositionsUnderlyingResp[]>> {
    return this.getPrivate(`/options/positions`, params);
  }

  /**
   * Get specified contract position
   *
   * @param params Parameters for retrieving specified contract position
   * @returns Promise<APIResponse<GetOptionsPositionsUnderlyingResp>>
   */
  getOptionsPositionContract(params: {
    contract: string;
  }): Promise<APIResponse<GetOptionsPositionsUnderlyingResp>> {
    return this.getPrivate(`/options/positions/${params.contract}`);
  }

  /**
   * List user's liquidation history of specified underlying
   *
   * @param params Parameters for listing user's liquidation history of specified underlying
   * @returns Promise<APIResponse<GetOptionsLiquidationResp[]>>
   */
  getOptionsLiquidation(params: {
    underlying: string;
    contract?: string;
  }): Promise<APIResponse<GetOptionsLiquidationResp[]>> {
    return this.getPrivate(`/options/position_close`, params);
  }

  /**
   * Create an options order
   *
   * @param params Parameters for creating an options order
   * @returns Promise<APIResponse<SubmitOptionsOrderResp>>
   */
  submitOptionsOrder(
    params: SubmitOptionsOrderReq,
  ): Promise<APIResponse<SubmitOptionsOrderResp>> {
    return this.postPrivate(`/options/orders`, { body: params });
  }

  /**
   * List options orders
   *
   * @param params Parameters for listing options orders
   * @returns Promise<APIResponse<SubmitOptionsOrderResp[]>>
   */
  getOptionsOrders(
    params: GetOptionsOrdersReq,
  ): Promise<APIResponse<SubmitOptionsOrderResp[]>> {
    return this.getPrivate(`/options/orders`, params);
  }

  /**
   * Cancel all open orders matched
   *
   * @param params Parameters for canceling all open orders matched
   * @returns Promise<APIResponse<SubmitOptionsOrderResp[]>>
   */
  deleteOptionsOrders(params: {
    contract?: string;
    underlying?: string;
    side?: 'ask' | 'bid';
  }): Promise<APIResponse<SubmitOptionsOrderResp[]>> {
    return this.deletePrivate(`/options/orders`, { query: params });
  }

  /**
   * Get a single order
   *
   * @param params Parameters for retrieving a single order
   * @returns Promise<APIResponse<SubmitOptionsOrderResp>>
   */
  getOptionsOrder(params: {
    order_id: number;
  }): Promise<APIResponse<SubmitOptionsOrderResp>> {
    return this.getPrivate(`/options/orders/${params.order_id}`);
  }

  /**
   * Cancel a single order
   *
   * @param params Parameters for canceling a single order
   * @returns Promise<APIResponse<SubmitOptionsOrderResp>>
   */
  deleteOptionsOrder(params: {
    order_id: number;
  }): Promise<APIResponse<SubmitOptionsOrderResp>> {
    return this.deletePrivate(`/options/orders/${params.order_id}`);
  }

  /**
   * List personal trading history
   *
   * @param params Parameters for listing personal trading history
   * @returns Promise<APIResponse<GetOptionsPersonalHistoryResp[]>>
   */
  getOptionsPersonalHistory(
    params: GetOptionsPersonalHistoryReq,
  ): Promise<APIResponse<GetOptionsPersonalHistoryResp[]>> {
    return this.getPrivate(`/options/my_trades`, params);
  }

  /**==========================================================================================================================
   * EARN UNI
   * ==========================================================================================================================
   */

  /**
   * List currencies for lending
   *
   * @returns Promise<APIResponse<GetLendingCurrenciesResp[]>>
   */
  getLendingCurrencies(): Promise<APIResponse<GetLendingCurrenciesResp[]>> {
    return this.get(`/earn/uni/currencies`);
  }

  /**
   * Get currency detail for lending
   *
   * @param params Parameters for retrieving currency detail for lending
   * @returns Promise<APIResponse<GetLendingCurrenciesResp>>
   */
  getLendingCurrency(params: {
    currency: string;
  }): Promise<APIResponse<GetLendingCurrenciesResp>> {
    return this.get(`/earn/uni/currencies/${params.currency}`);
  }

  /**
   * Lend or redeem
   *
   * @param params Parameters for lending or redeeming
   * @returns Promise<APIResponse<any>>
   */
  submitLendOrRedeem(params: SubmitLendOrRedeemReq): Promise<APIResponse<any>> {
    return this.postPrivate(`/earn/uni/lends`, { body: params });
  }

  /**
   * List user's lending orders
   *
   * @param params Parameters for listing user's lending orders
   * @returns Promise<APIResponse<GetLendingOrdersResp[]>>
   */
  getLendingOrders(
    params?: GetLendingOrdersReq,
  ): Promise<APIResponse<GetLendingOrdersResp[]>> {
    return this.getPrivate(`/earn/uni/lends`, params);
  }

  /**
   * Amend lending order
   *
   * Currently only supports amending the minimum interest rate (hour)
   *
   * @param params Parameters for amending lending order
   * @returns Promise<APIResponse<any>>
   */
  updateLendingOrder(params: {
    currency?: string;
    min_rate?: string;
  }): Promise<APIResponse<any>> {
    return this.patchPrivate(`/earn/uni/lends`, { query: params });
  }

  /**
   * List records of lending
   *
   * @param params Parameters for listing records of lending
   * @returns Promise<APIResponse<GetLendingRecordsResp[]>>
   */
  getLendingRecords(
    params?: GetLendingRecordsReq,
  ): Promise<APIResponse<GetLendingRecordsResp[]>> {
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
   * @returns Promise<APIResponse<GetLendingInterestRecordsResp[]>>
   */
  getLendingInterestRecords(
    params?: GetLendingInterestRecordsReq,
  ): Promise<APIResponse<GetLendingInterestRecordsResp[]>> {
    return this.getPrivate(`/earn/uni/interest_records`, params);
  }

  /**
   * Set interest reinvestment toggle
   *
   * @param params Parameters for setting interest reinvestment toggle
   * @returns Promise<APIResponse<any>>
   */
  updateInterestReinvestment(params: {
    currency: string;
    status: boolean;
  }): Promise<APIResponse<any>> {
    return this.putPrivate(`/earn/uni/interest_reinvest`, { body: params });
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
  submitLoanOrder(
    params: SubmitLoanOrderReq,
  ): Promise<APIResponse<{ order_id: number }>> {
    return this.postPrivate(`/loan/collateral/orders`, { body: params });
  }

  /**
   * List Orders
   *
   * @param params Parameters for listing orders
   * @returns Promise<APIResponse<GetLoanOrdersResp[]>>
   */
  getLoanOrders(
    params?: GetLoanOrdersReq,
  ): Promise<APIResponse<GetLoanOrdersResp[]>> {
    return this.getPrivate(`/loan/collateral/orders`, params);
  }
  /**
   * Get a single order
   *
   * @param params Parameters for retrieving a single order
   * @returns Promise<APIResponse<GetLoanOrdersResp>>
   */
  getLoanOrder(params: {
    order_id: number;
  }): Promise<APIResponse<GetLoanOrdersResp>> {
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
    order_id: number;
    repay_amount: string;
    repaid_all: boolean;
  }): Promise<
    APIResponse<{
      repaid_principal: string;
      repaid_interest: string;
    }>
  > {
    return this.postPrivate(`/loan/collateral/repay`, { body: params });
  }

  /**
   * Repayment history
   *
   * @param params Parameters for retrieving repayment history
   * @returns Promise<APIResponse<GetLoanRepaymentHistoryResp[]>>
   */
  getLoanRepaymentHistory(
    params: GetLoanRepaymentHistoryReq,
  ): Promise<APIResponse<GetLoanRepaymentHistoryResp[]>> {
    return this.getPrivate(`/loan/collateral/repay_records`, params);
  }

  /**
   * Increase or redeem collateral
   *
   * @param params Parameters for increasing or redeeming collateral
   * @returns Promise<APIResponse<any>>
   */
  updateLoanCollateral(
    params: UpdateLoanCollateralReq,
  ): Promise<APIResponse<any>> {
    return this.postPrivate(`/loan/collateral/collaterals`, { body: params });
  }

  /**
   * Query collateral adjustment records
   *
   * @param params Parameters for querying collateral adjustment records
   * @returns Promise<APIResponse<GetLoanCollateralRecordsResp[]>>
   */
  getLoanCollateralRecords(
    params?: GetLoanCollateralRecordsReq,
  ): Promise<APIResponse<GetLoanCollateralRecordsResp[]>> {
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
   * @returns Promise<APIResponse<GetLoanCollateralizationRatioResp>>
   */
  getLoanCollateralizationRatio(params: {
    collateral_currency: string;
    borrow_currency: string;
  }): Promise<APIResponse<GetLoanCollateralizationRatioResp>> {
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
  submitMultiLoanOrder(
    params: SubmitMultiLoanOrderReq,
  ): Promise<APIResponse<{ order_id: number }>> {
    return this.postPrivate(`/loan/multi_collateral/orders`, { body: params });
  }

  /**
   * List Multi-Collateral Orders
   *
   * @param params Parameters for listing multi-collateral orders
   * @returns Promise<APIResponse<GetMultiLoanOrdersResp[]>>
   */
  getMultiLoanOrders(
    params?: GetMultiLoanOrdersReq,
  ): Promise<APIResponse<GetMultiLoanOrdersResp[]>> {
    return this.getPrivate(`/loan/multi_collateral/orders`, params);
  }

  /**
   * Get Multi-Collateral Order Detail
   *
   * @param params Parameters for retrieving a multi-collateral order detail
   * @returns Promise<APIResponse<GetMultiLoanOrdersResp>>
   */
  getMultiLoanOrder(params: {
    order_id: string;
  }): Promise<APIResponse<GetMultiLoanOrdersResp>> {
    return this.getPrivate(`/loan/multi_collateral/orders/${params.order_id}`);
  }

  /**
   * Repay Multi-Collateral Loan
   *
   * @param params Parameters for repaying a multi-collateral loan
   * @returns Promise<APIResponse<RepayMultiLoanResp>>
   */
  repayMultiLoan(
    params: RepayMultiLoanReq,
  ): Promise<APIResponse<RepayMultiLoanResp>> {
    return this.postPrivate(`/loan/multi_collateral/repay`, { body: params });
  }

  /**
   * List Multi-Collateral Repay Records
   *
   * @param params Parameters for listing multi-collateral repay records
   * @returns Promise<APIResponse<GetMultiLoanRepayRecordsResp[]>>
   */
  getMultiLoanRepayRecords(
    params: GetMultiLoanRepayRecordsReq,
  ): Promise<APIResponse<GetMultiLoanRepayRecordsResp[]>> {
    return this.getPrivate(`/loan/multi_collateral/repay`, params);
  }

  /**
   * Operate Multi-Collateral
   *
   * @param params Parameters for operating multi-collateral
   * @returns Promise<APIResponse<UpdateMultiLoanResp>>
   */
  updateMultiLoan(
    params: UpdateMultiLoanReq,
  ): Promise<APIResponse<UpdateMultiLoanResp>> {
    return this.postPrivate(`/loan/multi_collateral/mortgage`, {
      body: params,
    });
  }

  /**
   * Query collateral adjustment records
   *
   * @param params Parameters for querying collateral adjustment records
   * @returns Promise<APIResponse<GetMultiLoanAdjustmentRecordsResp[]>>
   */
  getMultiLoanAdjustmentRecords(
    params?: GetMultiLoanAdjustmentRecordsReq,
  ): Promise<APIResponse<GetMultiLoanAdjustmentRecordsResp[]>> {
    return this.getPrivate(`/loan/multi_collateral/mortgage`, params);
  }

  /**
   * List User Currency Quota
   *
   * @param params Parameters for listing user currency quota
   * @returns Promise<APIResponse<GetMultiLoanCurrencyQuotaResp[]>>
   */
  getMultiLoanCurrencyQuota(params: {
    type: 'collateral' | 'borrow';
    currency: string;
  }): Promise<APIResponse<GetMultiLoanCurrencyQuotaResp[]>> {
    return this.getPrivate(`/loan/multi_collateral/currency_quota`, params);
  }

  /**
   * Query supported borrowing and collateral currencies in Multi-Collateral
   *
   * @returns Promise<APIResponse<GetMultiLoanSupportedCurrenciesResp>>
   */
  getMultiLoanSupportedCurrencies(): Promise<
    APIResponse<GetMultiLoanSupportedCurrenciesResp>
  > {
    return this.get(`/loan/multi_collateral/currencies`);
  }

  /**
   * Get Multi-Collateral ratio
   *
   * @returns Promise<APIResponse<GetMultiLoanRatioResp>>
   */
  getMultiLoanRatio(): Promise<APIResponse<GetMultiLoanRatioResp>> {
    return this.get(`/loan/multi_collateral/ltv`);
  }

  /**
   * Query fixed interest rates for the currency for 7 days and 30 days
   *
   * @returns Promise<APIResponse<GetMultiLoanFixedRatesResp[]>>
   */
  getMultiLoanFixedRates(): Promise<APIResponse<GetMultiLoanFixedRatesResp[]>> {
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
   * @returns Promise<APIResponse<any>>
   */
  submitEth2Swap(params: {
    side: '1' | '2';
    amount: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate(`/earn/staking/eth2/swap`, { body: params });
  }

  /**
   * Dual Investment product list
   *
   * @returns Promise<APIResponse<GetDualInvestmentProductsResp[]>>
   */
  getDualInvestmentProducts(): Promise<
    APIResponse<GetDualInvestmentProductsResp[]>
  > {
    return this.get(`/earn/dual/investment_plan`);
  }

  /**
   * Dual Investment order list
   *
   * @returns Promise<APIResponse<GetDualInvestmentOrdersResp[]>>
   */
  getDualInvestmentOrders(): Promise<
    APIResponse<GetDualInvestmentOrdersResp[]>
  > {
    return this.getPrivate(`/earn/dual/orders`);
  }
  /**
   * Place Dual Investment order
   *
   * @param params Parameters for placing a dual investment order
   * @returns Promise<APIResponse<any>>
   */
  submitDualInvestmentOrder(params: {
    plan_id: string;
    copies: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate(`/earn/dual/orders`, { body: params });
  }

  /**
   * Structured Product List
   *
   * @param params Parameters for listing structured products
   * @returns Promise<APIResponse<GetStructuredProductListResp[]>>
   */
  getStructuredProductList(
    params: GetStructuredProductListReq,
  ): Promise<APIResponse<GetStructuredProductListResp[]>> {
    return this.get(`/earn/structured/products`, params);
  }

  /**
   * Structured Product Order List
   *
   * @param params Parameters for listing structured product orders
   * @returns Promise<APIResponse<GetStructuredProductOrdersResp[]>>
   */
  getStructuredProductOrders(
    params?: GetStructuredProductOrdersReq,
  ): Promise<APIResponse<GetStructuredProductOrdersResp[]>> {
    return this.getPrivate(`/earn/structured/orders`, params);
  }
  /**
   * Place Structured Product Order
   *
   * @param params Parameters for placing a structured product order
   * @returns Promise<APIResponse<any>>
   */
  submitStructuredProductOrder(params: {
    pid?: string;
    amount?: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate(`/earn/structured/orders`, { body: params });
  }

  /**==========================================================================================================================
   * ACCOUNT
   * ==========================================================================================================================
   */

  /**
   * Get account detail
   *
   * @returns Promise<APIResponse<GetAccountDetailResp>>
   */
  getAccountDetail(): Promise<APIResponse<GetAccountDetailResp>> {
    return this.getPrivate(`/account/detail`);
  }

  /**
   * Create STP Group
   *
   * @param params Parameters for creating an STP group
   * @returns Promise<APIResponse<CreateStpGroupResp>>
   */
  createStpGroup(
    params: CreateStpGroupReq,
  ): Promise<APIResponse<CreateStpGroupResp>> {
    return this.postPrivate(`/account/stp_groups`, { body: params });
  }

  /**
   * List STP Groups
   *
   * @param params Parameters for listing STP groups
   * @returns Promise<APIResponse<CreateStpGroupResp[]>>
   */
  getStpGroups(params?: {
    name?: string;
  }): Promise<APIResponse<CreateStpGroupResp[]>> {
    return this.getPrivate(`/account/stp_groups`, params);
  }

  /**
   * List users of the STP group
   *
   * @param params Parameters for listing users of the STP group
   * @returns Promise<APIResponse<StpResp[]>>
   */
  getStpGroupUsers(params: {
    stp_id: number;
  }): Promise<APIResponse<StpResp[]>> {
    return this.getPrivate(`/account/stp_groups/${params.stp_id}/users`);
  }

  /**
   * Add users to the STP group
   *
   * @param params Parameters for adding users to the STP group
   * @returns Promise<APIResponse<StpResp[]>>
   */
  addUsersToStpGroup(params: {
    stp_id: number;
    body: number[];
  }): Promise<APIResponse<StpResp[]>> {
    const { stp_id, ...body } = params;
    return this.postPrivate(`/account/stp_groups/${stp_id}/users`, {
      body: body,
    });
  }

  /**
   * Delete the user in the STP group
   *
   * @param params Parameters for deleting users from the STP group
   * @returns Promise<APIResponse<StpResp[]>>
   */
  deleteUserFromStpGroup(params: {
    stp_id: number;
    user_id: number;
  }): Promise<APIResponse<StpResp[]>> {
    const { stp_id, ...query } = params;
    return this.deletePrivate(`/account/stp_groups/${stp_id}/users`, {
      query: query,
    });
  }

  /**==========================================================================================================================
   * REBATES
   * ==========================================================================================================================
   */

  /**
   * The agency obtains the transaction history of the recommended user.
   * Record time range cannot exceed 30 days.
   *
   * @param params Parameters for retrieving transaction history
   * @returns Promise<APIResponse<GetAgencyTransactionHistoryResp>>
   */
  getAgencyTransactionHistory(
    params: GetAgencyTransactionHistoryReq,
  ): Promise<APIResponse<GetAgencyTransactionHistoryResp>> {
    return this.getPrivate('/rebate/agency/transaction_history', params);
  }

  /**
   * The agency obtains the commission history of the recommended user.
   * Record time range cannot exceed 30 days.
   *
   * @param params Parameters for retrieving commission history
   * @returns Promise<APIResponse<GetAgencyCommissionHistoryResp>>
   */
  getAgencyCommissionHistory(
    params: GetAgencyCommissionHistoryReq,
  ): Promise<APIResponse<GetAgencyCommissionHistoryResp>> {
    return this.getPrivate('/rebate/agency/commission_history', params);
  }

  /**
   * The broker obtains the user's commission rebate records.
   * Record time range cannot exceed 30 days.
   *
   * @param params Parameters for retrieving commission rebate records
   * @returns Promise<APIResponse<GetBrokerCommissionHistoryResp>>
   */
  getBrokerCommissionHistory(
    params: GetBrokerCommissionHistoryReq,
  ): Promise<APIResponse<GetBrokerCommissionHistoryResp>> {
    return this.getPrivate('/rebate/broker/commission_history', params);
  }

  /**
   * The broker obtains the user's trading history.
   * Record time range cannot exceed 30 days.
   *
   * @param params Parameters for retrieving trading history
   * @returns Promise<APIResponse<GetBrokerTransactionHistoryResp>>
   */
  getBrokerTransactionHistory(
    params: GetBrokerTransactionHistoryReq,
  ): Promise<APIResponse<GetBrokerTransactionHistoryResp>> {
    return this.getPrivate('/rebate/broker/transaction_history', params);
  }

  /**
   * User retrieves rebate information.
   */
  getUserRebateInfo(): Promise<APIResponse<{ invite_uid: number }>> {
    return this.getPrivate('/rebate/user/info');
  }
}
