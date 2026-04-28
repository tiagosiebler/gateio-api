export interface WithdrawalRecord {
  id: string;
  txid: string;
  block_number: string;
  withdraw_order_id: string;
  /** When `status` is DONE, withdrawal success time (not conditioned on `block_number`). */
  timestamp: string;
  amount: string;
  currency: string;
  address: string;
  memo?: string;
  status:
    | 'BCODE' // Deposit Code Operation
    | 'CANCEL' // Cancelled
    | 'CANCELPEND' // Withdrawal Cancellation Pending
    | 'DMOVE' // Pending Manual Review
    | 'DONE' // Completed
    | 'EXTPEND' // Sent and Waiting for Confirmation
    | 'FAIL' // On-Chain Failure Pending Confirmation
    | 'FVERIFY' // Facial Verification in Progress
    | 'INVALID' // Invalid Transaction
    | 'LOCKED' // Wallet-Side Order Locked
    | 'MANUAL' // Pending Manual Review
    | 'PEND' // Processing
    | 'PROCES' // Processing
    | 'REJECT' // Rejected
    | 'REQUEST' // Request in Progress
    | 'REVIEW' // Under Review
    | 'SPLITPEND' // Split Pending
    | 'VERIFY'; // Verification in Progress
  chain: string;
}
