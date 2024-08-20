export interface SubAccount {
  remark?: string;
  login_name: string;
  password?: string;
  email?: string;
  state: number;
  type: number;
  user_id: number;
  create_time: number;
}

export interface CreatedSubAccountAPIKey {
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

export interface SubAccountAPIKey {
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

export interface SubAccountMode {
  user_id: number;
  is_unified: boolean;
  mode: 'classic' | 'multi_currency' | 'portfolio';
}
