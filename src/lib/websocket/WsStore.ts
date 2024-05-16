import WebSocket from 'isomorphic-ws';

import { DefaultLogger } from '../logger.js';
import { WsConnectionStateEnum, WsStoredState } from './WsStore.types.js';

/**
 * Simple comparison of two objects, only checks 1-level deep (nested objects won't match)
 */
function isDeepObjectMatch(object1: unknown, object2: unknown) {
  if (typeof object1 === 'string' && typeof object2 === 'string') {
    return object1 === object2;
  }

  if (typeof object1 !== 'object' || typeof object2 !== 'object') {
    return false;
  }

  for (const key in object1) {
    const value1 = (object1 as any)[key];
    const value2 = (object2 as any)[key];

    if (value1 !== value2) {
      return false;
    }
  }
  return true;
}

export class WsStore<
  WsKey extends string,
  TWSTopicSubscribeEventArgs extends string | object,
> {
  private wsState: Record<string, WsStoredState<TWSTopicSubscribeEventArgs>> =
    {};
  private logger: typeof DefaultLogger;

  constructor(logger: typeof DefaultLogger) {
    this.logger = logger || DefaultLogger;
  }

  /** Get WS stored state for key, optionally create if missing */
  get(
    key: WsKey,
    createIfMissing?: true,
  ): WsStoredState<TWSTopicSubscribeEventArgs>;
  get(
    key: WsKey,
    createIfMissing?: false,
  ): WsStoredState<TWSTopicSubscribeEventArgs> | undefined;
  get(
    key: WsKey,
    createIfMissing?: boolean,
  ): WsStoredState<TWSTopicSubscribeEventArgs> | undefined {
    if (this.wsState[key]) {
      return this.wsState[key];
    }

    if (createIfMissing) {
      return this.create(key);
    }
  }

  getKeys(): WsKey[] {
    return Object.keys(this.wsState) as WsKey[];
  }

  create(key: WsKey): WsStoredState<TWSTopicSubscribeEventArgs> | undefined {
    if (this.hasExistingActiveConnection(key)) {
      this.logger.info(
        'WsStore setConnection() overwriting existing open connection: ',
        this.getWs(key),
      );
    }
    this.wsState[key] = {
      subscribedTopics: new Set<TWSTopicSubscribeEventArgs>(),
      connectionState: WsConnectionStateEnum.INITIAL,
    };
    return this.get(key);
  }

  delete(key: WsKey): void {
    // TODO: should we allow this at all? Perhaps block this from happening...
    if (this.hasExistingActiveConnection(key)) {
      const ws = this.getWs(key);
      this.logger.info(
        'WsStore deleting state for connection still open: ',
        ws,
      );
      ws?.close();
    }
    delete this.wsState[key];
  }

  /* connection websocket */

  hasExistingActiveConnection(key: WsKey): boolean {
    return this.get(key) && this.isWsOpen(key);
  }

  getWs(key: WsKey): WebSocket | undefined {
    return this.get(key)?.ws;
  }

  setWs(key: WsKey, wsConnection: WebSocket): WebSocket {
    if (this.isWsOpen(key)) {
      this.logger.info(
        'WsStore setConnection() overwriting existing open connection: ',
        this.getWs(key),
      );
    }

    this.get(key, true).ws = wsConnection;
    return wsConnection;
  }

  /* connection state */

  isWsOpen(key: WsKey): boolean {
    const existingConnection = this.getWs(key);
    return (
      !!existingConnection &&
      existingConnection.readyState === existingConnection.OPEN
    );
  }

  getConnectionState(key: WsKey): WsConnectionStateEnum {
    return this.get(key, true).connectionState!;
  }

  setConnectionState(key: WsKey, state: WsConnectionStateEnum) {
    this.get(key, true).connectionState = state;
  }

  isConnectionState(key: WsKey, state: WsConnectionStateEnum): boolean {
    return this.getConnectionState(key) === state;
  }

  /* subscribed topics */

  getTopics(key: WsKey): Set<TWSTopicSubscribeEventArgs> {
    return this.get(key, true).subscribedTopics;
  }

  getTopicsByKey(): Record<string, Set<TWSTopicSubscribeEventArgs>> {
    const result: any = {};
    for (const refKey in this.wsState) {
      result[refKey] = this.getTopics(refKey as WsKey);
    }
    return result;
  }

  // Since topics are objects we can't rely on the set to detect duplicates
  getMatchingTopic(key: WsKey, topic: TWSTopicSubscribeEventArgs) {
    // if (typeof topic === 'string') {
    //   return this.getMatchingTopic(key, { channel: topic });
    // }

    const allTopics = this.getTopics(key).values();
    for (const storedTopic of allTopics) {
      if (isDeepObjectMatch(topic, storedTopic)) {
        return storedTopic;
      }
    }
  }

  addTopic(key: WsKey, topic: TWSTopicSubscribeEventArgs) {
    // if (typeof topic === 'string') {
    //   return this.addTopic(key, {
    //     instType: 'sp',
    //     channel: topic,
    //     instId: 'default',
    //   };
    // }
    // Check for duplicate topic. If already tracked, don't store this one
    const existingTopic = this.getMatchingTopic(key, topic);
    if (existingTopic) {
      return this.getTopics(key);
    }
    return this.getTopics(key).add(topic);
  }

  deleteTopic(key: WsKey, topic: TWSTopicSubscribeEventArgs) {
    // Check if we're subscribed to a topic like this
    const storedTopic = this.getMatchingTopic(key, topic);
    if (storedTopic) {
      this.getTopics(key).delete(storedTopic);
    }

    return this.getTopics(key);
  }
}
