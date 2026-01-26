/**==========================================================================================================================
 * CROSSEX
 * ==========================================================================================================================
 */

export interface CrossExSymbol {
  symbol: string;
  exchange_type: string;
  business_type: string;
  state: string;
  min_size: string;
  min_notional: string;
  lot_size: string;
  tick_size: string;
  max_num_orders: string;
  max_market_size: string;
  max_limit_size: string;
  contract_size: string;
  liquidation_fee: string;
  delist_time: string;
}

export interface CrossExRiskLimitTier {
  min_risk_limit_value: string; // Minimum risk limit value
  max_risk_limit_value: string; // Maximum risk limit value
  leverage_max: string; // Maximum leverage
  maintenance_rate: string; // Maintenance margin rate
  tier: string; // Tier
}

export interface CrossExRiskLimit {
  symbol: string;
  tiers: CrossExRiskLimitTier[];
}

export interface CrossExTransferCoin {
  coin: string; // Currency
  min_trans_amount: number; // Minimum Transfer Quantity (including estimated fees)
  est_fee: number; // Estimated Fee
  precision: number; // Precision
  is_disabled: number; // If it is disabled. 0 means NOT being disabled
}

export interface CreateCrossExTransferResp {
  tx_id: string; // Order ID
  text: string; // User-defined Order ID
}

export interface CrossExTransferHistory {
  id: string; // Order ID
  text: string; // Client Custom ID
  from_account_type: string; // Source from account (CROSSEX_BINANCE, CROSSEX_OKX, CROSSEX_GATE, CROSSEX, SPOT)
  to_account_type: string;
  coin: string; // Currency
  amount: string; // Transfer amount, the amount requested for the transfer
  actual_receive: string; // Actual credited amount (has a value when status = SUCCESS; empty for other statuses)
  status: string; // Transfer Status - FAIL: Failed, SUCCESS: Successful, PENDING: Transfer in Progress
  fail_reason: string; // Failure reason (has a value when status = FAIL; empty for other statuses)
  create_time: number; // Creation time of order
  update_time: number; // Order Update Time
}

export interface CreateCrossExOrderResp {
  order_id: number | string;
  text: string; // User-defined Order ID
}

export interface CancelCrossExOrderResp {
  order_id: number;
  text: string;
}

export interface ModifyCrossExOrderResp {
  order_id: number;
  text: string;
}

export interface CrossExOrder {
  user_id: string; // User ID
  order_id: string; // Order ID
  text: string; // Client Order ID
  state: string; // Order Status
  symbol: string; // Currency pair
  side: string; // direction
  type: string; // type
  attribute: string; // Attribute COMMON: Normal Order, LIQ: Liquidation Takeover Order, REDUCE: Liquidation Reduce Order, ADL: Auto-Reduce
  exchange_type: string; // Exchange
  business_type: string; // Business Type
  qty: string; // Base Currency Quantity
  quote_qty: string; // Quote Currency Quantity
  price: string; // Price
  time_in_force: string; // Time in Force Strategy
  executed_qty: string; // Filled Quantity
  executed_amount: string; // Filled Amount
  executed_avg_price: string; // Average Filled Price
  fee_coin: string; // Fee currency
  fee: string; // fee
  reduce_only: string; // Reduce Position Only
  leverage: string; // leverage
  reason: string; // Reason
  last_executed_qty: string; // Latest Filled Quantity
  last_executed_price: string; // Latest Filled Price
  last_executed_amount: string; // Latest Filled Amount
  position_side: string; // Position Direction
  create_time: string; // Created time
  update_time: string; // Update time
}

export interface CreateCrossExConvertQuoteResp {
  quote_id: string; // Quote ID
  valid_ms: string; // Valid time (milliseconds timestamp)
  from_coin: string; // Asset Sold
  to_coin: string; // Asset Bought
  from_amount: string; // Amount to sell
  to_amount: string; // Amount to buy
  price: string; // Price
}

export interface UpdateCrossExAccountResp {
  position_mode: string; // Requested futures position mode to modify (SINGLE/DUAL)
  account_mode: string; // Requested account mode to modify (CROSS_EXCHANGE/ISOLATED_EXCHANGE, default: CROSS_EXCHANGE)
  exchange_type: string; // Requested exchange to modify (BINANCE/OKX/GATE/CROSSEX)
}

export interface CrossExAccountAsset {
  user_id: string; // User ID
  coin: string; // Currency
  exchange_type: string; // Exchange
  balance: string; // Balance
  upnl: string; // Unrealized P&L
  equity: string; // Equity (only USDT has a value; other assets are 0)
  futures_initial_margin: string; // Futures initial margin (only USDT has a value; other assets are 0)
  futures_maintenance_margin: string; // Futures maintenance margin (only USDT has a value; other assets are 0)
  borrowing_initial_margin: string; // Margin trading initial margin (only USDT has a value; other assets are 0)
  borrowing_maintenance_margin: string; // Margin trading maintenance margin (only USDT has a value; other assets are 0)
  available_balance: string; // Available Balance
  liability: string; // Liabilities (only meaningful in isolated exchange mode; always 0 in cross-exchange mode)
}

export interface CrossExAccount {
  user_id: string; // User ID
  available_margin: string; // Available Margin
  margin_balance: string; // margin balance
  initial_margin: string; // Initial Margin
  maintenance_margin: string; // Maintenance margin
  initial_margin_rate: string; // Initial margin rate
  maintenance_margin_rate: string; // Maintenance margin rate
  position_mode: string; // Contract Position Mode
  account_limit: string; // Account limit
  create_time: string; // Created time
  update_time: string; // Update time
  account_mode: string; // Account mode. CROSS_EXCHANGE: cross-exchange mode. ISOLATED_EXCHANGE: isolated exchange mode
  exchange_type: string; // Exchange type. When account_mode is CROSS_EXCHANGE, this must be CROSSEX; otherwise, it represents a specific exchange
  assets: CrossExAccountAsset[];
}

export interface SetCrossExPositionLeverageResp {
  symbol: string; // Currency pair
  leverage: string; // Requested Modified Leverage
}

export interface CrossExPositionLeverage {
  symbol: string; // Currency pair
  leverage: number | string;
}

export interface SetCrossExMarginPositionLeverageResp {
  symbol: string; // Currency pair
  leverage: string; // Requested Modified Leverage
}

export interface CrossExMarginPositionLeverage {
  symbol: string; // Currency pair
  leverage: number | string;
}

export interface CloseCrossExPositionResp {
  order_id: string; // Order ID
  text: string; // User-defined Order ID
}

export interface CrossExInterestRate {
  coin: string; // Currency
  exchange_type: string; // Exchange
  hour_interest_rate: string; // Hourly Interest Rate
  time: string; // Millisecond Timestamp
}

export interface CrossExSpecialFee {
  symbol: string; // Currency pair
  taker_fee_rate: string; // Taker fee rate
  maker_fee_rate: string; // Maker fee rate
}

export interface CrossExFeeRate {
  spot_maker_fee: string; // spot Maker fee rate
  spot_taker_fee: string; // spot Taker fee rate
  future_maker_fee: string; // contract Maker fee rate
  future_taker_fee: string; // contract Taker fee rate
  special_fee_list: CrossExSpecialFee[];
}

export interface CrossExPosition {
  user_id: string; // User ID
  position_id: string; // Position ID
  symbol: string; // Currency pair
  position_side: string; // Position Direction
  initial_margin: string; // Initial Margin
  maintenance_margin: string; // Maintenance margin
  position_qty: string; // Position Quantity
  position_value: string; // Position Value
  upnl: string; // Unrealized P&L
  upnl_rate: string; // Unrealized P&L Ratio
  entry_price: string; // Position Average Entry Price
  mark_price: string; // Mark price
  leverage: string; // Position Leverage
  max_leverage: string; // Maximum leverage
  risk_limit: string; // Position risk limit
  fee: string; // Position Fee
  funding_fee: string; // Position Funding Fee
  funding_time: string; // Position funding fee collection time (0 indicates it has not been collected yet)
  create_time: string; // Position Creation Time
  update_time: string; // Position Update Time
  closed_pnl: string; // Realized PnL
}

export interface CrossExMarginPosition {
  user_id: string; // User ID
  position_id: string; // Leveraged Position ID
  symbol: string; // Trading Pair
  position_side: string; // Position Direction
  initial_margin: string; // Initial position margin
  maintenance_margin: string; // Position maintenance margin
  asset_qty: string; // Position Asset Quantity
  asset_coin: string; // Position Asset Currency
  position_value: string; // Position Value
  liability: string; // Debt Quantity
  liability_coin: string; // Debt Currency
  interest: string; // Deducted Interest
  max_position_qty: string; // Max Trade Size
  entry_price: string; // Position Cost Price (Average Opening Price)
  index_price: string; // Index price
  upnl: string; // Unrealized P&L
  upnl_rate: string; // Unrealized P&L Ratio
  leverage: string; // Opening Leverage
  max_leverage: string; // Maximum leverage
  create_time: string; // Created time
  update_time: string; // Update time
}

export interface CrossExAdlRank {
  user_id: string; // User ID
  symbol: string; // Currency pair
  crossex_adl_rank: string; // CROSSEX position-reduction indicator ranking (1–5, higher value ranks higher)
  exchange_adl_rank: string; // Original exchange information (Binance: 0–4, higher value ranks higher; OKX: 0–5, higher value ranks higher; Gate: 1–5, lower value ranks higher)
}

export interface CrossExHistoryPosition {
  position_id: string; // Position ID
  user_id: string; // User ID
  symbol: string; // Currency pair
  closed_type: string; // Position close type (PARTIAL_CLOSED: partially closed; COMPLETE_CLOSED: fully closed)
  closed_pnl: string; // Close Position P&L
  closed_pnl_rate: string; // Close Position P&L Ratio
  open_avg_price: string; // Average Opening Price
  closed_avg_price: string; // Average Close Price
  max_position_qty: string; // Max Trade Size
  closed_qty: string; // Close Position Quantity
  closed_value: string; // Close Position Value
  fee: string; // Position Accumulated Fees
  liq_fee: string; // Liquidation Fee
  funding_fee: string; // Funding Fee
  position_side: string; // Position Direction Before Close
  position_mode: string; // Position Mode at Close
  leverage: string; // Leverage at Close
  business_type: string; // Business Type
  create_time: string; // Created time
  update_time: string; // Update time
}

export interface CrossExHistoryMarginPosition {
  position_id: string; // Position ID
  user_id: string; // User ID
  symbol: string; // Currency pair
  closed_type: string; // Position close type (PARTIAL_CLOSED: partially closed; COMPLETE_CLOSED: fully closed)
  closed_pnl: string; // Close Position P&L
  closed_pnl_rate: string; // Close Position P&L Ratio
  open_avg_price: string; // Average Opening Price
  closed_avg_price: string; // Average Close Price
  max_position_qty: string; // Max Trade Size
  closed_qty: string; // Close Position Quantity
  closed_value: string; // Close Position Value
  liq_fee: string; // Liquidation Fee
  position_side: string; // Position Direction Before Close
  leverage: string; // Leverage at Close
  interest: string; // Total Deducted Interest
  business_type: string; // Position Business Type
  create_time: string; // Created time
  update_time: string; // Update time
}

export interface CrossExHistoryMarginInterest {
  userId: string; // User ID
  symbol: string; // Trading Pair
  interest_id: string; // Interest Deduction ID
  liability_id: string; // Debt Source ID, can be Order ID or Position ID
  liability: string; // Debt Quantity
  liability_coin: string; // Debt Currency
  interest: string; // Interest
  interest_rate: string; // interest rate
  interest_type: string; // Interest deduction type (PERIODIC_POSITION: periodic position interest; PERIODIC_OPEN_ORDER: periodic open-order interest; IMMEDIATE_OPEN_ORDER: interest charged on order opening)
  create_time: string; // Created time
  exchange_type: string; // Exchange
}

export interface CrossExHistoryTrade {
  user_id: string; // User ID
  transaction_id: string; // filled records ID
  order_id: string; // Order ID
  text: string; // User Order ID
  symbol: string; // Currency pair
  exchange_type: string; // Exchange
  business_type: string; // Business Type
  side: string; // Buy/Sell Direction
  qty: string; // Trading size
  price: string; // Fill Price
  fee: string; // fee
  fee_coin: string; // Fee currency
  fee_rate: string; // Fee Rate
  match_role: string; // Filled Role
  rpnl: string; // Realized P&L
  position_mode: string; // Position Mode
  position_side: string; // Position Direction
  create_time: string; // Created time
}

export interface CrossExAccountBook {
  id: string; // Account Change Record ID
  user_id: string; // User ID
  business_id: string; // Business ID
  type: string; // TRANSACTION, TRADING_FEE, FUNDING_FEE, LIQUIDATION_FEE, TRANSFER_IN, TRANSFER_OUT, BANKRUPT_COMPENSATION, AUTO_REPAY
  exchange_type: string; // Exchange
  coin: string; // Currency
  change: string; // Change amount (positive indicates transfer in; negative indicates transfer out)
  balance: string; // Balance after change
  create_time: string; // Created time
}

export interface CrossExCoinDiscountRate {
  coin: string; // Currency
  exchange_type: string; // Exchange
  tier: string; // Tier
  min_value: string; // Minimum value
  max_value: string; // Maximum value
  discount_rate: string; // Discount rate
}
