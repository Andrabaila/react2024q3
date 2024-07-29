import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { People } from '../../../pages/main/api/types';

export interface SearchState {
  searchInputValue: string;
  searchQueryValue: string;
  searchResults: People;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: SearchState = {
  searchInputValue: localStorage.getItem('searchInputValue') || '',
  searchQueryValue: localStorage.getItem('searchQueryValue') || '',
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
      localStorage.setItem('searchInputValue', action.payload);
    },
    setQueryValue(state, action: PayloadAction<string>) {
      state.searchQueryValue = action.payload;
      localStorage.setItem('searchQueryValue', action.payload);
    },
  },
});

export const { setSearchValue, setQueryValue } = searchSlice.actions;
export default searchSlice.reducer;
