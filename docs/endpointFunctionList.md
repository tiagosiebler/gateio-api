
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
- [WebsocketAPIClient](#WebsocketAPIClientts)


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
| [getSystemMaintenanceStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L657) |  | GET | `/v1/public/system_info` |
| [submitWithdrawal()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L674) | :closed_lock_with_key:  | POST | `/withdrawals` |
| [submitSpotMainAccountTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L688) | :closed_lock_with_key:  | POST | `/withdrawals/push` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L704) | :closed_lock_with_key:  | DELETE | `/withdrawals/{withdrawal_id}` |
| [getCurrencyChains()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L721) |  | GET | `/wallet/currency_chains` |
| [createDepositAddress()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L731) | :closed_lock_with_key:  | GET | `/wallet/deposit_address` |
| [getWithdrawalRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L745) | :closed_lock_with_key:  | GET | `/wallet/withdrawals` |
| [getDepositRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L759) | :closed_lock_with_key:  | GET | `/wallet/deposits` |
| [submitTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L778) | :closed_lock_with_key:  | POST | `/wallet/transfers` |
| [submitMainSubTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L790) | :closed_lock_with_key:  | POST | `/wallet/sub_account_transfers` |
| [getMainSubTransfers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L804) | :closed_lock_with_key:  | GET | `/wallet/sub_account_transfers` |
| [submitSubToSubTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L818) | :closed_lock_with_key:  | POST | `/wallet/sub_account_to_sub_account` |
| [getTransferStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L833) | :closed_lock_with_key:  | GET | `/wallet/order_status` |
| [getWithdrawalStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L849) | :closed_lock_with_key:  | GET | `/wallet/withdraw_status` |
| [getSubBalance()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L861) | :closed_lock_with_key:  | GET | `/wallet/sub_account_balances` |
| [getSubMarginBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L873) | :closed_lock_with_key:  | GET | `/wallet/sub_account_margin_balances` |
| [getSubFuturesBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L885) | :closed_lock_with_key:  | GET | `/wallet/sub_account_futures_balances` |
| [getSubCrossMarginBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L898) | :closed_lock_with_key:  | GET | `/wallet/sub_account_cross_margin_balances` |
| [getSavedAddresses()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L910) | :closed_lock_with_key:  | GET | `/wallet/saved_address` |
| [getTradingFees()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L920) | :closed_lock_with_key:  | GET | `/wallet/fee` |
| [getBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L941) | :closed_lock_with_key:  | GET | `/wallet/total_balance` |
| [getSmallBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L950) | :closed_lock_with_key:  | GET | `/wallet/small_balance` |
| [convertSmallBalance()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L960) | :closed_lock_with_key:  | POST | `/wallet/small_balance` |
| [getSmallBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L973) | :closed_lock_with_key:  | GET | `/wallet/small_balance_history` |
| [getPushOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L985) | :closed_lock_with_key:  | GET | `/wallet/push` |
| [getLowCapExchangeList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L994) | :closed_lock_with_key:  | GET | `/wallet/getLowCapExchangeList` |
| [createSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1009) | :closed_lock_with_key:  | POST | `/sub_accounts` |
| [getSubAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1020) | :closed_lock_with_key:  | GET | `/sub_accounts` |
| [getSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1030) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}` |
| [createSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1040) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/keys` |
| [getSubAccountApiKeys()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1053) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}/keys` |
| [updateSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1067) | :closed_lock_with_key:  | PUT | `/sub_accounts/{user_id}/keys/{key}` |
| [deleteSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1078) | :closed_lock_with_key:  | DELETE | `/sub_accounts/{user_id}/keys/{key}` |
| [getSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1093) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}/keys/{key}` |
| [lockSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1108) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/lock` |
| [unlockSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1118) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/unlock` |
| [getSubAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1132) | :closed_lock_with_key:  | GET | `/sub_accounts/unified_mode` |
| [getUnifiedAccountInfo()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1151) | :closed_lock_with_key:  | GET | `/unified/accounts` |
| [getUnifiedMaxBorrow()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1167) | :closed_lock_with_key:  | GET | `/unified/borrowable` |
| [getUnifiedMaxTransferable()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1183) | :closed_lock_with_key:  | GET | `/unified/transferable` |
| [getUnifiedMaxTransferables()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1198) | :closed_lock_with_key:  | GET | `/unified/transferables` |
| [getUnifiedBatchMaxBorrowable()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1207) | :closed_lock_with_key:  | GET | `/unified/batch_borrowable` |
| [submitUnifiedBorrowOrRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1225) | :closed_lock_with_key:  | POST | `/unified/loans` |
| [getUnifiedLoans()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1237) | :closed_lock_with_key:  | GET | `/unified/loans` |
| [getUnifiedLoanRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1247) | :closed_lock_with_key:  | GET | `/unified/loan_records` |
| [getUnifiedInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1259) | :closed_lock_with_key:  | GET | `/unified/interest_records` |
| [getUnifiedRiskUnitDetails()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1270) | :closed_lock_with_key:  | GET | `/unified/risk_units` |
| [setUnifiedAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1282) | :closed_lock_with_key:  | PUT | `/unified/unified_mode` |
| [getUnifiedAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1291) | :closed_lock_with_key:  | GET | `/unified/unified_mode` |
| [getUnifiedEstimateRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1303) | :closed_lock_with_key:  | GET | `/unified/estimate_rate` |
| [getUnifiedCurrencyDiscountTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1314) |  | GET | `/unified/currency_discount_tiers` |
| [getLoanMarginTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1326) |  | GET | `/unified/loan_margin_tiers` |
| [portfolioMarginCalculate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1343) |  | POST | `/unified/portfolio_calculator` |
| [getUserCurrencyLeverageConfig()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1357) | :closed_lock_with_key:  | GET | `/unified/leverage/user_currency_config` |
| [getUserCurrencyLeverageSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1371) | :closed_lock_with_key:  | GET | `/unified/leverage/user_currency_setting` |
| [updateUserCurrencyLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1386) | :closed_lock_with_key:  | POST | `/unified/leverage/user_currency_setting` |
| [getUnifiedLoanCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1401) | :closed_lock_with_key:  | GET | `/unified/currencies` |
| [getHistoricalLendingRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1413) | :closed_lock_with_key:  | GET | `/unified/history_loan_rate` |
| [submitUnifiedLoanRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1419) | :closed_lock_with_key:  | POST | `/unified/loans/repay` |
| [getEstimatedQuickRepayment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1426) | :closed_lock_with_key:  | GET | `/unified/estimated_quick_repayment` |
| [createQuickRepayment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1433) | :closed_lock_with_key:  | POST | `/unified/quick_repayment` |
| [setUnifiedDeltaNeutral()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1444) | :closed_lock_with_key:  | POST | `/unified/delta_neutral` |
| [getUnifiedDeltaNeutral()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1453) | :closed_lock_with_key:  | GET | `/unified/delta_neutral` |
| [getSpotCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1473) |  | GET | `/spot/currencies` |
| [getSpotCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1483) |  | GET | `/spot/currencies/{currency}` |
| [getSpotCurrencyPairs()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1492) |  | GET | `/spot/currency_pairs` |
| [getSpotCurrencyPair()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1502) |  | GET | `/spot/currency_pairs/{currency_pair}` |
| [getSpotTicker()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1516) |  | GET | `/spot/tickers` |
| [getSpotOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1531) |  | GET | `/spot/order_book` |
| [getSpotTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1544) |  | GET | `/spot/trades` |
| [getSpotCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1556) |  | GET | `/spot/candlesticks` |
| [getSpotFeeRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1568) | :closed_lock_with_key:  | GET | `/spot/fee` |
| [getSpotBatchFeeRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1577) | :closed_lock_with_key:  | GET | `/spot/batch_fee` |
| [getSpotAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1589) | :closed_lock_with_key:  | GET | `/spot/accounts` |
| [getSpotAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1601) | :closed_lock_with_key:  | GET | `/spot/account_book` |
| [submitSpotBatchOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1620) | :closed_lock_with_key:  | POST | `/spot/batch_orders` |
| [getSpotOpenOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1647) | :closed_lock_with_key:  | GET | `/spot/open_orders` |
| [submitSpotClosePosCrossDisabled()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1663) | :closed_lock_with_key:  | POST | `/spot/cross_liquidate_orders` |
| [submitSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1679) | :closed_lock_with_key:  | POST | `/spot/orders` |
| [getSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1696) | :closed_lock_with_key:  | GET | `/spot/orders` |
| [cancelSpotOpenOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1711) | :closed_lock_with_key:  | DELETE | `/spot/orders` |
| [batchCancelSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1739) | :closed_lock_with_key:  | POST | `/spot/cancel_batch_orders` |
| [getSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1764) | :closed_lock_with_key:  | GET | `/spot/orders/{order_id}` |
| [updateSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1781) | :closed_lock_with_key:  | PATCH | `/spot/orders/{order_id}` |
| [cancelSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1809) | :closed_lock_with_key:  | DELETE | `/spot/orders/{order_id}` |
| [getSpotTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1838) | :closed_lock_with_key:  | GET | `/spot/my_trades` |
| [submitSpotCountdownOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1867) | :closed_lock_with_key:  | POST | `/spot/countdown_cancel_all` |
| [batchUpdateSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1886) | :closed_lock_with_key:  | POST | `/spot/amend_batch_orders` |
| [getSpotInsuranceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1913) | :closed_lock_with_key:  | GET | `/spot/insurance_history` |
| [submitSpotPriceTriggerOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1927) | :closed_lock_with_key:  | POST | `/spot/price_orders` |
| [getSpotAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1939) | :closed_lock_with_key:  | GET | `/spot/price_orders` |
| [cancelAllOpenSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1951) | :closed_lock_with_key:  | DELETE | `/spot/price_orders` |
| [getPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1964) | :closed_lock_with_key:  | GET | `/spot/price_orders/{order_id}` |
| [cancelSpotTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1976) | :closed_lock_with_key:  | DELETE | `/spot/price_orders/{order_id}` |
| [setCollateralCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1990) | :closed_lock_with_key:  | POST | `/unified/collateral_currencies` |
| [getMarginAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2011) | :closed_lock_with_key:  | GET | `/margin/accounts` |
| [getMarginBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2025) | :closed_lock_with_key:  | GET | `/margin/account_book` |
| [getFundingAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2043) | :closed_lock_with_key:  | GET | `/margin/funding_accounts` |
| [updateAutoRepaymentSetting()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2061) | :closed_lock_with_key:  | POST | `/margin/auto_repay` |
| [getAutoRepaymentSetting()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2072) | :closed_lock_with_key:  | GET | `/margin/auto_repay` |
| [getMarginTransferableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2086) | :closed_lock_with_key:  | GET | `/margin/transferable` |
| [getCrossMarginCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2103) |  | GET | `/margin/cross/currencies` |
| [getCrossMarginCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2114) |  | GET | `/margin/cross/currencies/{currency}` |
| [getCrossMarginAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2126) | :closed_lock_with_key:  | GET | `/margin/cross/accounts` |
| [getCrossMarginAccountHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2139) | :closed_lock_with_key:  | GET | `/margin/cross/account_book` |
| [submitCrossMarginBorrowLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2156) | :closed_lock_with_key:  | POST | `/margin/cross/loans` |
| [getCrossMarginBorrowHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2171) | :closed_lock_with_key:  | GET | `/margin/cross/loans` |
| [getCrossMarginBorrowLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2184) | :closed_lock_with_key:  | GET | `/margin/cross/loans/{loan_id}` |
| [submitCrossMarginRepayment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2199) | :closed_lock_with_key:  | POST | `/margin/cross/repayments` |
| [getCrossMarginRepayments()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2215) | :closed_lock_with_key:  | GET | `/margin/cross/repayments` |
| [getCrossMarginInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2228) | :closed_lock_with_key:  | GET | `/margin/cross/interest_records` |
| [getCrossMarginTransferableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2244) | :closed_lock_with_key:  | GET | `/margin/cross/transferable` |
| [getEstimatedInterestRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2260) | :closed_lock_with_key:  | GET | `/margin/cross/estimate_rate` |
| [getCrossMarginBorrowableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2274) | :closed_lock_with_key:  | GET | `/margin/cross/borrowable` |
| [getMarginUserLoanTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2287) | :closed_lock_with_key:  | GET | `/margin/user/loan_margin_tiers` |
| [getMarginPublicLoanTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2303) |  | GET | `/margin/loan_margin_tiers` |
| [setMarginUserLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2319) | :closed_lock_with_key:  | POST | `/margin/leverage/user_market_setting` |
| [getMarginUserAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2336) | :closed_lock_with_key:  | GET | `/margin/user/account` |
| [getLendingMarkets()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2351) |  | GET | `/margin/uni/currency_pairs` |
| [getLendingMarket()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2366) |  | GET | `/margin/uni/currency_pairs/{currency_pair}` |
| [getEstimatedInterestRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2378) | :closed_lock_with_key:  | GET | `/margin/uni/estimate_rate` |
| [submitMarginUNIBorrowOrRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2388) | :closed_lock_with_key:  | POST | `/margin/uni/loans` |
| [getMarginUNILoans()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2404) | :closed_lock_with_key:  | GET | `/margin/uni/loans` |
| [getMarginUNILoanRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2414) | :closed_lock_with_key:  | GET | `/margin/uni/loan_records` |
| [getMarginUNIInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2426) | :closed_lock_with_key:  | GET | `/margin/uni/interest_records` |
| [getMarginUNIMaxBorrow()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2438) | :closed_lock_with_key:  | GET | `/margin/uni/borrowable` |
| [getFlashSwapCurrencyPairs()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2454) |  | GET | `/flash_swap/currency_pairs` |
| [submitFlashSwapOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2470) | :closed_lock_with_key:  | POST | `/flash_swap/orders` |
| [getFlashSwapOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2482) | :closed_lock_with_key:  | GET | `/flash_swap/orders` |
| [getFlashSwapOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2494) | :closed_lock_with_key:  | GET | `/flash_swap/orders/{order_id}` |
| [submitFlashSwapOrderPreview()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2504) | :closed_lock_with_key:  | POST | `/flash_swap/orders/preview` |
| [getFuturesContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2521) |  | GET | `/futures/{settle}/contracts` |
| [getFuturesContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2536) |  | GET | `/futures/{settle}/contracts/{contract}` |
| [getFuturesOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2551) |  | GET | `/futures/{settle}/order_book` |
| [getFuturesTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2564) |  | GET | `/futures/{settle}/trades` |
| [getFuturesCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2579) |  | GET | `/futures/{settle}/candlesticks` |
| [getPremiumIndexKLines()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2592) |  | GET | `/futures/{settle}/premium_index` |
| [getFuturesTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2605) |  | GET | `/futures/{settle}/tickers` |
| [getFundingRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2622) |  | GET | `/futures/{settle}/funding_rate` |
| [getBatchFundingRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2638) |  | POST | `/futures/{settle}/funding_rates` |
| [getFuturesInsuranceBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2656) |  | GET | `/futures/{settle}/insurance` |
| [getFuturesStats()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2675) |  | GET | `/futures/{settle}/contract_stats` |
| [getIndexConstituents()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2686) |  | GET | `/futures/{settle}/index_constituents/{index}` |
| [getLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2703) |  | GET | `/futures/{settle}/liq_orders` |
| [getRiskLimitTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2720) |  | GET | `/futures/{settle}/risk_limit_tiers` |
| [getFuturesAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2733) | :closed_lock_with_key:  | GET | `/futures/{settle}/accounts` |
| [getFuturesAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2747) | :closed_lock_with_key:  | GET | `/futures/{settle}/account_book` |
| [getFuturesPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2760) | :closed_lock_with_key:  | GET | `/futures/{settle}/positions` |
| [getFuturesPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2775) | :closed_lock_with_key:  | GET | `/futures/{settle}/positions/{contract}` |
| [updateFuturesMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2792) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/margin` |
| [updateFuturesLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2820) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/leverage` |
| [getFuturesContractLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2840) | :closed_lock_with_key:  | GET | `/futures/{settle}/get_leverage/{contract}` |
| [updateFuturesPositionMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2856) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/cross_mode` |
| [updatePositionRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2873) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/risk_limit` |
| [updateFuturesDualMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2893) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_mode` |
| [getDualModePosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2909) | :closed_lock_with_key:  | GET | `/futures/{settle}/dual_comp/positions/{contract}` |
| [updateDualModePositionMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2924) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/margin` |
| [updateDualModePositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2940) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/leverage` |
| [updateDualModePositionRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2964) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/risk_limit` |
| [submitFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2991) | :closed_lock_with_key:  | POST | `/futures/{settle}/orders` |
| [getFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3012) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders` |
| [cancelAllFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3027) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/orders` |
| [getFuturesOrdersByTimeRange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3047) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders_timerange` |
| [submitFuturesBatchOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3070) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_orders` |
| [getFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3095) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders/{order_id}` |
| [cancelFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3112) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/orders/{order_id}` |
| [updateFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3137) | :closed_lock_with_key:  | PUT | `/futures/{settle}/orders/{order_id}` |
| [getFuturesTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3158) | :closed_lock_with_key:  | GET | `/futures/{settle}/my_trades` |
| [getFuturesTradingHistoryByTimeRange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3173) | :closed_lock_with_key:  | GET | `/futures/{settle}/my_trades_timerange` |
| [getFuturesPositionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3186) | :closed_lock_with_key:  | GET | `/futures/{settle}/position_close` |
| [getFuturesLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3199) | :closed_lock_with_key:  | GET | `/futures/{settle}/liquidates` |
| [getFuturesAutoDeleveragingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3212) | :closed_lock_with_key:  | GET | `/futures/{settle}/auto_deleverages` |
| [setFuturesOrderCancelCountdown()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3229) | :closed_lock_with_key:  | POST | `/futures/{settle}/countdown_cancel_all` |
| [getFuturesUserTradingFees()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3246) | :closed_lock_with_key:  | GET | `/futures/{settle}/fee` |
| [batchCancelFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3264) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_cancel_orders` |
| [batchUpdateFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3291) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_amend_orders` |
| [getRiskLimitTable()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3313) |  | GET | `/futures/{settle}/risk_limit_table` |
| [submitFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3326) | :closed_lock_with_key:  | POST | `/futures/{settle}/price_orders` |
| [getFuturesAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3339) | :closed_lock_with_key:  | GET | `/futures/{settle}/price_orders` |
| [cancelAllOpenFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3352) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/price_orders` |
| [getFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3368) | :closed_lock_with_key:  | GET | `/futures/{settle}/price_orders/{order_id}` |
| [cancelFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3383) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/price_orders/{order_id}` |
| [updateFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3398) | :closed_lock_with_key:  | PUT | `/futures/{settle}/price_orders/amend` |
| [createTrailOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3413) | :closed_lock_with_key:  | POST | `/futures/{settle}/autoorder/v1/trail/create` |
| [terminateTrailOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3431) | :closed_lock_with_key:  | POST | `/futures/{settle}/autoorder/v1/trail/stop` |
| [batchTerminateTrailOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3444) | :closed_lock_with_key:  | POST | `/futures/{settle}/autoorder/v1/trail/stop_all` |
| [getTrailOrderList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3459) | :closed_lock_with_key:  | GET | `/futures/{settle}/autoorder/v1/trail/list` |
| [getTrailOrderDetail()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3472) | :closed_lock_with_key:  | GET | `/futures/{settle}/autoorder/v1/trail/detail` |
| [updateTrailOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3490) | :closed_lock_with_key:  | POST | `/futures/{settle}/autoorder/v1/trail/update` |
| [getTrailOrderChangeLog()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3503) | :closed_lock_with_key:  | GET | `/futures/{settle}/autoorder/v1/trail/change_log` |
| [createChaseOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3516) | :closed_lock_with_key:  | POST | `/futures/{settle}/autoorder/v1/chase/create` |
| [stopChaseOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3526) | :closed_lock_with_key:  | POST | `/futures/{settle}/autoorder/v1/chase/stop` |
| [stopAllChaseOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3536) | :closed_lock_with_key:  | POST | `/futures/{settle}/autoorder/v1/chase/stop_all` |
| [getChaseOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3548) | :closed_lock_with_key:  | GET | `/futures/{settle}/autoorder/v1/chase/list` |
| [getChaseOrderDetail()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3556) | :closed_lock_with_key:  | GET | `/futures/{settle}/autoorder/v1/chase/detail` |
| [getFuturesPositionCloseHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3565) | :closed_lock_with_key:  | GET | `/futures/{settle}/position_close_history` |
| [getFuturesInsuranceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3574) | :closed_lock_with_key:  | GET | `/futures/{settle}/insurance` |
| [getAllDeliveryContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3591) |  | GET | `/delivery/{settle}/contracts` |
| [getDeliveryContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3603) |  | GET | `/delivery/{settle}/contracts/{contract}` |
| [getDeliveryOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3618) |  | GET | `/delivery/{settle}/order_book` |
| [getDeliveryTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3631) |  | GET | `/delivery/{settle}/trades` |
| [getDeliveryCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3645) |  | GET | `/delivery/{settle}/candlesticks` |
| [getDeliveryTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3656) |  | GET | `/delivery/{settle}/tickers` |
| [getDeliveryInsuranceBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3673) |  | GET | `/delivery/{settle}/insurance` |
| [getDeliveryAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3692) | :closed_lock_with_key:  | GET | `/delivery/{settle}/accounts` |
| [getDeliveryBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3703) | :closed_lock_with_key:  | GET | `/delivery/{settle}/account_book` |
| [getDeliveryPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3714) | :closed_lock_with_key:  | GET | `/delivery/{settle}/positions` |
| [getDeliveryPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3724) | :closed_lock_with_key:  | GET | `/delivery/{settle}/positions/{contract}` |
| [updateDeliveryMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3739) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/margin` |
| [updateDeliveryLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3757) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/leverage` |
| [updateDeliveryRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3775) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/risk_limit` |
| [submitDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3795) | :closed_lock_with_key:  | POST | `/delivery/{settle}/orders` |
| [getDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3810) | :closed_lock_with_key:  | GET | `/delivery/{settle}/orders` |
| [cancelAllDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3823) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/orders` |
| [getDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3842) | :closed_lock_with_key:  | GET | `/delivery/{settle}/orders/{order_id}` |
| [cancelDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3857) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/orders/{order_id}` |
| [getDeliveryTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3872) | :closed_lock_with_key:  | GET | `/delivery/{settle}/my_trades` |
| [getDeliveryClosedPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3885) | :closed_lock_with_key:  | GET | `/delivery/{settle}/position_close` |
| [getDeliveryLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3898) | :closed_lock_with_key:  | GET | `/delivery/{settle}/liquidates` |
| [getDeliverySettlementHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3911) | :closed_lock_with_key:  | GET | `/delivery/{settle}/settlements` |
| [submitDeliveryTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3924) | :closed_lock_with_key:  | POST | `/delivery/{settle}/price_orders` |
| [getDeliveryAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3939) | :closed_lock_with_key:  | GET | `/delivery/{settle}/price_orders` |
| [cancelAllOpenDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3952) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/price_orders` |
| [getDeliveryTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3968) | :closed_lock_with_key:  | GET | `/delivery/{settle}/price_orders/{order_id}` |
| [cancelTriggeredDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3983) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/price_orders/{order_id}` |
| [getOptionsUnderlyings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4002) |  | GET | `/options/underlyings` |
| [getOptionsExpirationTimes()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4012) |  | GET | `/options/expirations` |
| [getOptionsContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4022) |  | GET | `/options/contracts` |
| [getOptionsContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4035) |  | GET | `/options/contracts/{contract}` |
| [getOptionsSettlementHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4045) |  | GET | `/options/settlements` |
| [getOptionsContractSettlement()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4057) |  | GET | `/options/settlements/{contract}` |
| [getOptionsMySettlements()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4072) | :closed_lock_with_key:  | GET | `/options/my_settlements` |
| [getOptionsOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4086) |  | GET | `/options/order_book` |
| [getOptionsTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4098) |  | GET | `/options/tickers` |
| [getOptionsUnderlyingTicker()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4112) |  | GET | `/options/underlying/tickers/{underlying}` |
| [getOptionsCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4126) |  | GET | `/options/candlesticks` |
| [getOptionsUnderlyingCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4136) |  | GET | `/options/underlying/candlesticks` |
| [getOptionsTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4148) |  | GET | `/options/trades` |
| [getOptionsAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4159) | :closed_lock_with_key:  | GET | `/options/accounts` |
| [getOptionsAccountChange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4169) | :closed_lock_with_key:  | GET | `/options/account_book` |
| [getOptionsPositionsUnderlying()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4181) | :closed_lock_with_key:  | GET | `/options/positions` |
| [getOptionsPositionContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4193) | :closed_lock_with_key:  | GET | `/options/positions/{contract}` |
| [getOptionsLiquidation()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4205) | :closed_lock_with_key:  | GET | `/options/position_close` |
| [submitOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4218) | :closed_lock_with_key:  | POST | `/options/orders` |
| [getOptionsOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4230) | :closed_lock_with_key:  | GET | `/options/orders` |
| [cancelAllOpenOptionsOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4242) | :closed_lock_with_key:  | DELETE | `/options/orders` |
| [getOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4256) | :closed_lock_with_key:  | GET | `/options/orders/{order_id}` |
| [amendOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4268) | :closed_lock_with_key:  | PUT | `/options/orders/{order_id}` |
| [cancelOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4283) | :closed_lock_with_key:  | DELETE | `/options/orders/{order_id}` |
| [submitOptionsCountdownCancel()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4302) | :closed_lock_with_key:  | POST | `/options/countdown_cancel_all` |
| [getOptionsPersonalHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4318) | :closed_lock_with_key:  | GET | `/options/my_trades` |
| [setOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4330) | :closed_lock_with_key:  | POST | `/options/mmp` |
| [getOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4342) | :closed_lock_with_key:  | GET | `/options/mmp` |
| [resetOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4354) | :closed_lock_with_key:  | POST | `/options/mmp/reset` |
| [getLendingCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4370) |  | GET | `/earn/uni/currencies` |
| [getLendingCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4380) |  | GET | `/earn/uni/currencies/{currency}` |
| [submitLendOrRedeemOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4390) | :closed_lock_with_key:  | POST | `/earn/uni/lends` |
| [getLendingOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4400) | :closed_lock_with_key:  | GET | `/earn/uni/lends` |
| [updateLendingOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4412) | :closed_lock_with_key:  | PATCH | `/earn/uni/lends` |
| [getLendingRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4425) | :closed_lock_with_key:  | GET | `/earn/uni/lend_records` |
| [getLendingTotalInterest()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4438) | :closed_lock_with_key:  | GET | `/earn/uni/interests/{currency}` |
| [getLendingInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4451) | :closed_lock_with_key:  | GET | `/earn/uni/interest_records` |
| [updateInterestReinvestment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4464) | :closed_lock_with_key:  | PUT | `/earn/uni/interest_reinvest` |
| [getLendingInterestStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4480) | :closed_lock_with_key:  | GET | `/earn/uni/interest_status/{currency}` |
| [getLendingAnnualizedTrendChart()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4495) | :closed_lock_with_key:  | GET | `/earn/uni/chart` |
| [getLendingEstimatedRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4503) | :closed_lock_with_key:  | GET | `/earn/uni/rate` |
| [submitMultiLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4520) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/orders` |
| [getMultiLoanOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4532) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/orders` |
| [getMultiLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4544) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/orders/{order_id}` |
| [repayMultiLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4554) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/repay` |
| [getMultiLoanRepayRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4564) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/repay` |
| [updateMultiLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4576) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/mortgage` |
| [getMultiLoanAdjustmentRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4588) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/mortgage` |
| [getMultiLoanCurrencyQuota()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4600) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/currency_quota` |
| [getMultiLoanSupportedCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4612) |  | GET | `/loan/multi_collateral/currencies` |
| [getMultiLoanRatio()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4621) |  | GET | `/loan/multi_collateral/ltv` |
| [getMultiLoanFixedRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4630) |  | GET | `/loan/multi_collateral/fixed_rate` |
| [getMultiLoanCurrentRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4643) |  | GET | `/loan/multi_collateral/current_rate` |
| [getDualInvestmentProducts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4665) |  | GET | `/earn/dual/investment_plan` |
| [getDualInvestmentOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4676) | :closed_lock_with_key:  | GET | `/earn/dual/orders` |
| [submitDualInvestmentOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4688) | :closed_lock_with_key:  | POST | `/earn/dual/orders` |
| [getDualOrderRefundPreview()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4697) | :closed_lock_with_key:  | GET | `/earn/dual/order-refund-preview` |
| [submitDualOrderRefund()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4706) | :closed_lock_with_key:  | POST | `/earn/dual/order-refund` |
| [updateDualOrderReinvest()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4715) | :closed_lock_with_key:  | POST | `/earn/dual/modify-order-reinvest` |
| [getDualProjectRecommend()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4726) | :closed_lock_with_key:  | GET | `/earn/dual/project-recommend` |
| [getEarnFixedTermProducts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4735) |  | GET | `/earn/fixed-term/product` |
| [getEarnFixedTermProductsByAsset()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4744) |  | GET | `/earn/fixed-term/product/{asset}/list` |
| [createEarnFixedTermLend()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4754) | :closed_lock_with_key:  | POST | `/earn/fixed-term/user/lend` |
| [getEarnFixedTermLends()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4763) | :closed_lock_with_key:  | GET | `/earn/fixed-term/user/lend` |
| [createEarnFixedTermPreRedeem()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4772) | :closed_lock_with_key:  | POST | `/earn/fixed-term/user/pre-redeem` |
| [getEarnFixedTermHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4783) | :closed_lock_with_key:  | GET | `/earn/fixed-term/user/history` |
| [createAutoInvestPlan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4792) | :closed_lock_with_key:  | POST | `/earn/autoinvest/plans/create` |
| [updateAutoInvestPlan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4801) | :closed_lock_with_key:  | POST | `/earn/autoinvest/plans/update` |
| [stopAutoInvestPlan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4808) | :closed_lock_with_key:  | POST | `/earn/autoinvest/plans/stop` |
| [addAutoInvestPlanPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4815) | :closed_lock_with_key:  | POST | `/earn/autoinvest/plans/add_position` |
| [getAutoInvestCoins()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4826) | :closed_lock_with_key:  | GET | `/earn/autoinvest/coins` |
| [getAutoInvestMinAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4835) | :closed_lock_with_key:  | POST | `/earn/autoinvest/min_invest_amount` |
| [getAutoInvestPlanRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4846) | :closed_lock_with_key:  | GET | `/earn/autoinvest/plans/records` |
| [getAutoInvestOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4855) | :closed_lock_with_key:  | GET | `/earn/autoinvest/orders` |
| [getAutoInvestConfig()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4864) | :closed_lock_with_key:  | GET | `/earn/autoinvest/config` |
| [getAutoInvestPlanDetail()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4871) | :closed_lock_with_key:  | GET | `/earn/autoinvest/plans/detail` |
| [getAutoInvestPlans()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4880) | :closed_lock_with_key:  | GET | `/earn/autoinvest/plans/list_info` |
| [getStakingCoins()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4892) | :closed_lock_with_key:  | GET | `/earn/staking/coins` |
| [submitStakingSwap()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4905) | :closed_lock_with_key:  | POST | `/earn/staking/swap` |
| [getAccountDetail()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4924) | :closed_lock_with_key:  | GET | `/account/detail` |
| [getAccountRateLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4933) | :closed_lock_with_key:  | GET | `/account/rate_limit` |
| [createStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4943) | :closed_lock_with_key:  | POST | `/account/stp_groups` |
| [getStpGroups()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4953) | :closed_lock_with_key:  | GET | `/account/stp_groups` |
| [getStpGroupUsers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4963) | :closed_lock_with_key:  | GET | `/account/stp_groups/{stp_id}/users` |
| [addUsersToStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4973) | :closed_lock_with_key:  | POST | `/account/stp_groups/{stp_id}/users` |
| [deleteUserFromStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4989) | :closed_lock_with_key:  | DELETE | `/account/stp_groups/{stp_id}/users` |
| [setGTDeduction()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5007) | :closed_lock_with_key:  | POST | `/account/debit_fee` |
| [getGTDeduction()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5018) | :closed_lock_with_key:  | GET | `/account/debit_fee` |
| [getAccountMainKeys()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5027) | :closed_lock_with_key:  | GET | `/account/main_keys` |
| [getAgencyTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5043) | :closed_lock_with_key:  | GET | `/rebate/agency/transaction_history` |
| [getAgencyCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5056) | :closed_lock_with_key:  | GET | `/rebate/agency/commission_history` |
| [getPartnerTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5070) | :closed_lock_with_key:  | GET | `/rebate/partner/transaction_history` |
| [getPartnerCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5085) | :closed_lock_with_key:  | GET | `/rebate/partner/commission_history` |
| [getPartnerSubordinateList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5108) | :closed_lock_with_key:  | GET | `/rebate/partner/sub_list` |
| [getPartnerAgentDataAggregated()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5118) | :closed_lock_with_key:  | GET | `/rebate/partner/data/aggregated` |
| [getBrokerCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5131) | :closed_lock_with_key:  | GET | `/rebate/broker/commission_history` |
| [getBrokerTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5144) | :closed_lock_with_key:  | GET | `/rebate/broker/transaction_history` |
| [getUserRebateInfo()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5153) | :closed_lock_with_key:  | GET | `/rebate/user/info` |
| [createOTCQuote()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5188) | :closed_lock_with_key:  | POST | `/otc/quote` |
| [createOTCFiatOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5200) | :closed_lock_with_key:  | POST | `/otc/order/create` |
| [createOTCStablecoinOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5214) | :closed_lock_with_key:  | POST | `/otc/stable_coin/order/create` |
| [getOTCBankList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5223) | :closed_lock_with_key:  | GET | `/otc/bank/list` |
| [getOTCBankListLegacy()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5230) | :closed_lock_with_key:  | GET | `/otc/bank_list` |
| [createOTCBank()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5237) | :closed_lock_with_key:  | POST | `/otc/bank/delete` |
| [deleteOTCBank()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5248) | :closed_lock_with_key:  | POST | `/otc/bank/delete` |
| [setDefaultOTCBank()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5255) | :closed_lock_with_key:  | POST | `/otc/bank/set_default` |
| [getOTCBankSupplementChecklist()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5262) | :closed_lock_with_key:  | GET | `/otc/bank/bank_supplement_checklist` |
| [submitOTCBankPersonalSupplement()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5271) | :closed_lock_with_key:  | POST | `/otc/order/paid` |
| [submitOTCBankEnterpriseSupplement()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5290) | :closed_lock_with_key:  | POST | `/otc/order/paid` |
| [markOTCOrderAsPaid()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5326) | :closed_lock_with_key:  | POST | `/otc/order/paid` |
| [cancelOTCOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5340) | :closed_lock_with_key:  | POST | `/otc/order/cancel` |
| [getOTCFiatOrderList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5352) | :closed_lock_with_key:  | GET | `/otc/order/list` |
| [getOTCStablecoinOrderList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5366) | :closed_lock_with_key:  | GET | `/otc/stable_coin/order/list` |
| [getOTCFiatOrderDetail()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5380) | :closed_lock_with_key:  | GET | `/otc/order/detail` |
| [getP2PMerchantUserInfo()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5394) | :closed_lock_with_key:  | POST | `/p2p/merchant/account/get_user_info` |
| [getP2PMerchantCounterpartyUserInfo()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5403) | :closed_lock_with_key:  | POST | `/p2p/merchant/account/get_counterparty_user_info` |
| [getP2PMerchantMyselfPayment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5415) | :closed_lock_with_key:  | POST | `/p2p/merchant/account/get_myself_payment` |
| [getP2PMerchantSpotBalance()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5428) | :closed_lock_with_key:  | POST | `/p2p/merchant/account/set_merchant_work_hours` |
| [setP2PMerchantWorkHours()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5437) | :closed_lock_with_key:  | POST | `/p2p/merchant/account/set_merchant_work_hours` |
| [getP2PMerchantPendingTransactionList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5448) | :closed_lock_with_key:  | POST | `/p2p/merchant/transaction/get_pending_transaction_list` |
| [getP2PMerchantCompletedTransactionList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5460) | :closed_lock_with_key:  | POST | `/p2p/merchant/transaction/get_completed_transaction_list` |
| [getP2PMerchantTransactionDetails()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5472) | :closed_lock_with_key:  | POST | `/p2p/merchant/transaction/get_transaction_details` |
| [confirmP2PMerchantPayment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5484) | :closed_lock_with_key:  | POST | `/p2p/merchant/transaction/confirm-payment` |
| [confirmP2PMerchantReceipt()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5495) | :closed_lock_with_key:  | POST | `/p2p/merchant/transaction/confirm-receipt` |
| [cancelP2PMerchantTransaction()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5506) | :closed_lock_with_key:  | POST | `/p2p/merchant/transaction/cancel` |
| [placeP2PMerchantBizPushOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5517) | :closed_lock_with_key:  | POST | `/p2p/merchant/books/place_biz_push_order` |
| [updateP2PMerchantAdsStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5528) | :closed_lock_with_key:  | POST | `/p2p/merchant/books/ads_update_status` |
| [getP2PMerchantAdsDetail()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5541) | :closed_lock_with_key:  | POST | `/p2p/merchant/books/ads_detail` |
| [getP2PMerchantMyAdsList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5550) | :closed_lock_with_key:  | POST | `/p2p/merchant/books/my_ads_list` |
| [getP2PMerchantAdsList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5561) | :closed_lock_with_key:  | POST | `/p2p/merchant/books/ads_list` |
| [getP2PMerchantChatsList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5570) | :closed_lock_with_key:  | POST | `/p2p/merchant/chat/get_chats_list` |
| [sendP2PMerchantChatMessage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5581) | :closed_lock_with_key:  | POST | `/p2p/merchant/chat/send_chat_message` |
| [uploadP2PMerchantChatFile()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5592) | :closed_lock_with_key:  | POST | `/p2p/merchant/chat/upload_chat_file` |
| [getCrossExSymbols()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5613) |  | GET | `/crossex/rule/symbols` |
| [getCrossExRiskLimits()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5625) |  | GET | `/crossex/rule/risk_limits` |
| [getCrossExTransferCoins()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5639) |  | GET | `/crossex/transfers/coin` |
| [createCrossExTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5653) | :closed_lock_with_key:  | POST | `/crossex/transfers` |
| [getCrossExTransferHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5667) | :closed_lock_with_key:  | GET | `/crossex/transfers` |
| [createCrossExOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5681) | :closed_lock_with_key:  | POST | `/crossex/orders` |
| [cancelCrossExOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5695) | :closed_lock_with_key:  | DELETE | `/crossex/orders/{order_id}` |
| [modifyCrossExOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5708) | :closed_lock_with_key:  | PUT | `/crossex/orders/{order_id}` |
| [getCrossExOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5723) | :closed_lock_with_key:  | GET | `/crossex/orders/{order_id}` |
| [createCrossExConvertQuote()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5735) | :closed_lock_with_key:  | POST | `/crossex/convert/quote` |
| [createCrossExConvertOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5749) | :closed_lock_with_key:  | POST | `/crossex/convert/orders` |
| [updateCrossExAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5763) | :closed_lock_with_key:  | PUT | `/crossex/accounts` |
| [getCrossExAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5777) | :closed_lock_with_key:  | GET | `/crossex/accounts` |
| [setCrossExPositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5789) | :closed_lock_with_key:  | POST | `/crossex/positions/leverage` |
| [getCrossExPositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5803) | :closed_lock_with_key:  | GET | `/crossex/positions/leverage` |
| [setCrossExMarginPositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5817) | :closed_lock_with_key:  | POST | `/crossex/margin_positions/leverage` |
| [getCrossExMarginPositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5833) | :closed_lock_with_key:  | GET | `/crossex/margin_positions/leverage` |
| [closeCrossExPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5847) | :closed_lock_with_key:  | POST | `/crossex/position` |
| [getCrossExInterestRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5861) | :closed_lock_with_key:  | GET | `/crossex/interest_rate` |
| [getCrossExFeeRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5874) | :closed_lock_with_key:  | GET | `/crossex/fee` |
| [getCrossExPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5886) | :closed_lock_with_key:  | GET | `/crossex/positions` |
| [getCrossExMarginPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5900) | :closed_lock_with_key:  | GET | `/crossex/margin_positions` |
| [getCrossExAdlRank()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5914) | :closed_lock_with_key:  | GET | `/crossex/adl_rank` |
| [getCrossExOpenOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5926) | :closed_lock_with_key:  | GET | `/crossex/open_orders` |
| [getCrossExHistoryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5940) | :closed_lock_with_key:  | GET | `/crossex/history_orders` |
| [getCrossExHistoryPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5954) | :closed_lock_with_key:  | GET | `/crossex/history_positions` |
| [getCrossExHistoryMarginPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5968) | :closed_lock_with_key:  | GET | `/crossex/history_margin_positions` |
| [getCrossExHistoryMarginInterests()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5982) | :closed_lock_with_key:  | GET | `/crossex/history_margin_interests` |
| [getCrossExHistoryTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5996) | :closed_lock_with_key:  | GET | `/crossex/history_trades` |
| [getCrossExAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6010) | :closed_lock_with_key:  | GET | `/crossex/account_book` |
| [getCrossExCoinDiscountRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6024) | :closed_lock_with_key:  | GET | `/crossex/coin_discount_rate` |
| [getAlphaAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6042) | :closed_lock_with_key:  | GET | `/alpha/accounts` |
| [getAlphaAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6054) | :closed_lock_with_key:  | GET | `/alpha/account_book` |
| [createAlphaQuote()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6068) | :closed_lock_with_key:  | POST | `/alpha/quote` |
| [createAlphaOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6080) | :closed_lock_with_key:  | POST | `/alpha/orders` |
| [getAlphaOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6092) | :closed_lock_with_key:  | GET | `/alpha/orders` |
| [getAlphaOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6104) | :closed_lock_with_key:  | GET | `/alpha/order` |
| [getAlphaCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6116) |  | GET | `/alpha/currencies` |
| [getAlphaTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6128) |  | GET | `/alpha/tickers` |
| [getTradFiMT5Account()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6134) | :closed_lock_with_key:  | GET | `/tradfi/users/mt5-account` |
| [getTradFiSymbolCategories()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6138) |  | GET | `/tradfi/symbols/categories` |
| [getTradFiSymbols()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6144) |  | GET | `/tradfi/symbols` |
| [getTradFiSymbolDetail()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6148) | :closed_lock_with_key:  | GET | `/tradfi/symbols/detail` |
| [getTradFiKlines()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6154) |  | GET | `/tradfi/symbols/{symbol}/klines` |
| [getTradFiTicker()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6161) |  | GET | `/tradfi/symbols/{symbol}/tickers` |
| [createTradFiUser()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6165) | :closed_lock_with_key:  | POST | `/tradfi/users` |
| [getTradFiAssets()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6169) | :closed_lock_with_key:  | GET | `/tradfi/users/assets` |
| [createTradFiTransaction()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6173) | :closed_lock_with_key:  | POST | `/tradfi/transactions` |
| [getTradFiTransactions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6179) | :closed_lock_with_key:  | GET | `/tradfi/transactions` |
| [createTradFiOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6185) | :closed_lock_with_key:  | POST | `/tradfi/orders` |
| [getTradFiOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6191) | :closed_lock_with_key:  | GET | `/tradfi/orders` |
| [modifyTradFiOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6195) | :closed_lock_with_key:  | PUT | `/tradfi/orders/{orderId}` |
| [cancelTradFiOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6202) | :closed_lock_with_key:  | DELETE | `/tradfi/orders/{orderId}` |
| [getTradFiOrderHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6206) | :closed_lock_with_key:  | GET | `/tradfi/orders/history` |
| [getTradFiPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6212) | :closed_lock_with_key:  | GET | `/tradfi/positions` |
| [modifyTradFiPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6218) | :closed_lock_with_key:  | PUT | `/tradfi/positions/{positionId}` |
| [closeTradFiPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6227) | :closed_lock_with_key:  | POST | `/tradfi/positions/{positionId}/close` |
| [getTradFiPositionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6236) | :closed_lock_with_key:  | GET | `/tradfi/positions/history` |
| [getTradFiOrderLog()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L6245) | :closed_lock_with_key:  | GET | `/tradfi/orders/log/{log_id}` |

# WebsocketAPIClient.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [WebsocketAPIClient.ts](/src/WebsocketAPIClient.ts). 

This client provides WebSocket API endpoints which allow for faster interactions with the Gate.io API via a WebSocket connection.

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [submitNewSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L97) | :closed_lock_with_key:  | WS | `spot.order_place` |
| [cancelSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L111) | :closed_lock_with_key:  | WS | `spot.order_cancel` |
| [cancelSpotOrderById()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L125) | :closed_lock_with_key:  | WS | `spot.order_cancel_ids` |
| [cancelSpotOrderForSymbol()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L139) | :closed_lock_with_key:  | WS | `spot.order_cancel_cp` |
| [updateSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L153) | :closed_lock_with_key:  | WS | `spot.order_amend` |
| [getSpotOrderStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L167) | :closed_lock_with_key:  | WS | `spot.order_status` |
| [getSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L181) | :closed_lock_with_key:  | WS | `spot.order_list` |
| [submitNewFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L203) | :closed_lock_with_key:  | WS | `futures.order_place` |
| [submitNewFuturesBatchOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L219) | :closed_lock_with_key:  | WS | `futures.order_batch_place` |
| [cancelFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L235) | :closed_lock_with_key:  | WS | `futures.order_cancel` |
| [cancelFuturesOrderById()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L251) | :closed_lock_with_key:  | WS | `futures.order_cancel_ids` |
| [cancelFuturesAllOpenOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L267) | :closed_lock_with_key:  | WS | `futures.order_cancel_cp` |
| [updateFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L283) | :closed_lock_with_key:  | WS | `futures.order_amend` |
| [getFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L299) | :closed_lock_with_key:  | WS | `futures.order_list` |
| [getFuturesOrderStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/WebsocketAPIClient.ts#L315) | :closed_lock_with_key:  | WS | `futures.order_status` |