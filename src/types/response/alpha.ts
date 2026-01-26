/**==========================================================================================================================
 * ALPHA
 * ==========================================================================================================================
 */

export interface AlphaAccount {
  currency: string; // Currency name
  available: string; // Available Balance
  locked: string; // Locked balance
  token_address: string; // Token address
  chain: string; // Blockchain name
}

export interface AlphaAccountBook {
  id: number; // Order ID
  time: number; // Operation timestamp
  currency: string; // Currency name
  change: string; // Change amount
  balance: string; // Balance after change
}

export interface CreateAlphaQuoteResp {
  quote_id: string; // Quote ID for order placement, valid for 1 minute
  min_amount: string; // Minimum order size
  max_amount: string; // Maximum order size
  price: string; // Token Price (USDT-based)
  slippage: string; // Slippage
  estimate_gas_fee_amount_usdt: string; // Estimated Gas Fee (USDT-based)
  order_fee: string; // Slippage tolerance (10 means 10% tolerance)
  target_token_min_amount: string; // Minimum received amount
  target_token_max_amount: string; // Maximum received amount
  error_type: number; // Failure Type (0: Success, 1: Exceeds maximum value, 2: Below minimum value)
}

export interface CreateAlphaOrderResp {
  order_id: string; // Order ID
  status: number; // Order Status (0: All, 1: Processing, 2: Successful, 3: Failed, 4: Cancelled, 5: Buy order placed but transfer not completed, 6: Order cancelled but transfer not completed)
  side: string; // Buy or sell orders (buy/sell)
  gas_mode: string; // Trading mode (speed: Smart mode, custom: Custom mode)
  create_time: number; // Creation timestamp
  amount: string; // Trade Quantity
  token_address: string; // Token contract address
  chain: string; // Blockchain name
}

export interface AlphaOrder {
  order_id: string; // Order ID
  tx_hash: string; // Transaction Hash
  side: string; // Buy or sell orders (buy/sell)
  usdt_amount: string; // Amount (USDT)
  currency: string; // Token
  currency_amount: string; // Token amount
  status: number; // Order Status (0: All, 1: Processing, 2: Successful, 3: Failed, 4: Cancelled, 5: Buy order placed but transfer not completed, 6: Order cancelled but transfer not completed)
  gas_mode: string; // Trading mode (speed: Smart mode, custom: Custom mode)
  chain: string; // Blockchain
  gas_fee: string; // Gas Fee (USDT-based)
  transaction_fee: string; // Trading Fee (USDT-based)
  failed_reason: string; // Failure reason (if applicable)
  create_time: number; // Creation timestamp
}

export interface AlphaCurrency {
  currency: string; // Currency symbol
  name: string; // Currency name
  chain: string; // The main chain corresponding to the coin
  address: string; // Contract Address
  amount_precision: number; // Amount scale
  precision: number; // Price scale
  status: number; // Currency Trading Status (1: Normal trading, 2: Suspended trading, 3: Delisted)
}

export interface AlphaTicker {
  currency: string; // Currency symbol
  last: string; // Last trading price
  change: string; // 24h price change percentage (negative for decrease, e.g., -7.45)
  volume: string; // 24h Trading Volume (USDT)
  market_cap: string; // Current Token Market Cap
}
