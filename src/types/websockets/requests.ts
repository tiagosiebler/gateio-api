export type WsOperation = 'subscribe' | 'unsubscribe' | 'auth';

export interface WsRequestAuthGate {
  method: 'api_key';
  KEY: string;
  SIGN: string;
}

export interface WsRequestPing {
  time: number;
  channel: 'spot.ping' | 'futures.ping' | 'options.ping' | 'announcement.ping';
}

export interface WsRequestOperationGate<
  TWSTopic extends string,
  TWSPayload = any,
> {
  time: number;
  id?: number;
  channel: TWSTopic;
  auth?: WsRequestAuthGate;
  event?: WsOperation;
  payload?: TWSPayload;
}
