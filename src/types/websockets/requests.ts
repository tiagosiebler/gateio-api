export type WsOperation = 'subscribe' | 'unsubscribe' | 'auth';

export type WsRequestOperation<TWSTopic extends string> = {
  id: string;
  event: WsOperation;
  topic: TWSTopic;
};
