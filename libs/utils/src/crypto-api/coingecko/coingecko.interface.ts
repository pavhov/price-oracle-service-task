export interface Pair {
  from: string;
  to: string;
}
export interface CoinList {
  id: string;
  symbol: string;
  name: string;
  platform: {
    [key: string]: string;
  };
}
export type CoinsListRes = CoinList[];
export type vsCurrenciesRes = string[];
export interface SimplePrice {
  [key: string]: {
    [key: string]: number;
    last_updated_at: number;
  };
}
