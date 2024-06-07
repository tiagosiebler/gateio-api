export type SpotWSAPITopic =
  | 'spot.login'
  | 'spot.order_place'
  | 'spot.order_cancel'
  | 'spot.order_cancel_ids'
  | 'spot.order_cancel_cp'
  | 'spot.order_amend'
  | 'spot.order_status';

export type WSAPITopic = SpotWSAPITopic;
