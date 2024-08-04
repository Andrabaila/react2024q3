import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { People } from '@/api/types';

export interface SearchState {
  searchInputValue: string;
  searchQueryValue: string;
  searchResults: People;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: SearchState = {
  searchInputValue: '',
  searchQueryValue: '',
  searchResults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  status: 'idle',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchInputValue = action.payload;
    },
    setQueryValue(state, action: PayloadAction<string>) {
      state.searchQueryValue = action.payload;
    },
    initializeStateFromLocalStorage(state) {
      if (typeof window !== 'undefined') {
        state.searchInputValue = localStorage.getItem('searchInputValue') || '';
        state.searchQueryValue = localStorage.getItem('searchQueryValue') || '';
      }
    },
  },
});

export const { setSearchValue, setQueryValue, initializeStateFromLocalStorage } =
  searchSlice.actions;
export default searchSlice.reducer;
