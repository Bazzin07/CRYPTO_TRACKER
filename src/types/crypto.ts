export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logoUrl: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  sparkline7d: string;
}

export interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
  sortBy: SortOption;
  sortDirection: 'asc' | 'desc';
}

export type SortOption = 
  | 'rank'
  | 'name'
  | 'symbol'  
  | 'price'
  | 'percentChange1h'
  | 'percentChange24h'
  | 'percentChange7d'
  | 'marketCap'
  | 'volume24h'
  | 'circulatingSupply';

export type FilterType = 
  | 'all'
  | 'top-gainers-1h'
  | 'top-losers-1h'
  | 'top-gainers-24h'
  | 'top-losers-24h'
  | 'top-gainers-7d'
  | 'top-losers-7d'
  | 'highest-market-cap'
  | 'highest-volume';
