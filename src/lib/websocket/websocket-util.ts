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

export const WS_ERROR_ENUM = {
  INVALID_ACCESS_KEY: 'todo:',
};

export function neverGuard(x: never, msg: string): Error {
  return new Error(`Unhandled value exception "${x}", ${msg}`);
}
