

export interface CoinProps {
  id: string;
  explorer: string;
  changePercent24Hr: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  error?: string;
  formattedMarket?: string;
  formattedPrice?: string;
  formattedVolume?: string;
}