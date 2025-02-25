
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
| [getSystemMaintenanceStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L410) |  | GET | `/v1/public/system_info` |
| [submitWithdrawal()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L427) | :closed_lock_with_key:  | POST | `/withdrawals` |
| [submitSpotMainAccountTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L441) | :closed_lock_with_key:  | POST | `/withdrawals/push` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L457) | :closed_lock_with_key:  | DELETE | `/withdrawals/{withdrawal_id}` |
| [getCurrencyChains()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L474) |  | GET | `/wallet/currency_chains` |
| [createDepositAddress()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L484) | :closed_lock_with_key:  | GET | `/wallet/deposit_address` |
| [getWithdrawalRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L498) | :closed_lock_with_key:  | GET | `/wallet/withdrawals` |
| [getDepositRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L512) | :closed_lock_with_key:  | GET | `/wallet/deposits` |
| [submitTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L531) | :closed_lock_with_key:  | POST | `/wallet/transfers` |
| [submitMainSubTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L543) | :closed_lock_with_key:  | POST | `/wallet/sub_account_transfers` |
| [getMainSubTransfers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L557) | :closed_lock_with_key:  | GET | `/wallet/sub_account_transfers` |
| [submitSubToSubTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L571) | :closed_lock_with_key:  | POST | `/wallet/sub_account_to_sub_account` |
| [getTransferStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L586) | :closed_lock_with_key:  | GET | `/wallet/order_status` |
| [getWithdrawalStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L602) | :closed_lock_with_key:  | GET | `/wallet/withdraw_status` |
| [getSubBalance()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L617) | :closed_lock_with_key:  | GET | `/wallet/sub_account_balances` |
| [getSubMarginBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L632) | :closed_lock_with_key:  | GET | `/wallet/sub_account_margin_balances` |
| [getSubFuturesBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L644) | :closed_lock_with_key:  | GET | `/wallet/sub_account_futures_balances` |
| [getSubCrossMarginBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L657) | :closed_lock_with_key:  | GET | `/wallet/sub_account_cross_margin_balances` |
| [getSavedAddresses()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L669) | :closed_lock_with_key:  | GET | `/wallet/saved_address` |
| [getTradingFees()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L679) | :closed_lock_with_key:  | GET | `/wallet/fee` |
| [getBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L700) | :closed_lock_with_key:  | GET | `/wallet/total_balance` |
| [getSmallBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L709) | :closed_lock_with_key:  | GET | `/wallet/small_balance` |
| [convertSmallBalance()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L719) | :closed_lock_with_key:  | POST | `/wallet/small_balance` |
| [getSmallBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L732) | :closed_lock_with_key:  | GET | `/wallet/small_balance_history` |
| [getPushOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L744) | :closed_lock_with_key:  | GET | `/wallet/push` |
| [createSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L759) | :closed_lock_with_key:  | POST | `/sub_accounts` |
| [getSubAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L770) | :closed_lock_with_key:  | GET | `/sub_accounts` |
| [getSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L780) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}` |
| [createSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L790) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/keys` |
| [getSubAccountApiKeys()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L802) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}/keys` |
| [updateSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L814) | :closed_lock_with_key:  | PUT | `/sub_accounts/{user_id}/keys/{key}` |
| [deleteSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L825) | :closed_lock_with_key:  | DELETE | `/sub_accounts/{user_id}/keys/{key}` |
| [getSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L840) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}/keys/{key}` |
| [lockSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L855) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/lock` |
| [unlockSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L865) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/unlock` |
| [getSubAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L879) | :closed_lock_with_key:  | GET | `/sub_accounts/unified_mode` |
| [getUnifiedAccountInfo()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L896) | :closed_lock_with_key:  | GET | `/unified/accounts` |
| [getUnifiedMaxBorrow()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L912) | :closed_lock_with_key:  | GET | `/unified/borrowable` |
| [getUnifiedMaxTransferable()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L928) | :closed_lock_with_key:  | GET | `/unified/transferable` |
| [submitUnifiedBorrowOrRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L947) | :closed_lock_with_key:  | POST | `/unified/loans` |
| [getUnifiedLoans()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L959) | :closed_lock_with_key:  | GET | `/unified/loans` |
| [getUnifiedLoanRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L969) | :closed_lock_with_key:  | GET | `/unified/loan_records` |
| [getUnifiedInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L981) | :closed_lock_with_key:  | GET | `/unified/interest_records` |
| [getUnifiedRiskUnitDetails()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L992) | :closed_lock_with_key:  | GET | `/unified/risk_units` |
| [setUnifiedAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1004) | :closed_lock_with_key:  | PUT | `/unified/unified_mode` |
| [getUnifiedAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1013) | :closed_lock_with_key:  | GET | `/unified/unified_mode` |
| [getUnifiedEstimateRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1025) | :closed_lock_with_key:  | GET | `/unified/estimate_rate` |
| [getUnifiedCurrencyDiscountTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1036) |  | GET | `/unified/currency_discount_tiers` |
| [getLoanMarginTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1048) |  | GET | `/unified/loan_margin_tiers` |
| [portfolioMarginCalculate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1065) |  | POST | `/unified/portfolio_calculator` |
| [getUserCurrencyLeverageConfig()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1079) | :closed_lock_with_key:  | GET | `/unified/leverage/user_currency_config` |
| [getUserCurrencyLeverageSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1093) | :closed_lock_with_key:  | GET | `/unified/leverage/user_currency_setting` |
| [updateUserCurrencyLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1108) | :closed_lock_with_key:  | POST | `/unified/leverage/user_currency_setting` |
| [getHistoricalLendingRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1123) | :closed_lock_with_key:  | GET | `/unified/history_loan_rate` |
| [getSpotCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1145) |  | GET | `/spot/currencies` |
| [getSpotCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1155) |  | GET | `/spot/currencies/{currency}` |
| [getSpotCurrencyPairs()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1164) |  | GET | `/spot/currency_pairs` |
| [getSpotCurrencyPair()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1174) |  | GET | `/spot/currency_pairs/{currency_pair}` |
| [getSpotTicker()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1188) |  | GET | `/spot/tickers` |
| [getSpotOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1203) |  | GET | `/spot/order_book` |
| [getSpotTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1216) |  | GET | `/spot/trades` |
| [getSpotCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1228) |  | GET | `/spot/candlesticks` |
| [getSpotFeeRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1240) | :closed_lock_with_key:  | GET | `/spot/fee` |
| [getSpotBatchFeeRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1249) | :closed_lock_with_key:  | GET | `/spot/batch_fee` |
| [getSpotAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1261) | :closed_lock_with_key:  | GET | `/spot/accounts` |
| [getSpotAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1273) | :closed_lock_with_key:  | GET | `/spot/account_book` |
| [submitSpotBatchOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1292) | :closed_lock_with_key:  | POST | `/spot/batch_orders` |
| [getSpotOpenOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1319) | :closed_lock_with_key:  | GET | `/spot/open_orders` |
| [submitSpotClosePosCrossDisabled()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1335) | :closed_lock_with_key:  | POST | `/spot/cross_liquidate_orders` |
| [submitSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1351) | :closed_lock_with_key:  | POST | `/spot/orders` |
| [getSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1368) | :closed_lock_with_key:  | GET | `/spot/orders` |
| [cancelSpotOpenOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1383) | :closed_lock_with_key:  | DELETE | `/spot/orders` |
| [batchCancelSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1411) | :closed_lock_with_key:  | POST | `/spot/cancel_batch_orders` |
| [getSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1436) | :closed_lock_with_key:  | GET | `/spot/orders/{order_id}` |
| [updateSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1453) | :closed_lock_with_key:  | PATCH | `/spot/orders/{order_id}` |
| [cancelSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1481) | :closed_lock_with_key:  | DELETE | `/spot/orders/{order_id}` |
| [getSpotTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1503) | :closed_lock_with_key:  | GET | `/spot/my_trades` |
| [submitSpotCountdownOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1532) | :closed_lock_with_key:  | POST | `/spot/countdown_cancel_all` |
| [batchUpdateSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1551) | :closed_lock_with_key:  | POST | `/spot/amend_batch_orders` |
| [getSpotInsuranceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1578) | :closed_lock_with_key:  | GET | `/spot/insurance_history` |
| [submitSpotPriceTriggerOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1592) | :closed_lock_with_key:  | POST | `/spot/price_orders` |
| [getSpotAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1604) | :closed_lock_with_key:  | GET | `/spot/price_orders` |
| [cancelAllOpenSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1616) | :closed_lock_with_key:  | DELETE | `/spot/price_orders` |
| [getPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1629) | :closed_lock_with_key:  | GET | `/spot/price_orders/{order_id}` |
| [cancelSpotTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1641) | :closed_lock_with_key:  | DELETE | `/spot/price_orders/{order_id}` |
| [getMarginAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1658) | :closed_lock_with_key:  | GET | `/margin/accounts` |
| [getMarginBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1672) | :closed_lock_with_key:  | GET | `/margin/account_book` |
| [getFundingAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1690) | :closed_lock_with_key:  | GET | `/margin/funding_accounts` |
| [updateAutoRepaymentSetting()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1708) | :closed_lock_with_key:  | POST | `/margin/auto_repay` |
| [getAutoRepaymentSetting()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1719) | :closed_lock_with_key:  | GET | `/margin/auto_repay` |
| [getMarginTransferableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1733) | :closed_lock_with_key:  | GET | `/margin/transferable` |
| [getCrossMarginCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1750) |  | GET | `/margin/cross/currencies` |
| [getCrossMarginCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1761) |  | GET | `/margin/cross/currencies/{currency}` |
| [getCrossMarginAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1773) | :closed_lock_with_key:  | GET | `/margin/cross/accounts` |
| [getCrossMarginAccountHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1786) | :closed_lock_with_key:  | GET | `/margin/cross/account_book` |
| [submitCrossMarginBorrowLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1803) | :closed_lock_with_key:  | POST | `/margin/cross/loans` |
| [getCrossMarginBorrowHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1818) | :closed_lock_with_key:  | GET | `/margin/cross/loans` |
| [getCrossMarginBorrowLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1831) | :closed_lock_with_key:  | GET | `/margin/cross/loans/{loan_id}` |
| [submitCrossMarginRepayment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1845) | :closed_lock_with_key:  | POST | `/margin/cross/repayments` |
| [getCrossMarginRepayments()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1861) | :closed_lock_with_key:  | GET | `/margin/cross/repayments` |
| [getCrossMarginInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1874) | :closed_lock_with_key:  | GET | `/margin/cross/interest_records` |
| [getCrossMarginTransferableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1890) | :closed_lock_with_key:  | GET | `/margin/cross/transferable` |
| [getEstimatedInterestRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1906) | :closed_lock_with_key:  | GET | `/margin/cross/estimate_rate` |
| [getCrossMarginBorrowableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1920) | :closed_lock_with_key:  | GET | `/margin/cross/borrowable` |
| [getLendingMarkets()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1936) |  | GET | `/margin/uni/currency_pairs` |
| [getLendingMarket()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1951) |  | GET | `/margin/uni/currency_pairs/{currency_pair}` |
| [getEstimatedInterestRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1963) | :closed_lock_with_key:  | GET | `/margin/uni/estimate_rate` |
| [submitMarginUNIBorrowOrRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1973) | :closed_lock_with_key:  | POST | `/margin/uni/loans` |
| [getMarginUNILoans()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1989) | :closed_lock_with_key:  | GET | `/margin/uni/loans` |
| [getMarginUNILoanRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1999) | :closed_lock_with_key:  | GET | `/margin/uni/loan_records` |
| [getMarginUNIInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2011) | :closed_lock_with_key:  | GET | `/margin/uni/interest_records` |
| [getMarginUNIMaxBorrow()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2023) | :closed_lock_with_key:  | GET | `/margin/uni/borrowable` |
| [getFlashSwapCurrencyPairs()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2039) |  | GET | `/flash_swap/currency_pairs` |
| [submitFlashSwapOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2055) | :closed_lock_with_key:  | POST | `/flash_swap/orders` |
| [getFlashSwapOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2067) | :closed_lock_with_key:  | GET | `/flash_swap/orders` |
| [getFlashSwapOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2079) | :closed_lock_with_key:  | GET | `/flash_swap/orders/{order_id}` |
| [submitFlashSwapOrderPreview()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2089) | :closed_lock_with_key:  | POST | `/flash_swap/orders/preview` |
| [getFuturesContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2106) |  | GET | `/futures/{settle}/contracts` |
| [getFuturesContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2121) |  | GET | `/futures/{settle}/contracts/{contract}` |
| [getFuturesOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2136) |  | GET | `/futures/{settle}/order_book` |
| [getFuturesTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2149) |  | GET | `/futures/{settle}/trades` |
| [getFuturesCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2164) |  | GET | `/futures/{settle}/candlesticks` |
| [getPremiumIndexKLines()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2177) |  | GET | `/futures/{settle}/premium_index` |
| [getFuturesTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2190) |  | GET | `/futures/{settle}/tickers` |
| [getFundingRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2207) |  | GET | `/futures/{settle}/funding_rate` |
| [getFuturesInsuranceBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2226) |  | GET | `/futures/{settle}/insurance` |
| [getFuturesStats()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2245) |  | GET | `/futures/{settle}/contract_stats` |
| [getIndexConstituents()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2256) |  | GET | `/futures/{settle}/index_constituents/{index}` |
| [getLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2273) |  | GET | `/futures/{settle}/liq_orders` |
| [getRiskLimitTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2290) |  | GET | `/futures/{settle}/risk_limit_tiers` |
| [getFuturesAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2301) | :closed_lock_with_key:  | GET | `/futures/{settle}/accounts` |
| [getFuturesAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2315) | :closed_lock_with_key:  | GET | `/futures/{settle}/account_book` |
| [getFuturesPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2328) | :closed_lock_with_key:  | GET | `/futures/{settle}/positions` |
| [getFuturesPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2340) | :closed_lock_with_key:  | GET | `/futures/{settle}/positions/{contract}` |
| [updateFuturesMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2355) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/margin` |
| [updateFuturesLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2372) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/leverage` |
| [updatePositionRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2391) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/risk_limit` |
| [updateFuturesDualMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2411) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_mode` |
| [getDualModePosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2427) | :closed_lock_with_key:  | GET | `/futures/{settle}/dual_comp/positions/{contract}` |
| [updateDualModePositionMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2442) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/margin` |
| [updateDualModePositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2458) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/leverage` |
| [updateDualModePositionRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2474) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/risk_limit` |
| [submitFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2501) | :closed_lock_with_key:  | POST | `/futures/{settle}/orders` |
| [getFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2522) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders` |
| [cancelAllFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2537) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/orders` |
| [getFuturesOrdersByTimeRange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2557) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders_timerange` |
| [submitFuturesBatchOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2580) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_orders` |
| [getFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2605) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders/{order_id}` |
| [cancelFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2622) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/orders/{order_id}` |
| [updateFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2645) | :closed_lock_with_key:  | PUT | `/futures/{settle}/orders/{order_id}` |
| [getFuturesTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2666) | :closed_lock_with_key:  | GET | `/futures/{settle}/my_trades` |
| [getFuturesTradingHistoryByTimeRange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2681) | :closed_lock_with_key:  | GET | `/futures/{settle}/my_trades_timerange` |
| [getFuturesPositionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2694) | :closed_lock_with_key:  | GET | `/futures/{settle}/position_close` |
| [getFuturesLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2707) | :closed_lock_with_key:  | GET | `/futures/{settle}/liquidates` |
| [getFuturesAutoDeleveragingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2720) | :closed_lock_with_key:  | GET | `/futures/{settle}/auto_deleverages` |
| [setFuturesOrderCancelCountdown()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2737) | :closed_lock_with_key:  | POST | `/futures/{settle}/countdown_cancel_all` |
| [getFuturesUserTradingFees()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2754) | :closed_lock_with_key:  | GET | `/futures/{settle}/fee` |
| [batchCancelFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2772) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_cancel_orders` |
| [batchUpdateFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2799) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_amend_orders` |
| [submitFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2821) | :closed_lock_with_key:  | POST | `/futures/{settle}/price_orders` |
| [getFuturesAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2834) | :closed_lock_with_key:  | GET | `/futures/{settle}/price_orders` |
| [cancelAllOpenFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2847) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/price_orders` |
| [getFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2863) | :closed_lock_with_key:  | GET | `/futures/{settle}/price_orders/{order_id}` |
| [cancelFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2878) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/price_orders/{order_id}` |
| [getAllDeliveryContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2898) |  | GET | `/delivery/{settle}/contracts` |
| [getDeliveryContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2910) |  | GET | `/delivery/{settle}/contracts/{contract}` |
| [getDeliveryOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2925) |  | GET | `/delivery/{settle}/order_book` |
| [getDeliveryTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2938) |  | GET | `/delivery/{settle}/trades` |
| [getDeliveryCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2952) |  | GET | `/delivery/{settle}/candlesticks` |
| [getDeliveryTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2963) |  | GET | `/delivery/{settle}/tickers` |
| [getDeliveryInsuranceBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2980) |  | GET | `/delivery/{settle}/insurance` |
| [getDeliveryAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2999) | :closed_lock_with_key:  | GET | `/delivery/{settle}/accounts` |
| [getDeliveryBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3010) | :closed_lock_with_key:  | GET | `/delivery/{settle}/account_book` |
| [getDeliveryPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3021) | :closed_lock_with_key:  | GET | `/delivery/{settle}/positions` |
| [getDeliveryPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3031) | :closed_lock_with_key:  | GET | `/delivery/{settle}/positions/{contract}` |
| [updateDeliveryMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3046) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/margin` |
| [updateDeliveryLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3064) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/leverage` |
| [updateDeliveryRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3082) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/risk_limit` |
| [submitDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3102) | :closed_lock_with_key:  | POST | `/delivery/{settle}/orders` |
| [getDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3117) | :closed_lock_with_key:  | GET | `/delivery/{settle}/orders` |
| [cancelAllDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3129) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/orders` |
| [getDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3148) | :closed_lock_with_key:  | GET | `/delivery/{settle}/orders/{order_id}` |
| [cancelDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3163) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/orders/{order_id}` |
| [getDeliveryTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3178) | :closed_lock_with_key:  | GET | `/delivery/{settle}/my_trades` |
| [getDeliveryClosedPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3191) | :closed_lock_with_key:  | GET | `/delivery/{settle}/position_close` |
| [getDeliveryLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3204) | :closed_lock_with_key:  | GET | `/delivery/{settle}/liquidates` |
| [getDeliverySettlementHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3217) | :closed_lock_with_key:  | GET | `/delivery/{settle}/settlements` |
| [submitDeliveryTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3230) | :closed_lock_with_key:  | POST | `/delivery/{settle}/price_orders` |
| [getDeliveryAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3245) | :closed_lock_with_key:  | GET | `/delivery/{settle}/price_orders` |
| [cancelAllOpenDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3258) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/price_orders` |
| [getDeliveryTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3274) | :closed_lock_with_key:  | GET | `/delivery/{settle}/price_orders/{order_id}` |
| [cancelTriggeredDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3289) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/price_orders/{order_id}` |
| [getOptionsUnderlyings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3308) |  | GET | `/options/underlyings` |
| [getOptionsExpirationTimes()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3318) |  | GET | `/options/expirations` |
| [getOptionsContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3328) |  | GET | `/options/contracts` |
| [getOptionsContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3341) |  | GET | `/options/contracts/{contract}` |
| [getOptionsSettlementHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3351) |  | GET | `/options/settlements` |
| [getOptionsContractSettlement()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3363) |  | GET | `/options/settlements/{contract}` |
| [getOptionsMySettlements()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3378) | :closed_lock_with_key:  | GET | `/options/my_settlements` |
| [getOptionsOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3392) |  | GET | `/options/order_book` |
| [getOptionsTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3404) |  | GET | `/options/tickers` |
| [getOptionsUnderlyingTicker()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3418) |  | GET | `/options/underlying/tickers/{underlying}` |
| [getOptionsCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3432) |  | GET | `/options/candlesticks` |
| [getOptionsUnderlyingCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3442) |  | GET | `/options/underlying/candlesticks` |
| [getOptionsTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3454) |  | GET | `/options/trades` |
| [getOptionsAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3463) | :closed_lock_with_key:  | GET | `/options/accounts` |
| [getOptionsAccountChange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3473) | :closed_lock_with_key:  | GET | `/options/account_book` |
| [getOptionsPositionsUnderlying()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3485) | :closed_lock_with_key:  | GET | `/options/positions` |
| [getOptionsPositionContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3497) | :closed_lock_with_key:  | GET | `/options/positions/{contract}` |
| [getOptionsLiquidation()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3509) | :closed_lock_with_key:  | GET | `/options/position_close` |
| [submitOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3522) | :closed_lock_with_key:  | POST | `/options/orders` |
| [getOptionsOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3534) | :closed_lock_with_key:  | GET | `/options/orders` |
| [cancelAllOpenOptionsOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3546) | :closed_lock_with_key:  | DELETE | `/options/orders` |
| [getOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3560) | :closed_lock_with_key:  | GET | `/options/orders/{order_id}` |
| [cancelOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3572) | :closed_lock_with_key:  | DELETE | `/options/orders/{order_id}` |
| [submitOptionsCountdownCancel()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3591) | :closed_lock_with_key:  | POST | `/options/countdown_cancel_all` |
| [getOptionsPersonalHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3607) | :closed_lock_with_key:  | GET | `/options/my_trades` |
| [setOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3619) | :closed_lock_with_key:  | POST | `/options/mmp` |
| [getOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3631) | :closed_lock_with_key:  | GET | `/options/mmp` |
| [resetOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3643) | :closed_lock_with_key:  | POST | `/options/mmp/reset` |
| [getLendingCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3659) |  | GET | `/earn/uni/currencies` |
| [getLendingCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3669) |  | GET | `/earn/uni/currencies/{currency}` |
| [submitLendOrRedeemOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3679) | :closed_lock_with_key:  | POST | `/earn/uni/lends` |
| [getLendingOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3689) | :closed_lock_with_key:  | GET | `/earn/uni/lends` |
| [updateLendingOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3701) | :closed_lock_with_key:  | PATCH | `/earn/uni/lends` |
| [getLendingRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3714) | :closed_lock_with_key:  | GET | `/earn/uni/lend_records` |
| [getLendingTotalInterest()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3727) | :closed_lock_with_key:  | GET | `/earn/uni/interests/{currency}` |
| [getLendingInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3740) | :closed_lock_with_key:  | GET | `/earn/uni/interest_records` |
| [updateInterestReinvestment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3752) | :closed_lock_with_key:  | PUT | `/earn/uni/interest_reinvest` |
| [getLendingInterestStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3768) | :closed_lock_with_key:  | GET | `/earn/uni/interest_status/{currency}` |
| [submitLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3786) | :closed_lock_with_key:  | POST | `/loan/collateral/orders` |
| [getLoanOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3796) | :closed_lock_with_key:  | GET | `/loan/collateral/orders` |
| [getLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3805) | :closed_lock_with_key:  | GET | `/loan/collateral/orders/{order_id}` |
| [submitLoanRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3818) | :closed_lock_with_key:  | POST | `/loan/collateral/repay` |
| [getLoanRepaymentHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3835) | :closed_lock_with_key:  | GET | `/loan/collateral/repay_records` |
| [updateLoanCollateral()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3847) | :closed_lock_with_key:  | POST | `/loan/collateral/collaterals` |
| [getLoanCollateralRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3857) | :closed_lock_with_key:  | GET | `/loan/collateral/collaterals` |
| [getLoanTotalAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3871) | :closed_lock_with_key:  | GET | `/loan/collateral/total_amount` |
| [getLoanCollateralizationRatio()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3884) | :closed_lock_with_key:  | GET | `/loan/collateral/ltv` |
| [getLoanSupportedCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3900) |  | GET | `/loan/collateral/currencies` |
| [submitMultiLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3920) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/orders` |
| [getMultiLoanOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3932) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/orders` |
| [getMultiLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3944) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/orders/{order_id}` |
| [repayMultiLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3954) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/repay` |
| [getMultiLoanRepayRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3964) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/repay` |
| [updateMultiLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3976) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/mortgage` |
| [getMultiLoanAdjustmentRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3988) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/mortgage` |
| [getMultiLoanCurrencyQuota()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4000) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/currency_quota` |
| [getMultiLoanSupportedCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4012) |  | GET | `/loan/multi_collateral/currencies` |
| [getMultiLoanRatio()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4021) |  | GET | `/loan/multi_collateral/ltv` |
| [getMultiLoanFixedRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4030) |  | GET | `/loan/multi_collateral/fixed_rate` |
| [getMultiLoanCurrentRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4043) |  | GET | `/loan/multi_collateral/current_rate` |
| [submitEth2Swap()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4066) | :closed_lock_with_key:  | POST | `/earn/staking/eth2/swap` |
| [getDualInvestmentProducts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4075) |  | GET | `/earn/dual/investment_plan` |
| [getDualInvestmentOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4084) | :closed_lock_with_key:  | GET | `/earn/dual/orders` |
| [submitDualInvestmentOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4093) | :closed_lock_with_key:  | POST | `/earn/dual/orders` |
| [getStructuredProducts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4108) |  | GET | `/earn/structured/products` |
| [getStructuredProductOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4120) | :closed_lock_with_key:  | GET | `/earn/structured/orders` |
| [submitStructuredProductOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4131) | :closed_lock_with_key:  | POST | `/earn/structured/orders` |
| [getAccountDetail()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4148) | :closed_lock_with_key:  | GET | `/account/detail` |
| [getAccountRateLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4157) | :closed_lock_with_key:  | GET | `/account/rate_limit` |
| [createStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4167) | :closed_lock_with_key:  | POST | `/account/stp_groups` |
| [getStpGroups()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4177) | :closed_lock_with_key:  | GET | `/account/stp_groups` |
| [getStpGroupUsers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4187) | :closed_lock_with_key:  | GET | `/account/stp_groups/{stp_id}/users` |
| [addUsersToStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4197) | :closed_lock_with_key:  | POST | `/account/stp_groups/{stp_id}/users` |
| [deleteUserFromStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4213) | :closed_lock_with_key:  | DELETE | `/account/stp_groups/{stp_id}/users` |
| [setGTDeduction()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4231) | :closed_lock_with_key:  | POST | `/account/debit_fee` |
| [getGTDeduction()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4242) | :closed_lock_with_key:  | GET | `/account/debit_fee` |
| [getAgencyTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4258) | :closed_lock_with_key:  | GET | `/rebate/agency/transaction_history` |
| [getAgencyCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4271) | :closed_lock_with_key:  | GET | `/rebate/agency/commission_history` |
| [getPartnerTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4285) | :closed_lock_with_key:  | GET | `/rebate/partner/transaction_history` |
| [getPartnerCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4300) | :closed_lock_with_key:  | GET | `/rebate/partner/commission_history` |
| [getPartnerSubordinateList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4323) | :closed_lock_with_key:  | GET | `/rebate/partner/sub_list` |
| [getBrokerCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4337) | :closed_lock_with_key:  | GET | `/rebate/broker/commission_history` |
| [getBrokerTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4350) | :closed_lock_with_key:  | GET | `/rebate/broker/transaction_history` |
| [getUserRebateInfo()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4359) | :closed_lock_with_key:  | GET | `/rebate/user/info` |