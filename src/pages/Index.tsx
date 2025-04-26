import React, { useEffect } from 'react';
import CryptoTable from '../components/CryptoTable';
import { webSocketService } from '../services/WebSocketService';


const Index: React.FC = () => {
  useEffect(() => {
    console.log("Index component mounted - connecting to WebSocketService");
    const disconnect = webSocketService.connect();
    
    return () => {
      console.log("Index component unmounted - disconnecting from WebSocketService");
      disconnect();
    };
  }, []);
  
  return (
   
    <main className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Crypto Price Tracker</h1>
          <p className="text-gray-600 mt-2">Real-time cryptocurrency prices and market data</p>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <CryptoTable />
        </div>
      </div>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mt-2">© {new Date().getFullYear()} Crypto Price Tracker. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
