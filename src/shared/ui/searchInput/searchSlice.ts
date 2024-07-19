import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { People } from '../../../pages/main/api/types';

export interface SearchState {
  searchValue: string;
  searchResults: People;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: SearchState = {
  searchValue: '',
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
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
