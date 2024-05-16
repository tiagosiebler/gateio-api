/** Should be one WS key per unique URL */
export const WS_KEY_MAP = {
  publicV1: 'publicV1',
  privateV1: 'privateV1',
} as const;

/** This is used to differentiate between each of the available websocket streams */
export type WsKey = (typeof WS_KEY_MAP)[keyof typeof WS_KEY_MAP];

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
  Record<'all', NetworkMap<'livenet' | 'staging'>>
> = {
  publicV1: {
    all: {
      livenet: 'wss://wss.woo.org/ws/stream/',
      staging: 'wss://wss.staging.woo.org/ws/stream',
    },
  },
  privateV1: {
    all: {
      livenet: 'wss://wss.woo.org/v2/ws/private/stream',
      staging: 'wss://wss.staging.woo.org/v2/ws/private/stream',
    },
  },
};

export const WS_ERROR_ENUM = {
  INVALID_ACCESS_KEY: 'todo:',
};

export function neverGuard(x: never, msg: string): Error {
  return new Error(`Unhandled value exception "${x}", ${msg}`);
}
