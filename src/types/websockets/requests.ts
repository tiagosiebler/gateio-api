import { CHANNEL_ID } from '../../lib/requestUtils';
import { WSAPITopic } from './shared';

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

export interface WSAPIRequest<TRequestParams = object | string> {
  time: number;
  id?: number;
  channel: WSAPITopic;
  event: 'api';
  payload: {
    req_id: string;
    req_param?: TRequestParams | string;
    req_header: {
      'X-Gate-Channel-Id': typeof CHANNEL_ID;
    };
    api_key?: string;
    signature?: string;
    timestamp?: string;
  };
}
