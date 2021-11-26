export interface MarketRange {
  prices: Array<number[]>;
  market_caps: Array<number[]>;
  total_volumes: Array<number[]>;
}

export type BTCDailyValues = { price: number; volume: number; ts: string }[];
