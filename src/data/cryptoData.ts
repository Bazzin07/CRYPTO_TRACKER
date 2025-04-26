import { useEffect, useState } from 'react';
import { CryptoAsset } from '../types/crypto';
import { fetchCryptoData, binanceWebSocket } from '../services/binanceService';

// Initial empty array before data is loaded
export const initialCryptoData: CryptoAsset[] = [];

export const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoAsset[]>(initialCryptoData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCryptoData();
        setCryptoData(data);
        binanceWebSocket.setInitialData(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load crypto data:", err);
        setError("Failed to load crypto data. Please try again later.");
        setIsLoading(false);
      }
    };

    loadInitialData();

    // Subscribe to WebSocket updates
    const unsubscribe = binanceWebSocket.subscribe((updatedData) => {
      if (updatedData.length > 0) {
        setCryptoData(updatedData);
      }
    });

    // Clean up subscription and WebSocket connection
    return () => {
      unsubscribe();
    };
  }, []);

  return { cryptoData, isLoading, error };
};