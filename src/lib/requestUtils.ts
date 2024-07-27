import WebSocket from 'isomorphic-ws';

import { GateBaseUrlKey } from '../types/shared.js';

export interface RestClientOptions {
  /** Your API key */
  apiKey?: string;

  /** Your API secret */
  apiSecret?: string;

  /**
   * Override the default/global max size of the request window (in ms) for signed api calls.
   * If you don't include a recv window when making an API call, this value will be used as default
   */
  recvWindow?: number;

  /** Default: false. If true, we'll throw errors if any params are undefined */
  strictParamValidation?: boolean;

  /**
   * Optionally override API protocol + domain
   * e.g baseUrl: 'https://api.gate.io'
   **/
  baseUrl?: string;

  // manually override with one of the known base URLs in the library
  baseUrlKey?: GateBaseUrlKey;

  /** Default: true. whether to try and post-process request exceptions (and throw them). */
  parseExceptions?: boolean;

  /**
   * Allows you to provide a custom "signMessage" function, e.g. to use node's much faster createHmac method
   *
   * Look in the examples folder for a demonstration on using node's createHmac instead.
   */
  customSignMessageFn?: (message: string, secret: string) => Promise<string>;
}

export function serializeParams<T extends Record<string, any> | undefined = {}>(
  params: T,
  strict_validation: boolean | undefined,
  encodeValues: boolean,
  prefixWith: string,
): string {
  if (!params) {
    return '';
  }

  const queryString = Object.keys(params)
    .sort()
    .map((key) => {
      const value = params[key];
      if (strict_validation === true && typeof value === 'undefined') {
        throw new Error(
          'Failed to sign API request due to undefined parameter',
        );
      }
      const encodedValue = encodeValues ? encodeURIComponent(value) : value;
      return `${key}=${encodedValue}`;
    })
    .join('&');

  // Only prefix if there's a value
  return queryString ? prefixWith + queryString : queryString;
}

const GATE_BASE_URLS: Record<GateBaseUrlKey, string> = {
  live: 'https://api.gateio.ws/api/v4',
  futuresLiveAlternative: 'https://fx-api.gateio.ws/api/v4',
  futuresTestnet: 'https://fx-api-testnet.gateio.ws/api/v4',
};

export function getRestBaseUrl(restClientOptions: RestClientOptions): string {
  if (restClientOptions.baseUrl) {
    return restClientOptions.baseUrl;
  }

  if (restClientOptions.baseUrlKey) {
    return GATE_BASE_URLS[restClientOptions.baseUrlKey];
  }

  return GATE_BASE_URLS.live;
}

export const CHANNEL_ID = 'gateapinode';

export interface MessageEventLike {
  target: WebSocket;
  type: 'message';
  data: string;
}

export function isMessageEvent(msg: unknown): msg is MessageEventLike {
  if (typeof msg !== 'object' || !msg) {
    return false;
  }

  const message = msg as MessageEventLike;
  return message['type'] === 'message' && typeof message['data'] === 'string';
}
