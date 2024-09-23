export interface WithdrawalRecord {
  id: string;
  txid: string;
  block_number: string;
  withdraw_order_id: string;
  timestamp: string;
  amount: string;
  currency: string;
  address: string;
  memo?: string;
  status:
    | 'DONE'
    | 'CANCEL'
    | 'REQUEST'
    | 'MANUAL'
    | 'BCODE'
    | 'EXTPEND'
    | 'FAIL'
    | 'INVALID'
    | 'VERIFY'
    | 'PROCES'
    | 'PEND'
    | 'DMOVE'
    | 'SPLITPEND';
  chain: string;
}
