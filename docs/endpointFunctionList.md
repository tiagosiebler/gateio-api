
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
| [getSystemMaintenanceStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L520) |  | GET | `/v1/public/system_info` |
| [submitWithdrawal()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L537) | :closed_lock_with_key:  | POST | `/withdrawals` |
| [submitSpotMainAccountTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L551) | :closed_lock_with_key:  | POST | `/withdrawals/push` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L567) | :closed_lock_with_key:  | DELETE | `/withdrawals/{withdrawal_id}` |
| [getCurrencyChains()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L584) |  | GET | `/wallet/currency_chains` |
| [createDepositAddress()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L594) | :closed_lock_with_key:  | GET | `/wallet/deposit_address` |
| [getWithdrawalRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L608) | :closed_lock_with_key:  | GET | `/wallet/withdrawals` |
| [getDepositRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L622) | :closed_lock_with_key:  | GET | `/wallet/deposits` |
| [submitTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L641) | :closed_lock_with_key:  | POST | `/wallet/transfers` |
| [submitMainSubTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L653) | :closed_lock_with_key:  | POST | `/wallet/sub_account_transfers` |
| [getMainSubTransfers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L667) | :closed_lock_with_key:  | GET | `/wallet/sub_account_transfers` |
| [submitSubToSubTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L681) | :closed_lock_with_key:  | POST | `/wallet/sub_account_to_sub_account` |
| [getTransferStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L696) | :closed_lock_with_key:  | GET | `/wallet/order_status` |
| [getWithdrawalStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L712) | :closed_lock_with_key:  | GET | `/wallet/withdraw_status` |
| [getSubBalance()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L727) | :closed_lock_with_key:  | GET | `/wallet/sub_account_balances` |
| [getSubMarginBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L742) | :closed_lock_with_key:  | GET | `/wallet/sub_account_margin_balances` |
| [getSubFuturesBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L754) | :closed_lock_with_key:  | GET | `/wallet/sub_account_futures_balances` |
| [getSubCrossMarginBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L767) | :closed_lock_with_key:  | GET | `/wallet/sub_account_cross_margin_balances` |
| [getSavedAddresses()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L779) | :closed_lock_with_key:  | GET | `/wallet/saved_address` |
| [getTradingFees()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L789) | :closed_lock_with_key:  | GET | `/wallet/fee` |
| [getBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L810) | :closed_lock_with_key:  | GET | `/wallet/total_balance` |
| [getSmallBalances()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L819) | :closed_lock_with_key:  | GET | `/wallet/small_balance` |
| [convertSmallBalance()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L829) | :closed_lock_with_key:  | POST | `/wallet/small_balance` |
| [getSmallBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L842) | :closed_lock_with_key:  | GET | `/wallet/small_balance_history` |
| [getPushOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L854) | :closed_lock_with_key:  | GET | `/wallet/push` |
| [getLowCapExchangeList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L863) | :closed_lock_with_key:  | GET | `/wallet/getLowCapExchangeList` |
| [createSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L878) | :closed_lock_with_key:  | POST | `/sub_accounts` |
| [getSubAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L889) | :closed_lock_with_key:  | GET | `/sub_accounts` |
| [getSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L899) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}` |
| [createSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L909) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/keys` |
| [getSubAccountApiKeys()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L922) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}/keys` |
| [updateSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L936) | :closed_lock_with_key:  | PUT | `/sub_accounts/{user_id}/keys/{key}` |
| [deleteSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L947) | :closed_lock_with_key:  | DELETE | `/sub_accounts/{user_id}/keys/{key}` |
| [getSubAccountApiKey()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L962) | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}/keys/{key}` |
| [lockSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L977) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/lock` |
| [unlockSubAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L987) | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/unlock` |
| [getSubAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1001) | :closed_lock_with_key:  | GET | `/sub_accounts/unified_mode` |
| [getUnifiedAccountInfo()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1020) | :closed_lock_with_key:  | GET | `/unified/accounts` |
| [getUnifiedMaxBorrow()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1036) | :closed_lock_with_key:  | GET | `/unified/borrowable` |
| [getUnifiedMaxTransferable()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1052) | :closed_lock_with_key:  | GET | `/unified/transferable` |
| [getUnifiedMaxTransferables()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1067) | :closed_lock_with_key:  | GET | `/unified/transferables` |
| [getUnifiedBatchMaxBorrowable()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1076) | :closed_lock_with_key:  | GET | `/unified/batch_borrowable` |
| [submitUnifiedBorrowOrRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1094) | :closed_lock_with_key:  | POST | `/unified/loans` |
| [getUnifiedLoans()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1106) | :closed_lock_with_key:  | GET | `/unified/loans` |
| [getUnifiedLoanRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1116) | :closed_lock_with_key:  | GET | `/unified/loan_records` |
| [getUnifiedInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1128) | :closed_lock_with_key:  | GET | `/unified/interest_records` |
| [getUnifiedRiskUnitDetails()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1139) | :closed_lock_with_key:  | GET | `/unified/risk_units` |
| [setUnifiedAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1151) | :closed_lock_with_key:  | PUT | `/unified/unified_mode` |
| [getUnifiedAccountMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1160) | :closed_lock_with_key:  | GET | `/unified/unified_mode` |
| [getUnifiedEstimateRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1172) | :closed_lock_with_key:  | GET | `/unified/estimate_rate` |
| [getUnifiedCurrencyDiscountTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1183) |  | GET | `/unified/currency_discount_tiers` |
| [getLoanMarginTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1195) |  | GET | `/unified/loan_margin_tiers` |
| [portfolioMarginCalculate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1212) |  | POST | `/unified/portfolio_calculator` |
| [getUserCurrencyLeverageConfig()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1226) | :closed_lock_with_key:  | GET | `/unified/leverage/user_currency_config` |
| [getUserCurrencyLeverageSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1240) | :closed_lock_with_key:  | GET | `/unified/leverage/user_currency_setting` |
| [updateUserCurrencyLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1255) | :closed_lock_with_key:  | POST | `/unified/leverage/user_currency_setting` |
| [getUnifiedLoanCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1270) | :closed_lock_with_key:  | GET | `/unified/currencies` |
| [getHistoricalLendingRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1282) | :closed_lock_with_key:  | GET | `/unified/history_loan_rate` |
| [submitUnifiedLoanRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1288) | :closed_lock_with_key:  | POST | `/unified/loans/repay` |
| [getSpotCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1308) |  | GET | `/spot/currencies` |
| [getSpotCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1318) |  | GET | `/spot/currencies/{currency}` |
| [getSpotCurrencyPairs()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1327) |  | GET | `/spot/currency_pairs` |
| [getSpotCurrencyPair()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1337) |  | GET | `/spot/currency_pairs/{currency_pair}` |
| [getSpotTicker()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1351) |  | GET | `/spot/tickers` |
| [getSpotOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1366) |  | GET | `/spot/order_book` |
| [getSpotTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1379) |  | GET | `/spot/trades` |
| [getSpotCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1391) |  | GET | `/spot/candlesticks` |
| [getSpotFeeRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1403) | :closed_lock_with_key:  | GET | `/spot/fee` |
| [getSpotBatchFeeRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1412) | :closed_lock_with_key:  | GET | `/spot/batch_fee` |
| [getSpotAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1424) | :closed_lock_with_key:  | GET | `/spot/accounts` |
| [getSpotAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1436) | :closed_lock_with_key:  | GET | `/spot/account_book` |
| [submitSpotBatchOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1455) | :closed_lock_with_key:  | POST | `/spot/batch_orders` |
| [getSpotOpenOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1482) | :closed_lock_with_key:  | GET | `/spot/open_orders` |
| [submitSpotClosePosCrossDisabled()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1498) | :closed_lock_with_key:  | POST | `/spot/cross_liquidate_orders` |
| [submitSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1514) | :closed_lock_with_key:  | POST | `/spot/orders` |
| [getSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1531) | :closed_lock_with_key:  | GET | `/spot/orders` |
| [cancelSpotOpenOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1546) | :closed_lock_with_key:  | DELETE | `/spot/orders` |
| [batchCancelSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1574) | :closed_lock_with_key:  | POST | `/spot/cancel_batch_orders` |
| [getSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1599) | :closed_lock_with_key:  | GET | `/spot/orders/{order_id}` |
| [updateSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1616) | :closed_lock_with_key:  | PATCH | `/spot/orders/{order_id}` |
| [cancelSpotOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1644) | :closed_lock_with_key:  | DELETE | `/spot/orders/{order_id}` |
| [getSpotTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1673) | :closed_lock_with_key:  | GET | `/spot/my_trades` |
| [submitSpotCountdownOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1702) | :closed_lock_with_key:  | POST | `/spot/countdown_cancel_all` |
| [batchUpdateSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1721) | :closed_lock_with_key:  | POST | `/spot/amend_batch_orders` |
| [getSpotInsuranceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1748) | :closed_lock_with_key:  | GET | `/spot/insurance_history` |
| [submitSpotPriceTriggerOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1762) | :closed_lock_with_key:  | POST | `/spot/price_orders` |
| [getSpotAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1774) | :closed_lock_with_key:  | GET | `/spot/price_orders` |
| [cancelAllOpenSpotOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1786) | :closed_lock_with_key:  | DELETE | `/spot/price_orders` |
| [getPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1799) | :closed_lock_with_key:  | GET | `/spot/price_orders/{order_id}` |
| [cancelSpotTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1811) | :closed_lock_with_key:  | DELETE | `/spot/price_orders/{order_id}` |
| [setCollateralCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1825) | :closed_lock_with_key:  | POST | `/unified/collateral_currencies` |
| [getMarginAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1846) | :closed_lock_with_key:  | GET | `/margin/accounts` |
| [getMarginBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1860) | :closed_lock_with_key:  | GET | `/margin/account_book` |
| [getFundingAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1878) | :closed_lock_with_key:  | GET | `/margin/funding_accounts` |
| [updateAutoRepaymentSetting()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1896) | :closed_lock_with_key:  | POST | `/margin/auto_repay` |
| [getAutoRepaymentSetting()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1907) | :closed_lock_with_key:  | GET | `/margin/auto_repay` |
| [getMarginTransferableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1921) | :closed_lock_with_key:  | GET | `/margin/transferable` |
| [getCrossMarginCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1938) |  | GET | `/margin/cross/currencies` |
| [getCrossMarginCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1949) |  | GET | `/margin/cross/currencies/{currency}` |
| [getCrossMarginAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1961) | :closed_lock_with_key:  | GET | `/margin/cross/accounts` |
| [getCrossMarginAccountHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1974) | :closed_lock_with_key:  | GET | `/margin/cross/account_book` |
| [submitCrossMarginBorrowLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L1991) | :closed_lock_with_key:  | POST | `/margin/cross/loans` |
| [getCrossMarginBorrowHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2006) | :closed_lock_with_key:  | GET | `/margin/cross/loans` |
| [getCrossMarginBorrowLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2019) | :closed_lock_with_key:  | GET | `/margin/cross/loans/{loan_id}` |
| [submitCrossMarginRepayment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2034) | :closed_lock_with_key:  | POST | `/margin/cross/repayments` |
| [getCrossMarginRepayments()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2050) | :closed_lock_with_key:  | GET | `/margin/cross/repayments` |
| [getCrossMarginInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2063) | :closed_lock_with_key:  | GET | `/margin/cross/interest_records` |
| [getCrossMarginTransferableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2079) | :closed_lock_with_key:  | GET | `/margin/cross/transferable` |
| [getEstimatedInterestRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2095) | :closed_lock_with_key:  | GET | `/margin/cross/estimate_rate` |
| [getCrossMarginBorrowableAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2109) | :closed_lock_with_key:  | GET | `/margin/cross/borrowable` |
| [getMarginUserLoanTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2122) | :closed_lock_with_key:  | GET | `/margin/user/loan_margin_tiers` |
| [getMarginPublicLoanTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2138) |  | GET | `/margin/loan_margin_tiers` |
| [setMarginUserLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2154) | :closed_lock_with_key:  | POST | `/margin/leverage/user_market_setting` |
| [getMarginUserAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2171) | :closed_lock_with_key:  | GET | `/margin/user/account` |
| [getLendingMarkets()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2186) |  | GET | `/margin/uni/currency_pairs` |
| [getLendingMarket()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2201) |  | GET | `/margin/uni/currency_pairs/{currency_pair}` |
| [getEstimatedInterestRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2213) | :closed_lock_with_key:  | GET | `/margin/uni/estimate_rate` |
| [submitMarginUNIBorrowOrRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2223) | :closed_lock_with_key:  | POST | `/margin/uni/loans` |
| [getMarginUNILoans()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2239) | :closed_lock_with_key:  | GET | `/margin/uni/loans` |
| [getMarginUNILoanRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2249) | :closed_lock_with_key:  | GET | `/margin/uni/loan_records` |
| [getMarginUNIInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2261) | :closed_lock_with_key:  | GET | `/margin/uni/interest_records` |
| [getMarginUNIMaxBorrow()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2273) | :closed_lock_with_key:  | GET | `/margin/uni/borrowable` |
| [getFlashSwapCurrencyPairs()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2289) |  | GET | `/flash_swap/currency_pairs` |
| [submitFlashSwapOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2305) | :closed_lock_with_key:  | POST | `/flash_swap/orders` |
| [getFlashSwapOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2317) | :closed_lock_with_key:  | GET | `/flash_swap/orders` |
| [getFlashSwapOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2329) | :closed_lock_with_key:  | GET | `/flash_swap/orders/{order_id}` |
| [submitFlashSwapOrderPreview()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2339) | :closed_lock_with_key:  | POST | `/flash_swap/orders/preview` |
| [getFuturesContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2356) |  | GET | `/futures/{settle}/contracts` |
| [getFuturesContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2371) |  | GET | `/futures/{settle}/contracts/{contract}` |
| [getFuturesOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2386) |  | GET | `/futures/{settle}/order_book` |
| [getFuturesTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2399) |  | GET | `/futures/{settle}/trades` |
| [getFuturesCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2414) |  | GET | `/futures/{settle}/candlesticks` |
| [getPremiumIndexKLines()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2427) |  | GET | `/futures/{settle}/premium_index` |
| [getFuturesTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2440) |  | GET | `/futures/{settle}/tickers` |
| [getFundingRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2457) |  | GET | `/futures/{settle}/funding_rate` |
| [getFuturesInsuranceBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2476) |  | GET | `/futures/{settle}/insurance` |
| [getFuturesStats()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2495) |  | GET | `/futures/{settle}/contract_stats` |
| [getIndexConstituents()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2506) |  | GET | `/futures/{settle}/index_constituents/{index}` |
| [getLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2523) |  | GET | `/futures/{settle}/liq_orders` |
| [getRiskLimitTiers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2540) |  | GET | `/futures/{settle}/risk_limit_tiers` |
| [getFuturesAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2553) | :closed_lock_with_key:  | GET | `/futures/{settle}/accounts` |
| [getFuturesAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2567) | :closed_lock_with_key:  | GET | `/futures/{settle}/account_book` |
| [getFuturesPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2580) | :closed_lock_with_key:  | GET | `/futures/{settle}/positions` |
| [getFuturesPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2595) | :closed_lock_with_key:  | GET | `/futures/{settle}/positions/{contract}` |
| [updateFuturesMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2612) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/margin` |
| [updateFuturesLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2640) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/leverage` |
| [updateFuturesPositionMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2660) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/cross_mode` |
| [updatePositionRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2677) | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/risk_limit` |
| [updateFuturesDualMode()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2697) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_mode` |
| [getDualModePosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2713) | :closed_lock_with_key:  | GET | `/futures/{settle}/dual_comp/positions/{contract}` |
| [updateDualModePositionMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2728) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/margin` |
| [updateDualModePositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2744) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/leverage` |
| [updateDualModePositionRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2768) | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/risk_limit` |
| [submitFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2795) | :closed_lock_with_key:  | POST | `/futures/{settle}/orders` |
| [getFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2816) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders` |
| [cancelAllFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2831) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/orders` |
| [getFuturesOrdersByTimeRange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2851) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders_timerange` |
| [submitFuturesBatchOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2874) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_orders` |
| [getFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2899) | :closed_lock_with_key:  | GET | `/futures/{settle}/orders/{order_id}` |
| [cancelFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2916) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/orders/{order_id}` |
| [updateFuturesOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2939) | :closed_lock_with_key:  | PUT | `/futures/{settle}/orders/{order_id}` |
| [getFuturesTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2960) | :closed_lock_with_key:  | GET | `/futures/{settle}/my_trades` |
| [getFuturesTradingHistoryByTimeRange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2975) | :closed_lock_with_key:  | GET | `/futures/{settle}/my_trades_timerange` |
| [getFuturesPositionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L2988) | :closed_lock_with_key:  | GET | `/futures/{settle}/position_close` |
| [getFuturesLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3001) | :closed_lock_with_key:  | GET | `/futures/{settle}/liquidates` |
| [getFuturesAutoDeleveragingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3014) | :closed_lock_with_key:  | GET | `/futures/{settle}/auto_deleverages` |
| [setFuturesOrderCancelCountdown()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3031) | :closed_lock_with_key:  | POST | `/futures/{settle}/countdown_cancel_all` |
| [getFuturesUserTradingFees()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3048) | :closed_lock_with_key:  | GET | `/futures/{settle}/fee` |
| [batchCancelFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3066) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_cancel_orders` |
| [batchUpdateFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3093) | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_amend_orders` |
| [getRiskLimitTable()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3115) |  | GET | `/futures/{settle}/risk_limit_table` |
| [submitFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3128) | :closed_lock_with_key:  | POST | `/futures/{settle}/price_orders` |
| [getFuturesAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3141) | :closed_lock_with_key:  | GET | `/futures/{settle}/price_orders` |
| [cancelAllOpenFuturesOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3154) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/price_orders` |
| [getFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3170) | :closed_lock_with_key:  | GET | `/futures/{settle}/price_orders/{order_id}` |
| [cancelFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3185) | :closed_lock_with_key:  | DELETE | `/futures/{settle}/price_orders/{order_id}` |
| [updateFuturesPriceTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3200) | :closed_lock_with_key:  | PUT | `/futures/{settle}/price_orders/{order_id}` |
| [getFuturesPositionCloseHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3209) | :closed_lock_with_key:  | GET | `/futures/{settle}/position_close_history` |
| [getFuturesInsuranceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3218) | :closed_lock_with_key:  | GET | `/futures/{settle}/insurance` |
| [getAllDeliveryContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3235) |  | GET | `/delivery/{settle}/contracts` |
| [getDeliveryContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3247) |  | GET | `/delivery/{settle}/contracts/{contract}` |
| [getDeliveryOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3262) |  | GET | `/delivery/{settle}/order_book` |
| [getDeliveryTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3275) |  | GET | `/delivery/{settle}/trades` |
| [getDeliveryCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3289) |  | GET | `/delivery/{settle}/candlesticks` |
| [getDeliveryTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3300) |  | GET | `/delivery/{settle}/tickers` |
| [getDeliveryInsuranceBalanceHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3317) |  | GET | `/delivery/{settle}/insurance` |
| [getDeliveryAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3336) | :closed_lock_with_key:  | GET | `/delivery/{settle}/accounts` |
| [getDeliveryBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3347) | :closed_lock_with_key:  | GET | `/delivery/{settle}/account_book` |
| [getDeliveryPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3358) | :closed_lock_with_key:  | GET | `/delivery/{settle}/positions` |
| [getDeliveryPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3368) | :closed_lock_with_key:  | GET | `/delivery/{settle}/positions/{contract}` |
| [updateDeliveryMargin()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3383) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/margin` |
| [updateDeliveryLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3401) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/leverage` |
| [updateDeliveryRiskLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3419) | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/risk_limit` |
| [submitDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3439) | :closed_lock_with_key:  | POST | `/delivery/{settle}/orders` |
| [getDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3454) | :closed_lock_with_key:  | GET | `/delivery/{settle}/orders` |
| [cancelAllDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3467) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/orders` |
| [getDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3486) | :closed_lock_with_key:  | GET | `/delivery/{settle}/orders/{order_id}` |
| [cancelDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3501) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/orders/{order_id}` |
| [getDeliveryTradingHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3516) | :closed_lock_with_key:  | GET | `/delivery/{settle}/my_trades` |
| [getDeliveryClosedPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3529) | :closed_lock_with_key:  | GET | `/delivery/{settle}/position_close` |
| [getDeliveryLiquidationHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3542) | :closed_lock_with_key:  | GET | `/delivery/{settle}/liquidates` |
| [getDeliverySettlementHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3555) | :closed_lock_with_key:  | GET | `/delivery/{settle}/settlements` |
| [submitDeliveryTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3568) | :closed_lock_with_key:  | POST | `/delivery/{settle}/price_orders` |
| [getDeliveryAutoOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3583) | :closed_lock_with_key:  | GET | `/delivery/{settle}/price_orders` |
| [cancelAllOpenDeliveryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3596) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/price_orders` |
| [getDeliveryTriggeredOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3612) | :closed_lock_with_key:  | GET | `/delivery/{settle}/price_orders/{order_id}` |
| [cancelTriggeredDeliveryOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3627) | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/price_orders/{order_id}` |
| [getOptionsUnderlyings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3646) |  | GET | `/options/underlyings` |
| [getOptionsExpirationTimes()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3656) |  | GET | `/options/expirations` |
| [getOptionsContracts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3666) |  | GET | `/options/contracts` |
| [getOptionsContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3679) |  | GET | `/options/contracts/{contract}` |
| [getOptionsSettlementHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3689) |  | GET | `/options/settlements` |
| [getOptionsContractSettlement()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3701) |  | GET | `/options/settlements/{contract}` |
| [getOptionsMySettlements()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3716) | :closed_lock_with_key:  | GET | `/options/my_settlements` |
| [getOptionsOrderBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3730) |  | GET | `/options/order_book` |
| [getOptionsTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3742) |  | GET | `/options/tickers` |
| [getOptionsUnderlyingTicker()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3756) |  | GET | `/options/underlying/tickers/{underlying}` |
| [getOptionsCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3770) |  | GET | `/options/candlesticks` |
| [getOptionsUnderlyingCandles()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3780) |  | GET | `/options/underlying/candlesticks` |
| [getOptionsTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3792) |  | GET | `/options/trades` |
| [getOptionsAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3803) | :closed_lock_with_key:  | GET | `/options/accounts` |
| [getOptionsAccountChange()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3813) | :closed_lock_with_key:  | GET | `/options/account_book` |
| [getOptionsPositionsUnderlying()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3825) | :closed_lock_with_key:  | GET | `/options/positions` |
| [getOptionsPositionContract()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3837) | :closed_lock_with_key:  | GET | `/options/positions/{contract}` |
| [getOptionsLiquidation()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3849) | :closed_lock_with_key:  | GET | `/options/position_close` |
| [submitOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3862) | :closed_lock_with_key:  | POST | `/options/orders` |
| [getOptionsOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3874) | :closed_lock_with_key:  | GET | `/options/orders` |
| [cancelAllOpenOptionsOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3886) | :closed_lock_with_key:  | DELETE | `/options/orders` |
| [getOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3900) | :closed_lock_with_key:  | GET | `/options/orders/{order_id}` |
| [cancelOptionsOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3912) | :closed_lock_with_key:  | DELETE | `/options/orders/{order_id}` |
| [submitOptionsCountdownCancel()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3931) | :closed_lock_with_key:  | POST | `/options/countdown_cancel_all` |
| [getOptionsPersonalHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3947) | :closed_lock_with_key:  | GET | `/options/my_trades` |
| [setOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3959) | :closed_lock_with_key:  | POST | `/options/mmp` |
| [getOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3971) | :closed_lock_with_key:  | GET | `/options/mmp` |
| [resetOptionsMMPSettings()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3983) | :closed_lock_with_key:  | POST | `/options/mmp/reset` |
| [getLendingCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L3999) |  | GET | `/earn/uni/currencies` |
| [getLendingCurrency()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4009) |  | GET | `/earn/uni/currencies/{currency}` |
| [submitLendOrRedeemOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4019) | :closed_lock_with_key:  | POST | `/earn/uni/lends` |
| [getLendingOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4029) | :closed_lock_with_key:  | GET | `/earn/uni/lends` |
| [updateLendingOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4041) | :closed_lock_with_key:  | PATCH | `/earn/uni/lends` |
| [getLendingRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4054) | :closed_lock_with_key:  | GET | `/earn/uni/lend_records` |
| [getLendingTotalInterest()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4067) | :closed_lock_with_key:  | GET | `/earn/uni/interests/{currency}` |
| [getLendingInterestRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4080) | :closed_lock_with_key:  | GET | `/earn/uni/interest_records` |
| [updateInterestReinvestment()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4093) | :closed_lock_with_key:  | PUT | `/earn/uni/interest_reinvest` |
| [getLendingInterestStatus()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4109) | :closed_lock_with_key:  | GET | `/earn/uni/interest_status/{currency}` |
| [getLendingAnnualizedTrendChart()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4124) | :closed_lock_with_key:  | GET | `/earn/uni/chart` |
| [getLendingEstimatedRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4132) | :closed_lock_with_key:  | GET | `/earn/uni/rate` |
| [submitLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4149) | :closed_lock_with_key:  | POST | `/loan/collateral/orders` |
| [getLoanOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4159) | :closed_lock_with_key:  | GET | `/loan/collateral/orders` |
| [getLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4169) | :closed_lock_with_key:  | GET | `/loan/collateral/orders/{order_id}` |
| [submitLoanRepay()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4182) | :closed_lock_with_key:  | POST | `/loan/collateral/repay` |
| [getLoanRepaymentHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4199) | :closed_lock_with_key:  | GET | `/loan/collateral/repay_records` |
| [updateLoanCollateral()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4211) | :closed_lock_with_key:  | POST | `/loan/collateral/collaterals` |
| [getLoanCollateralRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4221) | :closed_lock_with_key:  | GET | `/loan/collateral/collaterals` |
| [getLoanTotalAmount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4235) | :closed_lock_with_key:  | GET | `/loan/collateral/total_amount` |
| [getLoanCollateralizationRatio()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4248) | :closed_lock_with_key:  | GET | `/loan/collateral/ltv` |
| [getLoanSupportedCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4264) |  | GET | `/loan/collateral/currencies` |
| [submitMultiLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4284) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/orders` |
| [getMultiLoanOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4296) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/orders` |
| [getMultiLoanOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4308) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/orders/{order_id}` |
| [repayMultiLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4318) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/repay` |
| [getMultiLoanRepayRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4328) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/repay` |
| [updateMultiLoan()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4340) | :closed_lock_with_key:  | POST | `/loan/multi_collateral/mortgage` |
| [getMultiLoanAdjustmentRecords()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4352) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/mortgage` |
| [getMultiLoanCurrencyQuota()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4364) | :closed_lock_with_key:  | GET | `/loan/multi_collateral/currency_quota` |
| [getMultiLoanSupportedCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4376) |  | GET | `/loan/multi_collateral/currencies` |
| [getMultiLoanRatio()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4385) |  | GET | `/loan/multi_collateral/ltv` |
| [getMultiLoanFixedRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4394) |  | GET | `/loan/multi_collateral/fixed_rate` |
| [getMultiLoanCurrentRates()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4407) |  | GET | `/loan/multi_collateral/current_rate` |
| [submitEth2Swap()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4429) | :closed_lock_with_key:  | POST | `/earn/staking/eth2/swap` |
| [getEth2RateHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4438) | :closed_lock_with_key:  | GET | `/earn/staking/eth2/rate_records` |
| [getDualInvestmentProducts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4449) |  | GET | `/earn/dual/investment_plan` |
| [getDualInvestmentOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4460) | :closed_lock_with_key:  | GET | `/earn/dual/orders` |
| [submitDualInvestmentOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4472) | :closed_lock_with_key:  | POST | `/earn/dual/orders` |
| [getStructuredProducts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4487) |  | GET | `/earn/structured/products` |
| [getStructuredProductOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4499) | :closed_lock_with_key:  | GET | `/earn/structured/orders` |
| [submitStructuredProductOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4511) | :closed_lock_with_key:  | POST | `/earn/structured/orders` |
| [getStakingCoins()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4524) | :closed_lock_with_key:  | GET | `/earn/staking/coins` |
| [submitStakingSwap()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4537) | :closed_lock_with_key:  | POST | `/earn/staking/swap` |
| [getAccountDetail()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4556) | :closed_lock_with_key:  | GET | `/account/detail` |
| [getAccountRateLimit()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4565) | :closed_lock_with_key:  | GET | `/account/rate_limit` |
| [createStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4575) | :closed_lock_with_key:  | POST | `/account/stp_groups` |
| [getStpGroups()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4585) | :closed_lock_with_key:  | GET | `/account/stp_groups` |
| [getStpGroupUsers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4595) | :closed_lock_with_key:  | GET | `/account/stp_groups/{stp_id}/users` |
| [addUsersToStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4605) | :closed_lock_with_key:  | POST | `/account/stp_groups/{stp_id}/users` |
| [deleteUserFromStpGroup()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4621) | :closed_lock_with_key:  | DELETE | `/account/stp_groups/{stp_id}/users` |
| [setGTDeduction()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4639) | :closed_lock_with_key:  | POST | `/account/debit_fee` |
| [getGTDeduction()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4650) | :closed_lock_with_key:  | GET | `/account/debit_fee` |
| [getAccountMainKeys()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4659) | :closed_lock_with_key:  | GET | `/account/main_keys` |
| [getAgencyTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4675) | :closed_lock_with_key:  | GET | `/rebate/agency/transaction_history` |
| [getAgencyCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4688) | :closed_lock_with_key:  | GET | `/rebate/agency/commission_history` |
| [getPartnerTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4702) | :closed_lock_with_key:  | GET | `/rebate/partner/transaction_history` |
| [getPartnerCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4717) | :closed_lock_with_key:  | GET | `/rebate/partner/commission_history` |
| [getPartnerSubordinateList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4740) | :closed_lock_with_key:  | GET | `/rebate/partner/sub_list` |
| [getBrokerCommissionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4754) | :closed_lock_with_key:  | GET | `/rebate/broker/commission_history` |
| [getBrokerTransactionHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4767) | :closed_lock_with_key:  | GET | `/rebate/broker/transaction_history` |
| [getUserRebateInfo()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4776) | :closed_lock_with_key:  | GET | `/rebate/user/info` |
| [createOTCQuote()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4811) | :closed_lock_with_key:  | POST | `/otc/quote` |
| [createOTCFiatOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4823) | :closed_lock_with_key:  | POST | `/otc/order/create` |
| [createOTCStablecoinOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4837) | :closed_lock_with_key:  | POST | `/otc/stable_coin/order/create` |
| [getOTCUserDefaultBank()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4850) | :closed_lock_with_key:  | GET | `/otc/get_user_def_bank` |
| [markOTCOrderAsPaid()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4862) | :closed_lock_with_key:  | POST | `/otc/order/paid` |
| [cancelOTCOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4876) | :closed_lock_with_key:  | POST | `/otc/order/cancel` |
| [getOTCFiatOrderList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4888) | :closed_lock_with_key:  | GET | `/otc/order/list` |
| [getOTCStablecoinOrderList()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4902) | :closed_lock_with_key:  | GET | `/otc/stable_coin/order/list` |
| [getOTCFiatOrderDetail()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4916) | :closed_lock_with_key:  | GET | `/otc/order/detail` |
| [getCrossExSymbols()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4935) |  | GET | `/crossex/rule/symbols` |
| [getCrossExRiskLimits()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4947) |  | GET | `/crossex/rule/risk_limits` |
| [getCrossExTransferCoins()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4961) |  | GET | `/crossex/transfers/coin` |
| [createCrossExTransfer()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4975) | :closed_lock_with_key:  | POST | `/crossex/transfers` |
| [getCrossExTransferHistory()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L4989) | :closed_lock_with_key:  | GET | `/crossex/transfers` |
| [createCrossExOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5003) | :closed_lock_with_key:  | POST | `/crossex/orders` |
| [cancelCrossExOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5017) | :closed_lock_with_key:  | DELETE | `/crossex/orders/{order_id}` |
| [modifyCrossExOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5030) | :closed_lock_with_key:  | PUT | `/crossex/orders/{order_id}` |
| [getCrossExOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5045) | :closed_lock_with_key:  | GET | `/crossex/orders/{order_id}` |
| [createCrossExConvertQuote()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5057) | :closed_lock_with_key:  | POST | `/crossex/convert/quote` |
| [createCrossExConvertOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5071) | :closed_lock_with_key:  | POST | `/crossex/convert/orders` |
| [updateCrossExAccount()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5083) | :closed_lock_with_key:  | PUT | `/crossex/accounts` |
| [getCrossExAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5097) | :closed_lock_with_key:  | GET | `/crossex/accounts` |
| [setCrossExPositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5109) | :closed_lock_with_key:  | POST | `/crossex/positions/leverage` |
| [getCrossExPositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5123) | :closed_lock_with_key:  | GET | `/crossex/positions/leverage` |
| [setCrossExMarginPositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5137) | :closed_lock_with_key:  | POST | `/crossex/margin_positions/leverage` |
| [getCrossExMarginPositionLeverage()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5153) | :closed_lock_with_key:  | GET | `/crossex/margin_positions/leverage` |
| [closeCrossExPosition()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5167) | :closed_lock_with_key:  | DELETE | `/crossex/position` |
| [getCrossExInterestRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5181) | :closed_lock_with_key:  | GET | `/crossex/interest_rate` |
| [getCrossExFeeRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5194) | :closed_lock_with_key:  | GET | `/crossex/fee` |
| [getCrossExPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5206) | :closed_lock_with_key:  | GET | `/crossex/positions` |
| [getCrossExMarginPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5220) | :closed_lock_with_key:  | GET | `/crossex/margin_positions` |
| [getCrossExAdlRank()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5234) | :closed_lock_with_key:  | GET | `/crossex/adl_rank` |
| [getCrossExOpenOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5246) | :closed_lock_with_key:  | GET | `/crossex/open_orders` |
| [getCrossExHistoryOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5260) | :closed_lock_with_key:  | GET | `/crossex/history_orders` |
| [getCrossExHistoryPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5274) | :closed_lock_with_key:  | GET | `/crossex/history_positions` |
| [getCrossExHistoryMarginPositions()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5288) | :closed_lock_with_key:  | GET | `/crossex/history_margin_positions` |
| [getCrossExHistoryMarginInterests()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5302) | :closed_lock_with_key:  | GET | `/crossex/history_margin_interests` |
| [getCrossExHistoryTrades()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5316) | :closed_lock_with_key:  | GET | `/crossex/history_trades` |
| [getCrossExAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5330) | :closed_lock_with_key:  | GET | `/crossex/account_book` |
| [getCrossExCoinDiscountRate()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5344) | :closed_lock_with_key:  | GET | `/crossex/coin_discount_rate` |
| [getAlphaAccounts()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5362) | :closed_lock_with_key:  | GET | `/alpha/accounts` |
| [getAlphaAccountBook()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5374) | :closed_lock_with_key:  | GET | `/alpha/account_book` |
| [createAlphaQuote()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5388) | :closed_lock_with_key:  | POST | `/alpha/quote` |
| [createAlphaOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5400) | :closed_lock_with_key:  | POST | `/alpha/orders` |
| [getAlphaOrders()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5412) | :closed_lock_with_key:  | GET | `/alpha/orders` |
| [getAlphaOrder()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5424) | :closed_lock_with_key:  | GET | `/alpha/order` |
| [getAlphaCurrencies()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5436) |  | GET | `/alpha/currencies` |
| [getAlphaTickers()](https://github.com/tiagosiebler/gateio-api/blob/master/src/RestClient.ts#L5448) |  | GET | `/alpha/tickers` |

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