
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
| `getSystemMaintenanceStatus()` |  | GET | `/v1/public/system_info` |
| `submitWithdrawal()` | :closed_lock_with_key:  | POST | `/withdrawals` |
| `submitSpotMainAccountTransfer()` | :closed_lock_with_key:  | POST | `/withdrawals/push` |
| `cancelWithdrawal()` | :closed_lock_with_key:  | DELETE | `/withdrawals/{withdrawal_id}` |
| `getCurrencyChains()` |  | GET | `/wallet/currency_chains` |
| `createDepositAddress()` | :closed_lock_with_key:  | GET | `/wallet/deposit_address` |
| `getWithdrawalRecords()` | :closed_lock_with_key:  | GET | `/wallet/withdrawals` |
| `getDepositRecords()` | :closed_lock_with_key:  | GET | `/wallet/deposits` |
| `submitTransfer()` | :closed_lock_with_key:  | POST | `/wallet/transfers` |
| `submitMainSubTransfer()` | :closed_lock_with_key:  | POST | `/wallet/sub_account_transfers` |
| `getMainSubTransfers()` | :closed_lock_with_key:  | GET | `/wallet/sub_account_transfers` |
| `submitSubToSubTransfer()` | :closed_lock_with_key:  | POST | `/wallet/sub_account_to_sub_account` |
| `getWithdrawalStatus()` | :closed_lock_with_key:  | GET | `/wallet/withdraw_status` |
| `getSubBalance()` | :closed_lock_with_key:  | GET | `/wallet/sub_account_balances` |
| `getSubMarginBalances()` | :closed_lock_with_key:  | GET | `/wallet/sub_account_margin_balances` |
| `getSubFuturesBalances()` | :closed_lock_with_key:  | GET | `/wallet/sub_account_futures_balances` |
| `getSubCrossMarginBalances()` | :closed_lock_with_key:  | GET | `/wallet/sub_account_cross_margin_balances` |
| `getSavedAddresses()` | :closed_lock_with_key:  | GET | `/wallet/saved_address` |
| `getTradingFees()` | :closed_lock_with_key:  | GET | `/wallet/fee` |
| `getBalances()` | :closed_lock_with_key:  | GET | `/wallet/total_balance` |
| `getSmallBalances()` | :closed_lock_with_key:  | GET | `/wallet/small_balance` |
| `convertSmallBalance()` | :closed_lock_with_key:  | POST | `/wallet/small_balance` |
| `getSmallBalanceHistory()` | :closed_lock_with_key:  | GET | `/wallet/small_balance_history` |
| `getPushOrders()` | :closed_lock_with_key:  | GET | `/wallet/push` |
| `createSubAccount()` | :closed_lock_with_key:  | POST | `/sub_accounts` |
| `getSubAccounts()` | :closed_lock_with_key:  | GET | `/sub_accounts` |
| `getSubAccount()` | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}` |
| `createSubAccountApiKey()` | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/keys` |
| `getSubAccountApiKeys()` | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}/keys` |
| `updateSubAccountApiKey()` | :closed_lock_with_key:  | PUT | `/sub_accounts/{user_id}/keys/{key}` |
| `deleteSubAccountApiKey()` | :closed_lock_with_key:  | DELETE | `/sub_accounts/{user_id}/keys/{key}` |
| `getSubAccountApiKey()` | :closed_lock_with_key:  | GET | `/sub_accounts/{user_id}/keys/{key}` |
| `lockSubAccount()` | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/lock` |
| `unlockSubAccount()` | :closed_lock_with_key:  | POST | `/sub_accounts/{user_id}/unlock` |
| `getSubAccountMode()` | :closed_lock_with_key:  | GET | `/sub_accounts/unified_mode` |
| `getUnifiedAccountInfo()` | :closed_lock_with_key:  | GET | `/unified/accounts` |
| `getUnifiedMaxBorrow()` | :closed_lock_with_key:  | GET | `/unified/borrowable` |
| `getUnifiedMaxTransferable()` | :closed_lock_with_key:  | GET | `/unified/transferable` |
| `submitUnifiedBorrowOrRepay()` | :closed_lock_with_key:  | POST | `/unified/loans` |
| `getUnifiedLoans()` | :closed_lock_with_key:  | GET | `/unified/loans` |
| `getUnifiedLoanRecords()` | :closed_lock_with_key:  | GET | `/unified/loan_records` |
| `getUnifiedInterestRecords()` | :closed_lock_with_key:  | GET | `/unified/interest_records` |
| `getUnifiedRiskUnitDetails()` | :closed_lock_with_key:  | GET | `/unified/risk_units` |
| `setUnifiedAccountMode()` | :closed_lock_with_key:  | PUT | `/unified/unified_mode` |
| `getUnifiedAccountMode()` | :closed_lock_with_key:  | GET | `/unified/unified_mode` |
| `getUnifiedEstimateRate()` | :closed_lock_with_key:  | GET | `/unified/estimate_rate` |
| `getUnifiedCurrencyDiscountTiers()` |  | GET | `/unified/currency_discount_tiers` |
| `getLoanMarginTiers()` |  | GET | `/unified/loan_margin_tiers` |
| `portfolioMarginCalculate()` |  | POST | `/unified/portfolio_calculator` |
| `getSpotCurrencies()` |  | GET | `/spot/currencies` |
| `getSpotCurrency()` |  | GET | `/spot/currencies/{currency}` |
| `getSpotCurrencyPairs()` |  | GET | `/spot/currency_pairs` |
| `getSpotCurrencyPair()` |  | GET | `/spot/currency_pairs/{currency_pair}` |
| `getSpotTicker()` |  | GET | `/spot/tickers` |
| `getSpotOrderBook()` |  | GET | `/spot/order_book` |
| `getSpotTrades()` |  | GET | `/spot/trades` |
| `getSpotCandles()` |  | GET | `/spot/candlesticks` |
| `getSpotFeeRates()` | :closed_lock_with_key:  | GET | `/spot/fee` |
| `getSpotBatchFeeRates()` | :closed_lock_with_key:  | GET | `/spot/batch_fee` |
| `getSpotAccounts()` | :closed_lock_with_key:  | GET | `/spot/accounts` |
| `getSpotAccountBook()` | :closed_lock_with_key:  | GET | `/spot/account_book` |
| `submitSpotBatchOrders()` | :closed_lock_with_key:  | POST | `/spot/batch_orders` |
| `getSpotOpenOrders()` | :closed_lock_with_key:  | GET | `/spot/open_orders` |
| `submitSpotClosePosCrossDisabled()` | :closed_lock_with_key:  | POST | `/spot/cross_liquidate_orders` |
| `submitSpotOrder()` | :closed_lock_with_key:  | POST | `/spot/orders` |
| `getSpotOrders()` | :closed_lock_with_key:  | GET | `/spot/orders` |
| `cancelSpotOpenOrders()` | :closed_lock_with_key:  | DELETE | `/spot/orders` |
| `batchCancelSpotOrders()` | :closed_lock_with_key:  | POST | `/spot/cancel_batch_orders` |
| `getSpotOrder()` | :closed_lock_with_key:  | GET | `/spot/orders/{order_id}` |
| `updateSpotOrder()` | :closed_lock_with_key:  | PATCH | `/spot/orders/{order_id}` |
| `cancelSpotOrder()` | :closed_lock_with_key:  | DELETE | `/spot/orders/{order_id}` |
| `getSpotTradingHistory()` | :closed_lock_with_key:  | GET | `/spot/my_trades` |
| `getServerTime()` |  | GET | `/spot/time` |
| `submitSpotCountdownOrders()` | :closed_lock_with_key:  | POST | `/spot/countdown_cancel_all` |
| `batchUpdateSpotOrders()` | :closed_lock_with_key:  | POST | `/spot/amend_batch_orders` |
| `submitSpotPriceTriggerOrder()` | :closed_lock_with_key:  | POST | `/spot/price_orders` |
| `getSpotAutoOrders()` | :closed_lock_with_key:  | GET | `/spot/price_orders` |
| `cancelAllOpenSpotOrders()` | :closed_lock_with_key:  | DELETE | `/spot/price_orders` |
| `getPriceTriggeredOrder()` | :closed_lock_with_key:  | GET | `/spot/price_orders/{order_id}` |
| `cancelSpotTriggeredOrder()` | :closed_lock_with_key:  | DELETE | `/spot/price_orders/{order_id}` |
| `getMarginAccounts()` | :closed_lock_with_key:  | GET | `/margin/accounts` |
| `getMarginBalanceHistory()` | :closed_lock_with_key:  | GET | `/margin/account_book` |
| `getFundingAccounts()` | :closed_lock_with_key:  | GET | `/margin/funding_accounts` |
| `updateAutoRepaymentSetting()` | :closed_lock_with_key:  | POST | `/margin/auto_repay` |
| `getAutoRepaymentSetting()` | :closed_lock_with_key:  | GET | `/margin/auto_repay` |
| `getMarginTransferableAmount()` | :closed_lock_with_key:  | GET | `/margin/transferable` |
| `getCrossMarginCurrencies()` |  | GET | `/margin/cross/currencies` |
| `getCrossMarginCurrency()` |  | GET | `/margin/cross/currencies/{currency}` |
| `getCrossMarginAccount()` | :closed_lock_with_key:  | GET | `/margin/cross/accounts` |
| `getCrossMarginAccountHistory()` | :closed_lock_with_key:  | GET | `/margin/cross/account_book` |
| `submitCrossMarginBorrowLoan()` | :closed_lock_with_key:  | POST | `/margin/cross/loans` |
| `getCrossMarginBorrowHistory()` | :closed_lock_with_key:  | GET | `/margin/cross/loans` |
| `getCrossMarginBorrowLoan()` | :closed_lock_with_key:  | GET | `/margin/cross/loans/{loan_id}` |
| `submitCrossMarginRepayment()` | :closed_lock_with_key:  | POST | `/margin/cross/repayments` |
| `getCrossMarginRepayments()` | :closed_lock_with_key:  | GET | `/margin/cross/repayments` |
| `getCrossMarginInterestRecords()` | :closed_lock_with_key:  | GET | `/margin/cross/interest_records` |
| `getCrossMarginTransferableAmount()` | :closed_lock_with_key:  | GET | `/margin/cross/transferable` |
| `getEstimatedInterestRates()` | :closed_lock_with_key:  | GET | `/margin/cross/estimate_rate` |
| `getCrossMarginBorrowableAmount()` | :closed_lock_with_key:  | GET | `/margin/cross/borrowable` |
| `getLendingMarkets()` |  | GET | `/margin/uni/currency_pairs` |
| `getLendingMarket()` |  | GET | `/margin/uni/currency_pairs/{currency_pair}` |
| `getEstimatedInterestRate()` | :closed_lock_with_key:  | GET | `/margin/uni/estimate_rate` |
| `submitMarginUNIBorrowOrRepay()` | :closed_lock_with_key:  | POST | `/margin/uni/loans` |
| `getMarginUNILoans()` | :closed_lock_with_key:  | GET | `/margin/uni/loans` |
| `getMarginUNILoanRecords()` | :closed_lock_with_key:  | GET | `/margin/uni/loan_records` |
| `getMarginUNIInterestRecords()` | :closed_lock_with_key:  | GET | `/margin/uni/interest_records` |
| `getMarginUNIMaxBorrow()` | :closed_lock_with_key:  | GET | `/margin/uni/borrowable` |
| `getFlashSwapCurrencyPairs()` |  | GET | `/flash_swap/currency_pairs` |
| `submitFlashSwapOrder()` | :closed_lock_with_key:  | POST | `/flash_swap/orders` |
| `getFlashSwapOrders()` | :closed_lock_with_key:  | GET | `/flash_swap/orders` |
| `getFlashSwapOrder()` | :closed_lock_with_key:  | GET | `/flash_swap/orders/{order_id}` |
| `submitFlashSwapOrderPreview()` | :closed_lock_with_key:  | POST | `/flash_swap/orders/preview` |
| `getFuturesContracts()` |  | GET | `/futures/{settle}/contracts` |
| `getFuturesContract()` |  | GET | `/futures/{settle}/contracts/{contract}` |
| `getFuturesOrderBook()` |  | GET | `/futures/{settle}/order_book` |
| `getFuturesTrades()` |  | GET | `/futures/{settle}/trades` |
| `getFuturesCandles()` |  | GET | `/futures/{settle}/candlesticks` |
| `getPremiumIndexKLines()` |  | GET | `/futures/{settle}/premium_index` |
| `getFuturesTickers()` |  | GET | `/futures/{settle}/tickers` |
| `getFundingRates()` |  | GET | `/futures/{settle}/funding_rate` |
| `getFuturesInsuranceBalanceHistory()` |  | GET | `/futures/{settle}/insurance` |
| `getFuturesStats()` |  | GET | `/futures/{settle}/contract_stats` |
| `getIndexConstituents()` |  | GET | `/futures/{settle}/index_constituents/{index}` |
| `getLiquidationHistory()` |  | GET | `/futures/{settle}/liq_orders` |
| `getRiskLimitTiers()` |  | GET | `/futures/{settle}/risk_limit_tiers` |
| `getFuturesAccount()` | :closed_lock_with_key:  | GET | `/futures/{settle}/accounts` |
| `getFuturesAccountBook()` | :closed_lock_with_key:  | GET | `/futures/{settle}/account_book` |
| `getFuturesPositions()` | :closed_lock_with_key:  | GET | `/futures/{settle}/positions` |
| `getFuturesPosition()` | :closed_lock_with_key:  | GET | `/futures/{settle}/positions/{contract}` |
| `updateFuturesMargin()` | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/margin` |
| `updateFuturesLeverage()` | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/leverage` |
| `updatePositionRiskLimit()` | :closed_lock_with_key:  | POST | `/futures/{settle}/positions/{contract}/risk_limit` |
| `updateFuturesDualMode()` | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_mode` |
| `getDualModePosition()` | :closed_lock_with_key:  | GET | `/futures/{settle}/dual_comp/positions/{contract}` |
| `updateDualModePositionMargin()` | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/margin` |
| `updateDualModePositionLeverage()` | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/leverage` |
| `updateDualModePositionRiskLimit()` | :closed_lock_with_key:  | POST | `/futures/{settle}/dual_comp/positions/{contract}/risk_limit` |
| `submitFuturesOrder()` | :closed_lock_with_key:  | POST | `/futures/{settle}/orders` |
| `getFuturesOrders()` | :closed_lock_with_key:  | GET | `/futures/{settle}/orders` |
| `cancelAllFuturesOrders()` | :closed_lock_with_key:  | DELETE | `/futures/{settle}/orders` |
| `getFuturesOrdersByTimeRange()` | :closed_lock_with_key:  | GET | `/futures/{settle}/orders_timerange` |
| `submitFuturesBatchOrders()` | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_orders` |
| `getFuturesOrder()` | :closed_lock_with_key:  | GET | `/futures/{settle}/orders/{order_id}` |
| `cancelFuturesOrder()` | :closed_lock_with_key:  | DELETE | `/futures/{settle}/orders/{order_id}` |
| `updateFuturesOrder()` | :closed_lock_with_key:  | PUT | `/futures/{settle}/orders/{order_id}` |
| `getFuturesTradingHistory()` | :closed_lock_with_key:  | GET | `/futures/{settle}/my_trades` |
| `getFuturesTradingHistoryByTimeRange()` | :closed_lock_with_key:  | GET | `/futures/{settle}/my_trades_timerange` |
| `getFuturesPositionHistory()` | :closed_lock_with_key:  | GET | `/futures/{settle}/position_close` |
| `getFuturesLiquidationHistory()` | :closed_lock_with_key:  | GET | `/futures/{settle}/liquidates` |
| `getFuturesAutoDeleveragingHistory()` | :closed_lock_with_key:  | GET | `/futures/{settle}/auto_deleverages` |
| `setFuturesOrderCancelCountdown()` | :closed_lock_with_key:  | POST | `/futures/{settle}/countdown_cancel_all` |
| `getFuturesUserTradingFees()` | :closed_lock_with_key:  | GET | `/futures/{settle}/fee` |
| `batchCancelFuturesOrders()` | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_cancel_orders` |
| `batchUpdateFuturesOrders()` | :closed_lock_with_key:  | POST | `/futures/{settle}/batch_amend_orders` |
| `submitFuturesPriceTriggeredOrder()` | :closed_lock_with_key:  | POST | `/futures/{settle}/price_orders` |
| `getFuturesAutoOrders()` | :closed_lock_with_key:  | GET | `/futures/{settle}/price_orders` |
| `cancelAllOpenFuturesOrders()` | :closed_lock_with_key:  | DELETE | `/futures/{settle}/price_orders` |
| `getFuturesPriceTriggeredOrder()` | :closed_lock_with_key:  | GET | `/futures/{settle}/price_orders/{order_id}` |
| `cancelFuturesPriceTriggeredOrder()` | :closed_lock_with_key:  | DELETE | `/futures/{settle}/price_orders/{order_id}` |
| `getAllDeliveryContracts()` |  | GET | `/delivery/{settle}/contracts` |
| `getDeliveryContract()` |  | GET | `/delivery/{settle}/contracts/{contract}` |
| `getDeliveryOrderBook()` |  | GET | `/delivery/{settle}/order_book` |
| `getDeliveryTrades()` |  | GET | `/delivery/{settle}/trades` |
| `getDeliveryCandles()` |  | GET | `/delivery/{settle}/candlesticks` |
| `getDeliveryTickers()` |  | GET | `/delivery/{settle}/tickers` |
| `getDeliveryInsuranceBalanceHistory()` |  | GET | `/delivery/{settle}/insurance` |
| `getDeliveryAccount()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/accounts` |
| `getDeliveryBook()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/account_book` |
| `getDeliveryPositions()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/positions` |
| `getDeliveryPosition()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/positions/{contract}` |
| `updateDeliveryMargin()` | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/margin` |
| `updateDeliveryLeverage()` | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/leverage` |
| `updateDeliveryRiskLimit()` | :closed_lock_with_key:  | POST | `/delivery/{settle}/positions/{contract}/risk_limit` |
| `submitDeliveryOrder()` | :closed_lock_with_key:  | POST | `/delivery/{settle}/orders` |
| `getDeliveryOrders()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/orders` |
| `cancelAllDeliveryOrders()` | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/orders` |
| `getDeliveryOrder()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/orders/{order_id}` |
| `cancelDeliveryOrder()` | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/orders/{order_id}` |
| `getDeliveryTradingHistory()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/my_trades` |
| `getDeliveryClosedPositions()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/position_close` |
| `getDeliveryLiquidationHistory()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/liquidates` |
| `getDeliverySettlementHistory()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/settlements` |
| `submitDeliveryTriggeredOrder()` | :closed_lock_with_key:  | POST | `/delivery/{settle}/price_orders` |
| `getDeliveryAutoOrders()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/price_orders` |
| `cancelAllOpenDeliveryOrders()` | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/price_orders` |
| `getDeliveryTriggeredOrder()` | :closed_lock_with_key:  | GET | `/delivery/{settle}/price_orders/{order_id}` |
| `cancelTriggeredDeliveryOrder()` | :closed_lock_with_key:  | DELETE | `/delivery/{settle}/price_orders/{order_id}` |
| `getOptionsUnderlyings()` |  | GET | `/options/underlyings` |
| `getOptionsExpirationTimes()` |  | GET | `/options/expirations` |
| `getOptionsContracts()` |  | GET | `/options/contracts` |
| `getOptionsContract()` |  | GET | `/options/contracts/{contract}` |
| `getOptionsSettlementHistory()` |  | GET | `/options/settlements` |
| `getOptionsContractSettlement()` |  | GET | `/options/settlements/{contract}` |
| `getOptionsMySettlements()` | :closed_lock_with_key:  | GET | `/options/my_settlements` |
| `getOptionsOrderBook()` |  | GET | `/options/order_book` |
| `getOptionsTickers()` |  | GET | `/options/tickers` |
| `getOptionsUnderlyingTicker()` |  | GET | `/options/underlying/tickers/{underlying}` |
| `getOptionsCandles()` |  | GET | `/options/candlesticks` |
| `getOptionsUnderlyingCandles()` |  | GET | `/options/underlying/candlesticks` |
| `getOptionsTrades()` |  | GET | `/options/trades` |
| `getOptionsAccount()` | :closed_lock_with_key:  | GET | `/options/accounts` |
| `getOptionsAccountChange()` | :closed_lock_with_key:  | GET | `/options/account_book` |
| `getOptionsPositionsUnderlying()` | :closed_lock_with_key:  | GET | `/options/positions` |
| `getOptionsPositionContract()` | :closed_lock_with_key:  | GET | `/options/positions/{contract}` |
| `getOptionsLiquidation()` | :closed_lock_with_key:  | GET | `/options/position_close` |
| `submitOptionsOrder()` | :closed_lock_with_key:  | POST | `/options/orders` |
| `getOptionsOrders()` | :closed_lock_with_key:  | GET | `/options/orders` |
| `cancelAllOpenOptionsOrders()` | :closed_lock_with_key:  | DELETE | `/options/orders` |
| `getOptionsOrder()` | :closed_lock_with_key:  | GET | `/options/orders/{order_id}` |
| `cancelOptionsOrder()` | :closed_lock_with_key:  | DELETE | `/options/orders/{order_id}` |
| `submitOptionsCountdownCancel()` | :closed_lock_with_key:  | POST | `/options/countdown_cancel_all` |
| `getOptionsPersonalHistory()` | :closed_lock_with_key:  | GET | `/options/my_trades` |
| `setOptionsMMPSettings()` | :closed_lock_with_key:  | POST | `/options/mmp` |
| `getOptionsMMPSettings()` | :closed_lock_with_key:  | GET | `/options/mmp` |
| `resetOptionsMMPSettings()` | :closed_lock_with_key:  | POST | `/options/mmp/reset` |
| `getLendingCurrencies()` |  | GET | `/earn/uni/currencies` |
| `getLendingCurrency()` |  | GET | `/earn/uni/currencies/{currency}` |
| `submitLendOrRedeemOrder()` | :closed_lock_with_key:  | POST | `/earn/uni/lends` |
| `getLendingOrders()` | :closed_lock_with_key:  | GET | `/earn/uni/lends` |
| `updateLendingOrder()` | :closed_lock_with_key:  | PATCH | `/earn/uni/lends` |
| `getLendingRecords()` | :closed_lock_with_key:  | GET | `/earn/uni/lend_records` |
| `getLendingTotalInterest()` | :closed_lock_with_key:  | GET | `/earn/uni/interests/{currency}` |
| `getLendingInterestRecords()` | :closed_lock_with_key:  | GET | `/earn/uni/interest_records` |
| `updateInterestReinvestment()` | :closed_lock_with_key:  | PUT | `/earn/uni/interest_reinvest` |
| `getLendingInterestStatus()` | :closed_lock_with_key:  | GET | `/earn/uni/interest_status/{currency}` |
| `submitLoanOrder()` | :closed_lock_with_key:  | POST | `/loan/collateral/orders` |
| `getLoanOrders()` | :closed_lock_with_key:  | GET | `/loan/collateral/orders` |
| `getLoanOrder()` | :closed_lock_with_key:  | GET | `/loan/collateral/orders/{order_id}` |
| `submitLoanRepay()` | :closed_lock_with_key:  | POST | `/loan/collateral/repay` |
| `getLoanRepaymentHistory()` | :closed_lock_with_key:  | GET | `/loan/collateral/repay_records` |
| `updateLoanCollateral()` | :closed_lock_with_key:  | POST | `/loan/collateral/collaterals` |
| `getLoanCollateralRecords()` | :closed_lock_with_key:  | GET | `/loan/collateral/collaterals` |
| `getLoanTotalAmount()` | :closed_lock_with_key:  | GET | `/loan/collateral/total_amount` |
| `getLoanCollateralizationRatio()` | :closed_lock_with_key:  | GET | `/loan/collateral/ltv` |
| `getLoanSupportedCurrencies()` |  | GET | `/loan/collateral/currencies` |
| `submitMultiLoanOrder()` | :closed_lock_with_key:  | POST | `/loan/multi_collateral/orders` |
| `getMultiLoanOrders()` | :closed_lock_with_key:  | GET | `/loan/multi_collateral/orders` |
| `getMultiLoanOrder()` | :closed_lock_with_key:  | GET | `/loan/multi_collateral/orders/{order_id}` |
| `repayMultiLoan()` | :closed_lock_with_key:  | POST | `/loan/multi_collateral/repay` |
| `getMultiLoanRepayRecords()` | :closed_lock_with_key:  | GET | `/loan/multi_collateral/repay` |
| `updateMultiLoan()` | :closed_lock_with_key:  | POST | `/loan/multi_collateral/mortgage` |
| `getMultiLoanAdjustmentRecords()` | :closed_lock_with_key:  | GET | `/loan/multi_collateral/mortgage` |
| `getMultiLoanCurrencyQuota()` | :closed_lock_with_key:  | GET | `/loan/multi_collateral/currency_quota` |
| `getMultiLoanSupportedCurrencies()` |  | GET | `/loan/multi_collateral/currencies` |
| `getMultiLoanRatio()` |  | GET | `/loan/multi_collateral/ltv` |
| `getMultiLoanFixedRates()` |  | GET | `/loan/multi_collateral/fixed_rate` |
| `submitEth2Swap()` | :closed_lock_with_key:  | POST | `/earn/staking/eth2/swap` |
| `getDualInvestmentProducts()` |  | GET | `/earn/dual/investment_plan` |
| `getDualInvestmentOrders()` | :closed_lock_with_key:  | GET | `/earn/dual/orders` |
| `submitDualInvestmentOrder()` | :closed_lock_with_key:  | POST | `/earn/dual/orders` |
| `getStructuredProducts()` |  | GET | `/earn/structured/products` |
| `getStructuredProductOrders()` | :closed_lock_with_key:  | GET | `/earn/structured/orders` |
| `submitStructuredProductOrder()` | :closed_lock_with_key:  | POST | `/earn/structured/orders` |
| `getAccountDetail()` | :closed_lock_with_key:  | GET | `/account/detail` |
| `createStpGroup()` | :closed_lock_with_key:  | POST | `/account/stp_groups` |
| `getStpGroups()` | :closed_lock_with_key:  | GET | `/account/stp_groups` |
| `getStpGroupUsers()` | :closed_lock_with_key:  | GET | `/account/stp_groups/{stp_id}/users` |
| `addUsersToStpGroup()` | :closed_lock_with_key:  | POST | `/account/stp_groups/{stp_id}/users` |
| `deleteUserFromStpGroup()` | :closed_lock_with_key:  | DELETE | `/account/stp_groups/{stp_id}/users` |
| `setGTDeduction()` | :closed_lock_with_key:  | POST | `/account/debit_fee` |
| `getGTDeduction()` | :closed_lock_with_key:  | GET | `/account/debit_fee` |
| `getAgencyTransactionHistory()` | :closed_lock_with_key:  | GET | `/rebate/agency/transaction_history` |
| `getAgencyCommissionHistory()` | :closed_lock_with_key:  | GET | `/rebate/agency/commission_history` |
| `getPartnerTransactionHistory()` | :closed_lock_with_key:  | GET | `/rebate/partner/transaction_history` |
| `getPartnerCommissionHistory()` | :closed_lock_with_key:  | GET | `/rebate/partner/commission_history` |
| `getPartnerSubordinateList()` | :closed_lock_with_key:  | GET | `/rebate/partner/sub_list` |
| `getBrokerCommissionHistory()` | :closed_lock_with_key:  | GET | `/rebate/broker/commission_history` |
| `getBrokerTransactionHistory()` | :closed_lock_with_key:  | GET | `/rebate/broker/transaction_history` |
| `getUserRebateInfo()` | :closed_lock_with_key:  | GET | `/rebate/user/info` |