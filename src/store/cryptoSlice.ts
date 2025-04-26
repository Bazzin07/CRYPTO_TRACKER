import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoAsset, CryptoState, SortOption } from '../types/crypto';

const initialState: CryptoState = {
  assets: [],
  loading: false,
  error: null,
  sortBy: 'rank',
  sortDirection: 'asc',
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setAllAssets: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload;
      console.log("Set all assets, new state assets length:", state.assets.length);
    },
    
    updateAsset: (state, action: PayloadAction<{ id: string, updates: Partial<CryptoAsset> }>) => {
      const { id, updates } = action.payload;
      const assetIndex = state.assets.findIndex(asset => asset.id === id);
      
      if (assetIndex !== -1) {
        
        state.assets[assetIndex] = { ...state.assets[assetIndex], ...updates };
      } else {
       
        state.assets.push(updates as CryptoAsset);
      }
    },
    
    
    setSortOption: (state, action: PayloadAction<SortOption>) => {
     
      if (state.sortBy === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
        
        state.sortDirection = action.payload === 'rank' ? 'asc' : 'desc';
      }
      
      // Sort the assets based on the current sort option and direction
      state.assets = [...state.assets].sort((a, b) => {
        const aValue = a[state.sortBy];
        const bValue = b[state.sortBy];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return state.sortDirection === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        if (state.sortDirection === 'asc') {
          return (aValue as number) - (bValue as number);
        }
        return (bValue as number) - (aValue as number);
      });
    },
  },
});

export const { updateAsset, setAllAssets, setSortOption } = cryptoSlice.actions;
export default cryptoSlice.reducer;
