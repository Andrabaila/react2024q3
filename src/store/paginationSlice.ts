import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaginationState {
  currentPageNumber: number;
  totalPages: number;
}

const initialState: PaginationState = {
  currentPageNumber: 1,
  totalPages: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPageNumber(state, action: PayloadAction<number>) {
      state.currentPageNumber = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export const { setCurrentPageNumber, setTotalPages } = paginationSlice.actions;
export default paginationSlice.reducer;
