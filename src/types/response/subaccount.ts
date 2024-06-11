export interface SubAccountResp {
  remark?: string;
  login_name: string;
  password?: string;
  email?: string;
  state: number;
  type: number;
  user_id: number;
  create_time: number;
}

export interface CreateSubAccountApiKeyResp {
  user_id: string;
  mode?: number;
  name?: string;
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
      | 'loan';
    read_only?: boolean;
  }[];
  ip_whitelist?: string[];
  key: string;
  state: number;
  created_at: number;
  updated_at: number;
  last_access: number;
}

export interface SubAccountKey {
  user_id?: string;
  mode?: number;
  name?: string;
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
      | 'loan';
    read_only?: boolean;
  }[];
  ip_whitelist?: string[];
  key?: string;
  state?: number;
  created_at?: number;
  updated_at?: number;
  last_access?: number;
}
