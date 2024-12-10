
# Endpoint maps

<p align="center">
  <a href="https://www.npmjs.com/package/gateio-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/gateio-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/gateio-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

Each REST client is a JavaScript class, which provides functions individually mapped to each endpoint available in the exchange's API offering. 

The following table shows all methods available in each REST client, whether the method requires authentication (automatically handled if API keys are provided), as well as the exact endpoint each method is connected to.

This can be used to easily find which method to call, once you have [found which endpoint you're looking to use](https://github.com/tiagosiebler/awesome-crypto-examples/wiki/How-to-find-SDK-functions-that-match-API-docs-endpoint).

All REST clients are in the [src](/src) folder. For usage examples, make sure to check the [examples](/examples) folder.

List of clients:
- [RestClient](#RestClientts)


If anything is missing or wrong, please open an issue or let us know in our [Node.js Traders](https://t.me/nodetraders) telegram group!

## How to use table

Table consists of 4 parts:

- Function name
- AUTH
- HTTP Method
- Endpoint

**Function name** is the name of the function that can be called through the SDK. Check examples folder in the repo for more help on how to use them!

**AUTH** is a boolean value that indicates if the function requires authentication - which means you need to pass your API key and secret to the SDK.

**HTTP Method** shows HTTP method that the function uses to call the endpoint. Sometimes endpoints can have same URL, but different HTTP method so you can use this column to differentiate between them.

**Endpoint** is the URL that the function uses to call the endpoint. Best way to find exact function you need for the endpoint is to search for URL in this table and find corresponding function name.


# RestClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [RestClient.ts](/src/RestClient.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getSystemMaintenanceStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L406) |  | GET | `/v1/public/system_info` |
| [submitWithdrawal()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L423) | :closed_lock_with_key:  | POST | `/withdrawals` |
| [submitSpotMainAccountTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L437) | :closed_lock_with_key:  | POST | `/withdrawals/push` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L453) | :closed_lock_with_key:  | DELETE | `/withdrawals/{withdrawal_id}` |
| [getCurrencyChains()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L470) |  | GET | `/wallet/currency_chains` |
| [createDepositAddress()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L480) | :closed_lock_with_key:  | GET | `/wallet/deposit_address` |
| [getWithdrawalRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L494) | :closed_lock_with_key:  | GET | `/wallet/withdrawals` |
| [getDepositRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L508) | :closed_lock_with_key:  | GET | `/wallet/deposits` |
| [submitTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L527) | :closed_lock_with_key:  | POST | `/wallet/transfers` |
| [submitMainSubTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L539) | :closed_lock_with_key:  | POST | `/wallet/sub_account_transfers` |
| [getMainSubTransfers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L553) | :closed_lock_with_key:  | GET | `/wallet/sub_account_transfers` |
| [submitSubToSubTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L567) | :closed_lock_with_key:  | POST | `/wallet/sub_account_to_sub_account` |
| [getTransferStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L582) | :closed_lock_with_key:  | GET | `/wallet/order_status` |
| [getWithdrawalStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L598) | :closed_lock_with_key:  | GET | `/wallet/withdraw_status` |
| [getSubBalance()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L613) | :closed_lock_with_key:  | GET | `/wallet/sub_account_balances` |
| [getSubMarginBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L628) | :closed_lock_with_key:  | GET | `/wallet/sub_account_margin_balances` |
| [getSubFuturesBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L640) | :closed_lock_with_key:  | GET | `/wallet/sub_account_futures_balances` |
| [getSubCrossMarginBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L653) | :closed_lock_with_key:  | GET | `/wallet/sub_account_cross_margin_balances` |
| [getSavedAddresses()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L665) | :closed_lock_with_key:  | GET | `/wallet/saved_address` |
| [getTradingFees()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L675) | :closed_lock_with_key:  | GET | `/wallet/fee` |
| [getBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L696) | :closed_lock_with_key:  | GET | `/wallet/total_balance` |
| [getSmallBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L705) | :closed_lock_with_key:  | GET | `/wallet/small_balance` |
| [convertSmallBalance()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L715) | :closed_lock_with_key:  | POST | `/wallet/small_balance` |
| [getSmallBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L728) | :closed_lock_with_key:  | GET | `/wallet/small_balance_history` |
| [getPushOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L740) | :closed_lock_with_key:  | GET | `/wallet/push` |
| [createSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L755) | :closed_lock_with_key:  | POST | `/sub_accounts` |
| [getSubAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L766) | :closed_lock_with_key:  | GET | `/sub_accounts` |
| [getSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L776) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}` |
| [createSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L786) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/keys` |
| [getSubAccountApiKeys()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L798) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}/keys` |
| [updateSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L810) | :closed_lock_with_key:  | PUT | `/sub_accounts/{user_id}/keys/{key}` |
| [deleteSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L821) | :closed_lock_with_key:  | DELETE | `/sub_accounts/{user_id}/keys/{key}` |
| [getSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L836) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}/keys/{key}` |
| [lockSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L851) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/lock` |
| [unlockSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L861) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/unlock` |
| [getSubAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L875) | :closed_lock_with_key:  | GET | `/sub_accounts/unified_mode` |
| [getUnifiedAccountInfo()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L892) | :closed_lock_with_key:  | GET | `/unified/accounts` |
| [getUnifiedMaxBorrow()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L907) | :closed_lock_with_key:  | GET | `/unified/borrowable` |
| [getUnifiedMaxTransferable()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L923) | :closed_lock_with_key:  | GET | `/unified/transferable` |
| [submitUnifiedBorrowOrRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L942) | :closed_lock_with_key:  | POST | `/unified/loans` |
| [getUnifiedLoans()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L954) | :closed_lock_with_key:  | GET | `/unified/loans` |
| [getUnifiedLoanRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L964) | :closed_lock_with_key:  | GET | `/unified/loan_records` |
| [getUnifiedInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L976) | :closed_lock_with_key:  | GET | `/unified/interest_records` |
| [getUnifiedRiskUnitDetails()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L987) | :closed_lock_with_key:  | GET | `/unified/risk_units` |
| [setUnifiedAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L999) | :closed_lock_with_key:  | PUT | `/unified/unified_mode` |
| [getUnifiedAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1008) | :closed_lock_with_key:  | GET | `/unified/unified_mode` |
| [getUnifiedEstimateRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1020) | :closed_lock_with_key:  | GET | `/unified/estimate_rate` |
| [getUnifiedCurrencyDiscountTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1031) |  | GET | `/unified/currency_discount_tiers` |
| [getLoanMarginTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1043) |  | GET | `/unified/loan_margin_tiers` |
| [portfolioMarginCalculate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1060) |  | POST | `/unified/portfolio_calculator` |
| [getUserCurrencyLeverageConfig()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1074) | :closed_lock_with_key:  | GET | `/unified/leverage/user_currency_config` |
| [getUserCurrencyLeverageSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1088) | :closed_lock_with_key:  | GET | `/unified/leverage/user_currency_setting` |
| [updateUserCurrencyLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1103) | :closed_lock_with_key:  | POST | `/unified/leverage/user_currency_setting` |
| [getSpotCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1128) |  | GET | `/spot/currencies` |
| [getSpotCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1138) |  | GET | `/spot/currencies/{currency}` |
| [getSpotCurrencyPairs()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1147) |  | GET | `/spot/currency_pairs` |
| [getSpotCurrencyPair()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1157) |  | GET | `/spot/currency_pairs/{currency_pair}` |
| [getSpotTicker()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1171) |  | GET | `/spot/tickers` |
| [getSpotOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1186) |  | GET | `/spot/order_book` |
| [getSpotTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1199) |  | GET | `/spot/trades` |
| [getSpotCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1211) |  | GET | `/spot/candlesticks` |
| [getSpotFeeRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1223) | :closed_lock_with_key:  | GET | `/spot/fee` |
| [getSpotBatchFeeRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1232) | :closed_lock_with_key:  | GET | `/spot/batch_fee` |
| [getSpotAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1244) | :closed_lock_with_key:  | GET | `/spot/accounts` |
| [getSpotAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1256) | :closed_lock_with_key:  | GET | `/spot/account_book` |
| [submitSpotBatchOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1275) | :closed_lock_with_key:  | POST | `/spot/batch_orders` |
| [getSpotOpenOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1302) | :closed_lock_with_key:  | GET | `/spot/open_orders` |
| [submitSpotClosePosCrossDisabled()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1318) | :closed_lock_with_key:  | POST | `/spot/cross_liquidate_orders` |
| [submitSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1334) | :closed_lock_with_key:  | POST | `/spot/orders` |
| [getSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1351) | :closed_lock_with_key:  | GET | `/spot/orders` |
| [cancelSpotOpenOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1366) | :closed_lock_with_key:  | DELETE | `/spot/orders` |
| [batchCancelSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1394) | :closed_lock_with_key:  | POST | `/spot/cancel_batch_orders` |
| [getSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1419) | :closed_lock_with_key:  | GET | `/spot/orders/{order_id}` |
| [updateSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1436) | :closed_lock_with_key:  | PATCH | `/spot/orders/{order_id}` |
| [cancelSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1464) | :closed_lock_with_key:  | DELETE | `/spot/orders/{order_id}` |
| [getSpotTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1486) | :closed_lock_with_key:  | GET | `/spot/my_trades` |
| [submitSpotCountdownOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1515) | :closed_lock_with_key:  | POST | `/spot/countdown_cancel_all` |
| [batchUpdateSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1534) | :closed_lock_with_key:  | POST | `/spot/amend_batch_orders` |
| [submitSpotPriceTriggerOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1559) | :closed_lock_with_key:  | POST | `/spot/price_orders` |
| [getSpotAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1571) | :closed_lock_with_key:  | GET | `/spot/price_orders` |
| [cancelAllOpenSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1583) | :closed_lock_with_key:  | DELETE | `/spot/price_orders` |
| [getPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1596) | :closed_lock_with_key:  | GET | `/spot/price_orders/{order_id}` |
| [cancelSpotTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1608) | :closed_lock_with_key:  | DELETE | `/spot/price_orders/{order_id}` |
| [getMarginAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1625) | :closed_lock_with_key:  | GET | `/margin/accounts` |
| [getMarginBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1639) | :closed_lock_with_key:  | GET | `/margin/account_book` |
| [getFundingAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1657) | :closed_lock_with_key:  | GET | `/margin/funding_accounts` |
| [updateAutoRepaymentSetting()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1675) | :closed_lock_with_key:  | POST | `/margin/auto_repay` |
| [getAutoRepaymentSetting()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1686) | :closed_lock_with_key:  | GET | `/margin/auto_repay` |
| [getMarginTransferableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1700) | :closed_lock_with_key:  | GET | `/margin/transferable` |
| [getCrossMarginCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1716) |  | GET | `/margin/cross/currencies` |
| [getCrossMarginCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1726) |  | GET | `/margin/cross/currencies/{currency}` |
| [getCrossMarginAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1737) | :closed_lock_with_key:  | GET | `/margin/cross/accounts` |
| [getCrossMarginAccountHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1749) | :closed_lock_with_key:  | GET | `/margin/cross/account_book` |
| [submitCrossMarginBorrowLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1763) | :closed_lock_with_key:  | POST | `/margin/cross/loans` |
| [getCrossMarginBorrowHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1777) | :closed_lock_with_key:  | GET | `/margin/cross/loans` |
| [getCrossMarginBorrowLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1789) | :closed_lock_with_key:  | GET | `/margin/cross/loans/{loan_id}` |
| [submitCrossMarginRepayment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1802) | :closed_lock_with_key:  | POST | `/margin/cross/repayments` |
| [getCrossMarginRepayments()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1817) | :closed_lock_with_key:  | GET | `/margin/cross/repayments` |
| [getCrossMarginInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1829) | :closed_lock_with_key:  | GET | `/margin/cross/interest_records` |
| [getCrossMarginTransferableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1844) | :closed_lock_with_key:  | GET | `/margin/cross/transferable` |
| [getEstimatedInterestRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1859) | :closed_lock_with_key:  | GET | `/margin/cross/estimate_rate` |
| [getCrossMarginBorrowableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1872) | :closed_lock_with_key:  | GET | `/margin/cross/borrowable` |
| [getLendingMarkets()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1888) |  | GET | `/margin/uni/currency_pairs` |
| [getLendingMarket()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1903) |  | GET | `/margin/uni/currency_pairs/{currency_pair}` |
| [getEstimatedInterestRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1915) | :closed_lock_with_key:  | GET | `/margin/uni/estimate_rate` |
| [submitMarginUNIBorrowOrRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1925) | :closed_lock_with_key:  | POST | `/margin/uni/loans` |
| [getMarginUNILoans()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1941) | :closed_lock_with_key:  | GET | `/margin/uni/loans` |
| [getMarginUNILoanRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1951) | :closed_lock_with_key:  | GET | `/margin/uni/loan_records` |
| [getMarginUNIInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1963) | :closed_lock_with_key:  | GET | `/margin/uni/interest_records` |
| [getMarginUNIMaxBorrow()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1975) | :closed_lock_with_key:  | GET | `/margin/uni/borrowable` |
| [getFlashSwapCurrencyPairs()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1991) |  | GET | `/flash_swap/currency_pairs` |
| [submitFlashSwapOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2007) | :closed_lock_with_key:  | POST | `/flash_swap/orders` |
| [getFlashSwapOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2019) | :closed_lock_with_key:  | GET | `/flash_swap/orders` |
| [getFlashSwapOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2031) | :closed_lock_with_key:  | GET | `/flash_swap/orders/{order_id}` |
| [submitFlashSwapOrderPreview()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2041) | :closed_lock_with_key:  | POST | `/flash_swap/orders/preview` |
| [getFuturesContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2058) |  | GET | `/futures/{settle}/contracts` |
| [getFuturesContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2073) |  | GET | `/futures/{settle}/contracts/{contract}` |
| [getFuturesOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2088) |  | GET | `/futures/{settle}/order_book` |
| [getFuturesTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2101) |  | GET | `/futures/{settle}/trades` |
| [getFuturesCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2116) |  | GET | `/futures/{settle}/candlesticks` |
| [getPremiumIndexKLines()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2129) |  | GET | `/futures/{settle}/premium_index` |
| [getFuturesTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2142) |  | GET | `/futures/{settle}/tickers` |
| [getFundingRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2159) |  | GET | `/futures/{settle}/funding_rate` |
| [getFuturesInsuranceBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2178) |  | GET | `/futures/{settle}/insurance` |
| [getFuturesStats()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2197) |  | GET | `/futures/{settle}/contract_stats` |
| [getIndexConstituents()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2208) |  | GET | `/futures/{settle}/index_constituents/{index}` |
| [getLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2225) |  | GET | `/futures/{settle}/liq_orders` |
| [getRiskLimitTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2242) |  | GET | `/futures/{settle}/risk_limit_tiers` |
| [getFuturesAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2253) | :closed_lock_with_key:  | GET | `/futures/{settle}/accounts` |
| [getFuturesAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2267) | :closed_lock_with_key:  | GET | `/futures/{settle}/account_book` |
| [getFuturesPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2280) | :closed_lock_with_key:  | GET | `/futures/{settle}/positions` |
| [getFuturesPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2292) | :closed_lock_with_key:  | GET | `/futures/{settle}/positions/{contract}` |
| [updateFuturesMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2307) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/margin` |
| [updateFuturesLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2324) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/leverage` |
| [updatePositionRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2343) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/risk_limit` |
| [updateFuturesDualMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2363) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_mode` |
| [getDualModePosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2379) | :closed_lock_with_key:  | GET | `/futures/{settle}/dual_comp/positions/{contract}` |
| [updateDualModePositionMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2394) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/margin` |
| [updateDualModePositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2410) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/leverage` |
| [updateDualModePositionRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2426) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/risk_limit` |
| [submitFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2453) | :closed_lock_with_key:  | POST | `/futures/{settle}/orders` |
| [getFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2474) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders` |
| [cancelAllFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2489) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/orders` |
| [getFuturesOrdersByTimeRange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2509) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders_timerange` |
| [submitFuturesBatchOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2532) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_orders` |
| [getFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2557) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders/{order_id}` |
| [cancelFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2574) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/orders/{order_id}` |
| [updateFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2597) | :closed_lock_with_key:  | PUT | `/futures/{settle}/orders/{order_id}` |
| [getFuturesTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2618) | :closed_lock_with_key:  | GET | `/futures/{settle}/my_trades` |
| [getFuturesTradingHistoryByTimeRange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2633) | :closed_lock_with_key:  | GET | `/futures/{settle}/my_trades_timerange` |
| [getFuturesPositionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2646) | :closed_lock_with_key:  | GET | `/futures/{settle}/position_close` |
| [getFuturesLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2659) | :closed_lock_with_key:  | GET | `/futures/{settle}/liquidates` |
| [getFuturesAutoDeleveragingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2672) | :closed_lock_with_key:  | GET | `/futures/{settle}/auto_deleverages` |
| [setFuturesOrderCancelCountdown()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2689) | :closed_lock_with_key:  | POST | `/futures/{settle}/countdown_cancel_all` |
| [getFuturesUserTradingFees()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2706) | :closed_lock_with_key:  | GET | `/futures/{settle}/fee` |
| [batchCancelFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2724) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_cancel_orders` |
| [batchUpdateFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2751) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_amend_orders` |
| [submitFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2773) | :closed_lock_with_key:  | POST | `/futures/{settle}/price_orders` |
| [getFuturesAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2786) | :closed_lock_with_key:  | GET | `/futures/{settle}/price_orders` |
| [cancelAllOpenFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2799) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/price_orders` |
| [getFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2815) | :closed_lock_with_key:  | GET | `/futures/{settle}/price_orders/{order_id}` |
| [cancelFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2830) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/price_orders/{order_id}` |
| [getAllDeliveryContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2850) |  | GET | `/delivery/{settle}/contracts` |
| [getDeliveryContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2862) |  | GET | `/delivery/{settle}/contracts/{contract}` |
| [getDeliveryOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2877) |  | GET | `/delivery/{settle}/order_book` |
| [getDeliveryTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2890) |  | GET | `/delivery/{settle}/trades` |
| [getDeliveryCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2904) |  | GET | `/delivery/{settle}/candlesticks` |
| [getDeliveryTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2915) |  | GET | `/delivery/{settle}/tickers` |
| [getDeliveryInsuranceBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2932) |  | GET | `/delivery/{settle}/insurance` |
| [getDeliveryAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2951) | :closed_lock_with_key:  | GET | `/delivery/{settle}/accounts` |
| [getDeliveryBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2962) | :closed_lock_with_key:  | GET | `/delivery/{settle}/account_book` |
| [getDeliveryPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2973) | :closed_lock_with_key:  | GET | `/delivery/{settle}/positions` |
| [getDeliveryPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2983) | :closed_lock_with_key:  | GET | `/delivery/{settle}/positions/{contract}` |
| [updateDeliveryMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2998) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/margin` |
| [updateDeliveryLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3016) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/leverage` |
| [updateDeliveryRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3034) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/risk_limit` |
| [submitDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3054) | :closed_lock_with_key:  | POST | `/delivery/{settle}/orders` |
| [getDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3069) | :closed_lock_with_key:  | GET | `/delivery/{settle}/orders` |
| [cancelAllDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3081) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/orders` |
| [getDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3100) | :closed_lock_with_key:  | GET | `/delivery/{settle}/orders/{order_id}` |
| [cancelDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3115) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/orders/{order_id}` |
| [getDeliveryTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3130) | :closed_lock_with_key:  | GET | `/delivery/{settle}/my_trades` |
| [getDeliveryClosedPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3143) | :closed_lock_with_key:  | GET | `/delivery/{settle}/position_close` |
| [getDeliveryLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3156) | :closed_lock_with_key:  | GET | `/delivery/{settle}/liquidates` |
| [getDeliverySettlementHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3169) | :closed_lock_with_key:  | GET | `/delivery/{settle}/settlements` |
| [submitDeliveryTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3182) | :closed_lock_with_key:  | POST | `/delivery/{settle}/price_orders` |
| [getDeliveryAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3197) | :closed_lock_with_key:  | GET | `/delivery/{settle}/price_orders` |
| [cancelAllOpenDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3210) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/price_orders` |
| [getDeliveryTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3226) | :closed_lock_with_key:  | GET | `/delivery/{settle}/price_orders/{order_id}` |
| [cancelTriggeredDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3241) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/price_orders/{order_id}` |
| [getOptionsUnderlyings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3260) |  | GET | `/options/underlyings` |
| [getOptionsExpirationTimes()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3270) |  | GET | `/options/expirations` |
| [getOptionsContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3280) |  | GET | `/options/contracts` |
| [getOptionsContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3293) |  | GET | `/options/contracts/{contract}` |
| [getOptionsSettlementHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3303) |  | GET | `/options/settlements` |
| [getOptionsContractSettlement()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3315) |  | GET | `/options/settlements/{contract}` |
| [getOptionsMySettlements()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3330) | :closed_lock_with_key:  | GET | `/options/my_settlements` |
| [getOptionsOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3344) |  | GET | `/options/order_book` |
| [getOptionsTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3356) |  | GET | `/options/tickers` |
| [getOptionsUnderlyingTicker()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3370) |  | GET | `/options/underlying/tickers/{underlying}` |
| [getOptionsCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3384) |  | GET | `/options/candlesticks` |
| [getOptionsUnderlyingCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3394) |  | GET | `/options/underlying/candlesticks` |
| [getOptionsTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3406) |  | GET | `/options/trades` |
| [getOptionsAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3415) | :closed_lock_with_key:  | GET | `/options/accounts` |
| [getOptionsAccountChange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3425) | :closed_lock_with_key:  | GET | `/options/account_book` |
| [getOptionsPositionsUnderlying()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3437) | :closed_lock_with_key:  | GET | `/options/positions` |
| [getOptionsPositionContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3449) | :closed_lock_with_key:  | GET | `/options/positions/{contract}` |
| [getOptionsLiquidation()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3461) | :closed_lock_with_key:  | GET | `/options/position_close` |
| [submitOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3474) | :closed_lock_with_key:  | POST | `/options/orders` |
| [getOptionsOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3486) | :closed_lock_with_key:  | GET | `/options/orders` |
| [cancelAllOpenOptionsOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3498) | :closed_lock_with_key:  | DELETE | `/options/orders` |
| [getOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3512) | :closed_lock_with_key:  | GET | `/options/orders/{order_id}` |
| [cancelOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3524) | :closed_lock_with_key:  | DELETE | `/options/orders/{order_id}` |
| [submitOptionsCountdownCancel()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3543) | :closed_lock_with_key:  | POST | `/options/countdown_cancel_all` |
| [getOptionsPersonalHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3559) | :closed_lock_with_key:  | GET | `/options/my_trades` |
| [setOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3571) | :closed_lock_with_key:  | POST | `/options/mmp` |
| [getOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3583) | :closed_lock_with_key:  | GET | `/options/mmp` |
| [resetOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3595) | :closed_lock_with_key:  | POST | `/options/mmp/reset` |
| [getLendingCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3611) |  | GET | `/earn/uni/currencies` |
| [getLendingCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3621) |  | GET | `/earn/uni/currencies/{currency}` |
| [submitLendOrRedeemOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3631) | :closed_lock_with_key:  | POST | `/earn/uni/lends` |
| [getLendingOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3641) | :closed_lock_with_key:  | GET | `/earn/uni/lends` |
| [updateLendingOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3653) | :closed_lock_with_key:  | PATCH | `/earn/uni/lends` |
| [getLendingRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3666) | :closed_lock_with_key:  | GET | `/earn/uni/lend_records` |
| [getLendingTotalInterest()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3679) | :closed_lock_with_key:  | GET | `/earn/uni/interests/{currency}` |
| [getLendingInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3692) | :closed_lock_with_key:  | GET | `/earn/uni/interest_records` |
| [updateInterestReinvestment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3704) | :closed_lock_with_key:  | PUT | `/earn/uni/interest_reinvest` |
| [getLendingInterestStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3720) | :closed_lock_with_key:  | GET | `/earn/uni/interest_status/{currency}` |
| [submitLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3738) | :closed_lock_with_key:  | POST | `/loan/collateral/orders` |
| [getLoanOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3748) | :closed_lock_with_key:  | GET | `/loan/collateral/orders` |
| [getLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3757) | :closed_lock_with_key:  | GET | `/loan/collateral/orders/{order_id}` |
| [submitLoanRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3770) | :closed_lock_with_key:  | POST | `/loan/collateral/repay` |
| [getLoanRepaymentHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3787) | :closed_lock_with_key:  | GET | `/loan/collateral/repay_records` |
| [updateLoanCollateral()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3799) | :closed_lock_with_key:  | POST | `/loan/collateral/collaterals` |
| [getLoanCollateralRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3809) | :closed_lock_with_key:  | GET | `/loan/collateral/collaterals` |
| [getLoanTotalAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3823) | :closed_lock_with_key:  | GET | `/loan/collateral/total_amount` |
| [getLoanCollateralizationRatio()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3836) | :closed_lock_with_key:  | GET | `/loan/collateral/ltv` |
| [getLoanSupportedCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3852) |  | GET | `/loan/collateral/currencies` |
| [submitMultiLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3872) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/orders` |
| [getMultiLoanOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3884) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/orders` |
| [getMultiLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3896) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/orders/{order_id}` |
| [repayMultiLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3906) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/repay` |
| [getMultiLoanRepayRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3916) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/repay` |
| [updateMultiLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3928) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/mortgage` |
| [getMultiLoanAdjustmentRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3940) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/mortgage` |
| [getMultiLoanCurrencyQuota()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3952) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/currency_quota` |
| [getMultiLoanSupportedCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3964) |  | GET | `/loan/multi_collateral/currencies` |
| [getMultiLoanRatio()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3973) |  | GET | `/loan/multi_collateral/ltv` |
| [getMultiLoanFixedRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3982) |  | GET | `/loan/multi_collateral/fixed_rate` |
| [getMultiLoanCurrentRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3995) |  | GET | `/loan/multi_collateral/current_rate` |
| [submitEth2Swap()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4018) | :closed_lock_with_key:  | POST | `/earn/staking/eth2/swap` |
| [getDualInvestmentProducts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4027) |  | GET | `/earn/dual/investment_plan` |
| [getDualInvestmentOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4036) | :closed_lock_with_key:  | GET | `/earn/dual/orders` |
| [submitDualInvestmentOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4045) | :closed_lock_with_key:  | POST | `/earn/dual/orders` |
| [getStructuredProducts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4060) |  | GET | `/earn/structured/products` |
| [getStructuredProductOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4072) | :closed_lock_with_key:  | GET | `/earn/structured/orders` |
| [submitStructuredProductOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4083) | :closed_lock_with_key:  | POST | `/earn/structured/orders` |
| [getAccountDetail()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4100) | :closed_lock_with_key:  | GET | `/account/detail` |
| [getAccountRateLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4109) | :closed_lock_with_key:  | GET | `/account/rate_limit` |
| [createStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4119) | :closed_lock_with_key:  | POST | `/account/stp_groups` |
| [getStpGroups()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4129) | :closed_lock_with_key:  | GET | `/account/stp_groups` |
| [getStpGroupUsers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4139) | :closed_lock_with_key:  | GET | `/account/stp_groups/{stp_id}/users` |
| [addUsersToStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4149) | :closed_lock_with_key:  | POST | `/account/stp_groups/{stp_id}/users` |
| [deleteUserFromStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4165) | :closed_lock_with_key:  | DELETE | `/account/stp_groups/{stp_id}/users` |
| [setGTDeduction()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4183) | :closed_lock_with_key:  | POST | `/account/debit_fee` |
| [getGTDeduction()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4194) | :closed_lock_with_key:  | GET | `/account/debit_fee` |
| [getAgencyTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4210) | :closed_lock_with_key:  | GET | `/rebate/agency/transaction_history` |
| [getAgencyCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4223) | :closed_lock_with_key:  | GET | `/rebate/agency/commission_history` |
| [getPartnerTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4237) | :closed_lock_with_key:  | GET | `/rebate/partner/transaction_history` |
| [getPartnerCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4252) | :closed_lock_with_key:  | GET | `/rebate/partner/commission_history` |
| [getPartnerSubordinateList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4275) | :closed_lock_with_key:  | GET | `/rebate/partner/sub_list` |
| [getBrokerCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4289) | :closed_lock_with_key:  | GET | `/rebate/broker/commission_history` |
| [getBrokerTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4302) | :closed_lock_with_key:  | GET | `/rebate/broker/transaction_history` |
| [getUserRebateInfo()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4311) | :closed_lock_with_key:  | GET | `/rebate/user/info` |