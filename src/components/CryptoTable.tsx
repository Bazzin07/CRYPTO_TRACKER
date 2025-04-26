import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setSortOption } from '../store/cryptoSlice';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';
import { SortOption, FilterType } from '../types/crypto';
import { ArrowUpIcon, ArrowDownIcon, InformationCircleIcon, ArrowTrendingUpIcon as TrendingUpIcon, ArrowTrendingDownIcon as TrendingDownIcon } from '@heroicons/react/24/solid';

const CryptoTable: React.FC = () => {
  const { assets, sortBy, sortDirection } = useSelector((state: RootState) => state.crypto);
  const dispatch = useDispatch();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [highlightedRows, setHighlightedRows] = useState<Record<string, 'increase' | 'decrease' | null>>({});
  const [filterType, setFilterType] = useState<FilterType>('all');
  
  // Filtered assets
  const filteredAssets = React.useMemo(() => {
    switch (filterType) {
      case 'top-gainers-1h':
        return [...assets].sort((a, b) => b.percentChange1h - a.percentChange1h);
      case 'top-losers-1h':
        return [...assets].sort((a, b) => a.percentChange1h - b.percentChange1h);
      case 'top-gainers-24h':
        return [...assets].sort((a, b) => b.percentChange24h - a.percentChange24h);
      case 'top-losers-24h':
        return [...assets].sort((a, b) => a.percentChange24h - b.percentChange24h);
      case 'top-gainers-7d':
        return [...assets].sort((a, b) => b.percentChange7d - a.percentChange7d);
      case 'top-losers-7d':
        return [...assets].sort((a, b) => a.percentChange7d - b.percentChange7d);
      case 'highest-market-cap':
        return [...assets].sort((a, b) => b.marketCap - a.marketCap);
      case 'highest-volume':
        return [...assets].sort((a, b) => b.volume24h - a.volume24h);
      default:
        return assets;
    }
  }, [assets, filterType]);

  
  const previousPrices = React.useRef<Record<string, number>>({});

 
  useEffect(() => {
   
    const newHighlights: Record<string, 'increase' | 'decrease' | null> = {};
    
    assets.forEach(asset => {
      const previousPrice = previousPrices.current[asset.id];
      if (previousPrice !== undefined) {
        if (asset.price > previousPrice) {
          newHighlights[asset.id] = 'increase';
        } else if (asset.price < previousPrice) {
          newHighlights[asset.id] = 'decrease';
        }
      }
      previousPrices.current[asset.id] = asset.price;
    });
    
    setHighlightedRows(newHighlights);
    const timer = setTimeout(() => {
      setHighlightedRows({});
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [assets]);

  useEffect(() => {
    if (assets.length > 0) {
      setLastUpdate(new Date());
    }
  }, [assets]); 
  const handleSort = (column: SortOption) => {
    dispatch(setSortOption(column));
  };

  const getSortIndicator = (column: SortOption) => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? 
      <ArrowUpIcon className="inline w-4 h-4 ml-1" /> : 
      <ArrowDownIcon className="inline w-4 h-4 ml-1" />;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
  
    img.src = "https://assets.coingecko.com/coins/images/1/small/generic-crypto-icon.png";
    img.onerror = null; // Prevent infinite loops
  };

 
  const getPriceChangeStyle = (value: number) => {
    return value >= 0 
      ? 'bg-green-50 text-green-600 font-medium' 
      : 'bg-red-50 text-red-600 font-medium';
  };

  const getRowHighlightClass = (assetId: string) => {
    const highlight = highlightedRows[assetId];
    if (highlight === 'increase') return 'animate-highlight-green';
    if (highlight === 'decrease') return 'animate-highlight-red';
    return '';
  };

  return (
    <>
    
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Crypto Market Overview</h1>
            <p className="text-blue-100 mt-1">Live price updates from global exchanges</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
            <div className="text-white">
              <span className="text-xs block text-blue-200">Last updated</span>
              <span className="text-lg font-medium">{lastUpdate.toLocaleTimeString()}</span>
            </div>
            <div className="ml-3 bg-blue-500 rounded-full p-1.5 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
        
       
        {assets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-200 text-xs">Market Leader</p>
                  <p className="text-white font-medium">{assets[0]?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{formatCurrency(assets[0]?.price || 0)}</p>
                  <p className={`text-xs ${assets[0]?.percentChange24h >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {formatPercentage(assets[0]?.percentChange24h || 0)} (24h)
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-200 text-xs">Biggest Gainer (24h)</p>
                  {(() => {
                    const gainer = [...assets].sort((a, b) => b.percentChange24h - a.percentChange24h)[0];
                    return (
                      <>
                        <p className="text-white font-medium">{gainer?.name}</p>
                        <p className="text-green-300 flex items-center">
                          <TrendingUpIcon className="w-4 h-4 mr-1" />
                          {formatPercentage(gainer?.percentChange24h || 0)}
                        </p>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-200 text-xs">Biggest Loser (24h)</p>
                  {(() => {
                    const loser = [...assets].sort((a, b) => a.percentChange24h - b.percentChange24h)[0];
                    return (
                      <>
                        <p className="text-white font-medium">{loser?.name}</p>
                        <p className="text-red-300 flex items-center">
                          <TrendingDownIcon className="w-4 h-4 mr-1" />
                          {formatPercentage(loser?.percentChange24h || 0)}
                        </p>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterType === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Cryptocurrencies
          </button>
          <button
            onClick={() => setFilterType('top-gainers-24h')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterType === 'top-gainers-24h' 
                ? 'bg-green-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Top Gainers (24h)
          </button>
          <button
            onClick={() => setFilterType('top-losers-24h')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterType === 'top-losers-24h' 
                ? 'bg-red-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Top Losers (24h)
          </button>
          <button
            onClick={() => setFilterType('top-gainers-1h')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterType === 'top-gainers-1h' 
                ? 'bg-green-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Top Gainers (1h)
          </button>
          <button
            onClick={() => setFilterType('top-losers-1h')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterType === 'top-losers-1h' 
                ? 'bg-red-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Top Losers (1h)
          </button>
          <button
            onClick={() => setFilterType('top-gainers-7d')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterType === 'top-gainers-7d' 
                ? 'bg-green-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Top Gainers (7d)
          </button>
          <button
            onClick={() => setFilterType('top-losers-7d')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterType === 'top-losers-7d' 
                ? 'bg-red-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Top Losers (7d)
          </button>
          <button
            onClick={() => setFilterType('highest-market-cap')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterType === 'highest-market-cap' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Highest Market Cap
          </button>
          <button
            onClick={() => setFilterType('highest-volume')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterType === 'highest-volume' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Highest Volume
          </button>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            {filterType === 'all' ? 'Cryptocurrency Prices' : 
             filterType === 'top-gainers-1h' ? 'Top Gainers (1h)' : 
             filterType === 'top-losers-1h' ? 'Top Losers (1h)' :
             filterType === 'top-gainers-24h' ? 'Top Gainers (24h)' :
             filterType === 'top-losers-24h' ? 'Top Losers (24h)' :
             filterType === 'top-gainers-7d' ? 'Top Gainers (7d)' :
             filterType === 'top-losers-7d' ? 'Top Losers (7d)' :
             filterType === 'highest-market-cap' ? 'Highest Market Cap' :
             'Highest Volume'}
          </h2>
          <p className="text-sm text-gray-500">Real-time market data with 24-hour statistics</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  onClick={() => handleSort('rank')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center">
                    # {getSortIndicator('rank')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th 
                  onClick={() => handleSort('price')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center">
                    Price {getSortIndicator('price')}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('percentChange1h')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center">
                    1h % {getSortIndicator('percentChange1h')}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('percentChange24h')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center">
                    24h % {getSortIndicator('percentChange24h')}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('percentChange7d')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center">
                    7d % {getSortIndicator('percentChange7d')}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('marketCap')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center">
                    Market Cap {getSortIndicator('marketCap')}
                    <InformationCircleIcon className="w-4 h-4 ml-1 text-gray-400" title="Total market value of a cryptocurrency's circulating supply" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('volume24h')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center">
                    Volume(24h) {getSortIndicator('volume24h')}
                    <InformationCircleIcon className="w-4 h-4 ml-1 text-gray-400" title="A measure of how much of a cryptocurrency was traded in the last 24 hours" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Supply
                    <InformationCircleIcon className="w-4 h-4 ml-1 text-gray-400" title="The amount of coins that are circulating in the market and are in public hands" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last 7 Days
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
                      <p className="text-sm text-gray-500">Loading cryptocurrency data...</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className={`hover:bg-gray-50 ${getRowHighlightClass(asset.id)}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                      {asset.rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 p-1 border border-gray-100">
                          <img 
                            className="h-8 w-8 rounded-full" 
                            src={asset.logoUrl} 
                            alt={asset.name} 
                            onError={handleImageError}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                          <div className="text-xs text-gray-500">{asset.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatCurrency(asset.price)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm rounded-md ${getPriceChangeStyle(asset.percentChange1h)}`}>
                      <div className="flex items-center">
                        {asset.percentChange1h >= 0 ? 
                          <TrendingUpIcon className="w-4 h-4 mr-1" /> : 
                          <TrendingDownIcon className="w-4 h-4 mr-1" />}
                        {formatPercentage(asset.percentChange1h)}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm rounded-md ${getPriceChangeStyle(asset.percentChange24h)}`}>
                      <div className="flex items-center">
                        {asset.percentChange24h >= 0 ? 
                          <TrendingUpIcon className="w-4 h-4 mr-1" /> : 
                          <TrendingDownIcon className="w-4 h-4 mr-1" />}
                        {formatPercentage(asset.percentChange24h)}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm rounded-md ${getPriceChangeStyle(asset.percentChange7d)}`}>
                      <div className="flex items-center">
                        {asset.percentChange7d >= 0 ? 
                          <TrendingUpIcon className="w-4 h-4 mr-1" /> : 
                          <TrendingDownIcon className="w-4 h-4 mr-1" />}
                        {formatPercentage(asset.percentChange7d)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="font-medium">{formatCurrency(asset.marketCap)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="font-medium">{formatCurrency(asset.volume24h)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span className="font-medium">{formatNumber(asset.maxSupply || 0)}</span>
                        <span className="text-xs">{asset.symbol}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.sparkline7d ? (
                        <img 
                          src={asset.sparkline7d} 
                          alt={`${asset.name} 7d chart`} 
                          height="40"
                          className="h-10 w-24"
                        />
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {assets.length > 0 && (
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>Displaying {filteredAssets.length} of {assets.length} cryptocurrencies</div>
          <div className="mt-2 md:mt-0">
            Data updates automatically every 2 seconds. Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      )}
    </>
  );
};

export default CryptoTable;
