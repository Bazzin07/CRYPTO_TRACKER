// Fix the import path - remove .ts extension
import { store } from '../store/store';  // Removed .ts extension
import { updateAsset, setAllAssets } from '../store/cryptoSlice';
import { fetchCryptoData } from './binanceService';
import { binanceWebSocket } from './binanceService';

class WebSocketService {
  private intervalId: number | null = null;
  
  connect() {
  
    this.fetchInitialData();
    
   
    const unsubscribe = binanceWebSocket.subscribe((updatedData) => {
      if (updatedData.length > 0) {
        console.log("Received real-time update from WebSocket");
       
        store.dispatch(setAllAssets(updatedData));
      }
    });
    
   
    return () => {
      this.disconnect();
      unsubscribe();
    };
  }
  
  private async fetchInitialData() {
    try {
      console.log("Fetching initial crypto data...");
      const data = await fetchCryptoData();
      console.log("Fetched data:", data);
      
      if (data && data.length > 0) {
        console.log("Setting initial data in WebSocket service");
        binanceWebSocket.setInitialData(data);
        
        console.log("Updating Redux store with initial data");
        
        store.dispatch(setAllAssets(data));
        
        console.log("Connecting to WebSocket for updates");
        binanceWebSocket.connect();
      } else {
        console.error("No data returned from fetchCryptoData");
        this.generateFallbackData();
      }
    } catch (error) {
      console.error("Error fetching initial crypto data:", error);
      this.generateFallbackData();
    }
  }
  
  private generateFallbackData() {
    const fallbackData = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
       
        logoUrl: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
        rank: 1,
        price: 31452.18,
        marketCap: 660495603122,
        volume24h: 19876543210,
        percentChange1h: 0.25,
        percentChange24h: -1.37,
        percentChange7d: 2.43,
        maxSupply: 21000000,
        circulatingSupply: 19000000,
        sparkline7d: "https://www.coingecko.com/coins/1/sparkline.svg"
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        logoUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
        rank: 2,
        price: 2189.35,
        marketCap: 263110927834,
        volume24h: 8765432109,
        percentChange1h: 0.12,
        percentChange24h: -0.98,
        percentChange7d: 1.56,
        maxSupply: null,
        circulatingSupply: 120000000,
        sparkline7d: "https://www.coingecko.com/coins/279/sparkline.svg"
      }
    ];
    
    console.log("Using fallback data:", fallbackData);
    
    
    binanceWebSocket.setInitialData(fallbackData);
      
    
    store.dispatch(setAllAssets(fallbackData));
    
   
    binanceWebSocket.connect();
  }
  
  disconnect() {
    binanceWebSocket.disconnect();
  }
}

export const webSocketService = new WebSocketService();
