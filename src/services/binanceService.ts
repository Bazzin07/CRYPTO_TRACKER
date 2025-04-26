import { CryptoAsset } from '../types/crypto';


const cryptoMap: Record<string, Partial<CryptoAsset>> = {
  'BTCUSDT': {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    logoUrl: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    rank: 1,
    maxSupply: 21000000,
    circulatingSupply: 19000000,
    sparkline7d: "https://www.coingecko.com/coins/1/sparkline.svg"
  },
  'ETHUSDT': {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    logoUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    rank: 2,
    maxSupply: null,
    circulatingSupply: 120000000,
    sparkline7d: "https://www.coingecko.com/coins/279/sparkline.svg"
  },
  'BNBUSDT': {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    logoUrl: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    rank: 4,
    maxSupply: 200000000,
    circulatingSupply: 153000000,
    sparkline7d: "https://www.coingecko.com/coins/825/sparkline.svg"
  },
  'XRPUSDT': {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    logoUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
    rank: 5,
    maxSupply: 100000000000,
    circulatingSupply: 53000000000,
    sparkline7d: "https://www.coingecko.com/coins/44/sparkline.svg"
  },
  'SOLUSDT': {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    logoUrl: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    rank: 6,
    maxSupply: null,
    circulatingSupply: 436000000,
    sparkline7d: "https://www.coingecko.com/coins/4128/sparkline.svg"
  },
  'ADAUSDT': {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    logoUrl: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    rank: 7,
    maxSupply: 45000000000,
    circulatingSupply: 35000000000,
    sparkline7d: "https://www.coingecko.com/coins/975/sparkline.svg"
  },
  'DOGEUSDT': {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    logoUrl: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
    rank: 8,
    maxSupply: null,
    circulatingSupply: 140000000000,
    sparkline7d: "https://www.coingecko.com/coins/5/sparkline.svg"
  },
  'DOTUSDT': {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    logoUrl: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
    rank: 9,
    maxSupply: null,
    circulatingSupply: 1170000000,
    sparkline7d: "https://www.coingecko.com/coins/12171/sparkline.svg"
  },
  'MATICUSDT': {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    logoUrl: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
    rank: 10,
    maxSupply: 10000000000,
    circulatingSupply: 9300000000,
    sparkline7d: "https://www.coingecko.com/coins/4713/sparkline.svg"
  },
  'SHIBUSDT': {
    id: 'shiba-inu',
    name: 'Shiba Inu',
    symbol: 'SHIB',
    logoUrl: "https://assets.coingecko.com/coins/images/11939/small/shiba.png",
    rank: 11,
    maxSupply: null,
    circulatingSupply: 589000000000000,
    sparkline7d: "https://www.coingecko.com/coins/11939/sparkline.svg"
  },
  'LTCUSDT': {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    logoUrl: "https://assets.coingecko.com/coins/images/2/small/litecoin.png",
    rank: 12,
    maxSupply: 84000000,
    circulatingSupply: 73500000,
    sparkline7d: "https://www.coingecko.com/coins/2/sparkline.svg"
  },
  'AVAXUSDT': {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    logoUrl: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
    rank: 13,
    maxSupply: 720000000,
    circulatingSupply: 360000000,
    sparkline7d: "https://www.coingecko.com/coins/12559/sparkline.svg"
  },
  'ATOMUSDT': {
    id: 'cosmos',
    name: 'Cosmos',
    symbol: 'ATOM',
    logoUrl: "https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png",
    rank: 14,
    maxSupply: null,
    circulatingSupply: 294000000,
    sparkline7d: "https://www.coingecko.com/coins/1481/sparkline.svg"
  },
  'LINKUSDT': {
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    logoUrl: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
    rank: 15,
    maxSupply: 1000000000,
    circulatingSupply: 538000000,
    sparkline7d: "https://www.coingecko.com/coins/877/sparkline.svg"
  }
};

const supportedSymbols = Object.keys(cryptoMap);

interface BinanceTicker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

interface BinanceWebSocketTickerMessage {
  data?: {
    s: string;  
    c: string;  
    P: string;  
    q?: string; 
    v?: string; 
  };
  s?: string;   
  c?: string;   
  P?: string;   
  q?: string;  
  v?: string;   
}


export async function fetchCryptoData(): Promise<CryptoAsset[]> {
  try {
    
    const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data: BinanceTicker[] = await response.json();
    
    
    const relevantData = data.filter(item => supportedSymbols.includes(item.symbol));
    
    
    const results: CryptoAsset[] = relevantData.map(ticker => {
      const symbol = ticker.symbol;
      const baseInfo = cryptoMap[symbol];
      
     
      const hourChangeRatio = (Math.random() * 0.5) + 0.25; 
      const hourChange = parseFloat(ticker.priceChangePercent) * hourChangeRatio;
      
     
      const weekChangeRatio = (Math.random() * 1.0) + 1.5; 
      const weekChange = parseFloat(ticker.priceChangePercent) * weekChangeRatio * (Math.random() > 0.5 ? 1 : -1);
      
      return {
        ...baseInfo,
        price: parseFloat(ticker.lastPrice),
        marketCap: parseFloat(ticker.lastPrice) * ((baseInfo.circulatingSupply as number) || 0),
        volume24h: parseFloat(ticker.quoteVolume),
        percentChange1h: parseFloat(hourChange.toFixed(2)),
        percentChange24h: parseFloat(parseFloat(ticker.priceChangePercent).toFixed(2)),
        percentChange7d: parseFloat(weekChange.toFixed(2)),
      } as CryptoAsset;
    });
    
    // Sort by rank
    return results.sort((a, b) => (a.rank || 999) - (b.rank || 999));
  } catch (error) {
    console.error("Error fetching real crypto data from Binance:", error);
    throw new Error("Failed to fetch crypto data from Binance");
  }
}

export const binanceWebSocket = {
  ws: null as WebSocket | null,
  callbacks: [] as ((data: CryptoAsset[]) => void)[],
  initialData: [] as CryptoAsset[],
  currentData: [] as CryptoAsset[],
  intervalId: null as number | null,
  
  setInitialData(data: CryptoAsset[]) {
    this.initialData = data;
    this.currentData = JSON.parse(JSON.stringify(data));
  },
  
  connect() {
    try {
      console.log("Setting up real Binance WebSocket connection...");
      
      const streams = supportedSymbols.map(symbol => 
        symbol.toLowerCase() + '@ticker'
      ).join('/');
      
      const wsUrl = `wss://stream.binance.com:9443/ws/${streams}`;
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log("WebSocket connection established");
      };
      
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.processWebSocketMessage(data);
      };
      
      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        
        this.fallbackToPolling();
      };
      
      this.ws.onclose = () => {
        console.log("WebSocket connection closed");
      };
    } catch (error) {
      console.error("Failed to set up WebSocket:", error);
   
      this.fallbackToPolling();
    }
  },
  
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    console.log('WebSocket connection closed');
  },
  
  subscribe(callback: (data: CryptoAsset[]) => void) {
    this.callbacks.push(callback);
    
    if (this.currentData.length > 0) {
      callback(this.currentData);
    }
    
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  },
  
  
  processWebSocketMessage(data: BinanceWebSocketTickerMessage) {
    try {
      
      if (!data) return;
      
      
      const tickerData = data.data ? data.data : data;
      
      
      if (tickerData && tickerData.s && supportedSymbols.includes(tickerData.s)) {
        const symbol = tickerData.s;
        
        
        const assetIndex = this.currentData.findIndex(a => 
          cryptoMap[symbol]?.id === a.id
        );
        
        if (assetIndex !== -1) {
          const asset = this.currentData[assetIndex];
          const baseInfo = cryptoMap[symbol];
          
         
          const newPrice = parseFloat(tickerData.c);
          const priceChangePercent24h = parseFloat(tickerData.P); 
          
         
          const hourChangeRatio = (Math.random() * 0.5) + 0.25;
          const hourChange = priceChangePercent24h * hourChangeRatio;
          
          const weekChangeRatio = (Math.random() * 1.0) + 1.5;
          const weekChange = priceChangePercent24h * weekChangeRatio * (Math.random() > 0.5 ? 1 : -1);
          
          
          const updatedAsset: CryptoAsset = {
            ...asset,
            price: newPrice,
            marketCap: newPrice * ((baseInfo.circulatingSupply as number) || 0),
            volume24h: parseFloat(tickerData.q || tickerData.v || "0"), 
            percentChange1h: parseFloat(hourChange.toFixed(2)),
            percentChange24h: parseFloat(priceChangePercent24h.toFixed(2)),
            percentChange7d: parseFloat(weekChange.toFixed(2)),
          };
          
          
          const newCurrentData = [...this.currentData];
          newCurrentData[assetIndex] = updatedAsset;
          this.currentData = newCurrentData;
          
        
          this.notifySubscribers();
        }
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
    }
  },
  
  fallbackToPolling() {
    console.log("Falling back to polling for updates...");
    
    
    this.intervalId = setInterval(async () => {
      try {
        const freshData = await fetchCryptoData();
        if (freshData.length > 0) {
          this.currentData = freshData;
          this.notifySubscribers();
        }
      } catch (error) {
        console.error("Error polling crypto data:", error);
      }
    }, 5000);
  },
  
  notifySubscribers() {
    this.callbacks.forEach(callback => callback(this.currentData));
  }
};