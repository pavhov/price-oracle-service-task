export interface Pair {
  from: string;
  to: string;
}
export interface SymbolPrice {
  [key: string]: {
    [key: string]: number;
  };
}
export interface CCCAGGConstituentPairs {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  RateLimit: any;
  Data: {
    pairs: {
      [key: string]: {
        tsyms: {
          [key: string]: {
            histo_minute_start_ts: number;
            histo_minute_start: string;
            histo_minute_end_ts: number;
            histo_minute_end: string;
          };
        };
      };
    };
  };
}
