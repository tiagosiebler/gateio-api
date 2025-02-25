export type GateBaseUrlKey =
  | 'live'
  | 'futuresLiveAlternative'
  | 'futuresTestnet';

// interfaces

// Used for spot and flash swap
export interface CurrencyPair {
  id?: string;
  base?: string;
  base_name?: string;
  quote?: string;
  quote_name?: string;
  fee?: string;
  min_base_amount?: string;
  min_quote_amount?: string;
  max_base_amount?: string;
  max_quote_amount?: string;
  amount_precision?: number;
  precision?: number;
  trade_status?: 'untradable' | 'buyable' | 'sellable' | 'tradable';
  sell_start?: number;
  buy_start?: number;
  type: string;
}
