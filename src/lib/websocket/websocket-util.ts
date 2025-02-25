import WebSocket from 'ws';

import { WSAPIRequest } from '../../types/websockets/requests.js';
import {
  FuturesWSAPITopic,
  SpotWSAPITopic,
} from '../../types/websockets/wsAPI.js';

/**
 * Should be one WS key per unique URL. Some URLs may need a suffix.
 */
export const WS_KEY_MAP = {
  /**
   * Spot & Margin
   * https://www.gate.io/docs/developers/apiv4/ws/en/
   */
  spotV4: 'spotV4',
  /**
   * Perpetual futures (USDT)
   * https://www.gate.io/docs/developers/futures/ws/en/#gate-io-futures-websocket-v4
   */
  perpFuturesUSDTV4: 'perpFuturesUSDTV4',
  /**
   * Perpetual futures (BTC)
   * https://www.gate.io/docs/developers/futures/ws/en/#gate-io-futures-websocket-v4
   */
  perpFuturesBTCV4: 'perpFuturesBTCV4',
  /**
   * Delivery Futures (USDT)
   * https://www.gate.io/docs/developers/delivery/ws/en/
   */
  deliveryFuturesUSDTV4: 'deliveryFuturesUSDTV4',
  /**
   * Delivery Futures (BTC)
   * https://www.gate.io/docs/developers/delivery/ws/en/
   */
  deliveryFuturesBTCV4: 'deliveryFuturesBTCV4',
  /**
   * Options
   * https://www.gate.io/docs/developers/options/ws/en/
   */
  optionsV4: 'optionsV4',
  /**
   * Announcements V4
   * https://www.gate.io/docs/developers/options/ws/en/
   */
  announcementsV4: 'announcementsV4',
} as const;

/** This is used to differentiate between each of the available websocket streams */
export type WsKey = (typeof WS_KEY_MAP)[keyof typeof WS_KEY_MAP];

export type FuturesWsKey =
  | typeof WS_KEY_MAP.perpFuturesUSDTV4
  | typeof WS_KEY_MAP.perpFuturesBTCV4
  | typeof WS_KEY_MAP.deliveryFuturesUSDTV4
  | typeof WS_KEY_MAP.deliveryFuturesBTCV4;

export type WsMarket = 'all';

/**
 * Normalised internal format for a request (subscribe/unsubscribe/etc) on a topic, with optional parameters.
 *
 * - Topic: the topic this event is for
 * - Payload: the parameters to include, optional. E.g. auth requires key + sign. Some topics allow configurable parameters.
 */
export interface WsTopicRequest<
  TWSTopic extends string = string,
  TWSPayload = any,
> {
  topic: TWSTopic;
  payload?: TWSPayload;
}

/**
 * Conveniently allow users to request a topic either as string topics or objects (containing string topic + params)
 */
export type WsTopicRequestOrStringTopic<
  TWSTopic extends string,
  TWSPayload = any,
> = WsTopicRequest<TWSTopic, TWSPayload> | string;

/**
 * Some exchanges have two livenet environments, some have test environments, some dont. This allows easy flexibility for different exchanges.
 * Examples:
 *  - One livenet and one testnet: NetworkMap<'livenet' | 'testnet'>
 *  - One livenet, sometimes two, one testnet: NetworkMap<'livenet' | 'testnet', 'livenet2'>
 *  - Only one livenet, no other networks: NetworkMap<'livenet'>
 */
type NetworkMap<
  TRequiredKeys extends string,
  TOptionalKeys extends string | undefined = undefined,
> = Record<TRequiredKeys, string> &
  (TOptionalKeys extends string
    ? Record<TOptionalKeys, string | undefined>
    : Record<TRequiredKeys, string>);

export const WS_BASE_URL_MAP: Record<
  WsKey,
  NetworkMap<'livenet' | 'testnet'>
> = {
  spotV4: {
    livenet: 'wss://api.gateio.ws/ws/v4/',
    testnet: 'NoTestnetForSpotWebsockets!',
  },
  perpFuturesUSDTV4: {
    livenet: 'wss://fx-ws.gateio.ws/v4/ws/usdt',
    testnet: 'wss://fx-ws-testnet.gateio.ws/v4/ws/usdt',
  },
  perpFuturesBTCV4: {
    livenet: 'wss://fx-ws.gateio.ws/v4/ws/btc',
    testnet: 'wss://fx-ws-testnet.gateio.ws/v4/ws/btc',
  },
  deliveryFuturesUSDTV4: {
    livenet: 'wss://fx-ws.gateio.ws/v4/ws/delivery/usdt',
    testnet: 'wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/usdt',
  },
  deliveryFuturesBTCV4: {
    livenet: 'wss://fx-ws.gateio.ws/v4/ws/delivery/btc',
    testnet: 'wss://fx-ws-testnet.gateio.ws/v4/ws/delivery/btc',
  },
  optionsV4: {
    livenet: 'wss://op-ws.gateio.live/v4/ws',
    testnet: 'wss://op-ws-testnet.gateio.live/v4/ws',
  },
  announcementsV4: {
    livenet: 'wss://api.gateio.ws/ws/v4/ann',
    testnet: 'NoTestnetForAnnouncementsWebSockets!',
  },
};

export function neverGuard(x: never, msg: string): Error {
  return new Error(`Unhandled value exception "${x}", ${msg}`);
}

/**
 * WS API promises are stored using a primary key. This key is constructed using
 * properties found in every request & reply.
 */
export function getPromiseRefForWSAPIRequest(
  requestEvent: WSAPIRequest,
): string {
  const promiseRef = [requestEvent.channel, requestEvent.payload?.req_id].join(
    '_',
  );
  return promiseRef;
}

export function getPrivateSpotTopics(): string[] {
  // Consumeable channels for spot
  const privateSpotTopics = [
    'spot.orders',
    'spot.usertrades',
    'spot.balances',
    'spot.margin_balances',
    'spot.funding_balances',
    'spot.cross_balances',
    'spot.priceorders',
  ];

  // WebSocket API for spot
  const privateSpotWSAPITopics: SpotWSAPITopic[] = [
    'spot.login',
    'spot.order_place',
    'spot.order_cancel',
    'spot.order_cancel_ids',
    'spot.order_cancel_cp',
    'spot.order_amend',
    'spot.order_status',
  ];

  return [...privateSpotTopics, ...privateSpotWSAPITopics];
}

export function getPrivateFuturesTopics(): string[] {
  // These are the same for perps vs delivery futures
  const privatePerpetualFuturesTopics = [
    'futures.orders',
    'futures.usertrades',
    'futures.liquidates',
    'futures.auto_deleverages',
    'futures.position_closes',
    'futures.balances',
    'futures.reduce_risk_limits',
    'futures.positions',
    'futures.autoorders',
  ];

  const privatePerpetualFuturesWSAPITopics: FuturesWSAPITopic[] = [
    'futures.login',
    'futures.order_place',
    'futures.order_batch_place',
    'futures.order_cancel',
    'futures.order_cancel_cp',
    'futures.order_amend',
    'futures.order_list',
    'futures.order_status',
  ];

  return [
    ...privatePerpetualFuturesTopics,
    ...privatePerpetualFuturesWSAPITopics,
  ];
}

export function getPrivateOptionsTopics(): string[] {
  const privateOptionsTopics = [
    'options.orders',
    'options.usertrades',
    'options.liquidates',
    'options.user_settlements',
    'options.position_closes',
    'options.balances',
    'options.positions',
  ];

  return [...privateOptionsTopics];
}

/**
 * ws.terminate() is undefined in browsers.
 * This only works in node.js, not in browsers.
 * Does nothing if `ws` is undefined. Does nothing in browsers.
 */
export function safeTerminateWs(
  ws?: WebSocket | any,
  fallbackToClose?: boolean,
): boolean {
  if (!ws) {
    return false;
  }
  if (typeof ws['terminate'] === 'function') {
    ws.terminate();
    return true;
  } else if (fallbackToClose) {
    ws.close();
  }

  return false;
}
