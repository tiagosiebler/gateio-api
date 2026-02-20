/**
 * Example: Get futures contract size (quanto_multiplier) and convert between
 * notional (e.g. USDT) and order size in contracts.
 *
 * Gate.io futures orders use `size` = number of CONTRACTS, not currency amount.
 * The contract details endpoint returns `quanto_multiplier`: the amount of
 * underlying (e.g. BTC) that 1 contract represents. So:
 *   notional_in_settle = size * quanto_multiplier * price
 *   size = notional_in_settle / (quanto_multiplier * price)
 *
 * This example:
 * 1) Fetches contract with getFuturesContract
 * 2) Reads quanto_multiplier and derives "contract size" in quote currency
 * 3) Converts a desired notional (e.g. 1000 USDT) to order size in contracts
 */

import { RestClient } from '../../../src/index.js';
// import { RestClient } from 'gateio-api';

const client = new RestClient({
  apiKey: process.env.API_KEY || 'your_api_key',
  apiSecret: process.env.API_SECRET || 'your_api_secret',
});

const SETTLE = 'usdt';
const CONTRACT = 'BTC_USDT';

async function getContractSizeExample() {
  // 1) Get single contract (public, no auth required)
  const contract = await client.getFuturesContract({
    settle: SETTLE,
    contract: CONTRACT,
  });

  const quantoMult = contract.quanto_multiplier;
  const markPrice = contract.mark_price;
  const orderSizeMin = Number(contract.order_size_min ?? 1);
  const orderSizeMax =
    contract.order_size_max != null ? Number(contract.order_size_max) : null;
  const enableDecimal = !!(contract as Record<string, unknown>).enable_decimal;

  if (!quantoMult || !markPrice) {
    throw new Error('Contract missing quanto_multiplier or mark_price');
  }

  const q = Number(quantoMult);
  const p = Number(markPrice);

  // 2) Contract size in quote (settle) currency: 1 contract = q * p
  const notionalPerContract = q * p;
  console.log('Contract:', CONTRACT);
  console.log('quanto_multiplier (underlying per 1 contract):', quantoMult);
  console.log('mark_price:', markPrice);
  console.log('Notional per 1 contract (quote):', notionalPerContract);
  console.log(
    'order_size_min:',
    orderSizeMin,
    'order_size_max:',
    orderSizeMax,
    'enable_decimal:',
    enableDecimal,
  );

  // 3) Convert desired notional (e.g. 1000 USDT) to size in contracts
  const desiredNotionalUsdt = 1000;
  let size = desiredNotionalUsdt / notionalPerContract;

  if (!enableDecimal) {
    size = Math.floor(size);
  }
  size = Math.max(orderSizeMin, size);
  if (orderSizeMax != null) {
    size = Math.min(orderSizeMax, size);
  }

  console.log('\nDesired notional (USDT):', desiredNotionalUsdt);
  console.log('Computed size (contracts):', size);
  console.log(
    'Actual notional (size * quanto_multiplier * mark_price):',
    size * q * p,
  );

  // Example: you would pass this size to submitFuturesOrder
  // await client.submitFuturesOrder({
  //   settle: SETTLE,
  //   contract: CONTRACT,
  //   size: size,  // in contracts; positive = long, negative = short
  //   price: markPrice,
  //   tif: 'gtc',
  // });
}

getContractSizeExample().catch(console.error);
