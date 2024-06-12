export interface CreateSubAccountReq {
  login_name: string;
  remark?: string;
  password?: string;
  email?: string;
}

export interface CreateSubAccountApiKeyReq {
  user_id: number;
  mode?: number; // Mode: 1 - classic, 2 - portfolio account
  name?: string; // API key name
  perms?: {
    name?:
      | 'wallet'
      | 'spot'
      | 'futures'
      | 'delivery'
      | 'earn'
      | 'options'
      | 'account'
      | 'unified'
      | 'loan'; // Permission name
    read_only?: boolean; // Read only
  }[];
  ip_whitelist?: string[]; // IP white list
}

export type UpdateSubAccountApiKeyReq = {
  key: string;
} & CreateSubAccountApiKeyReq;
