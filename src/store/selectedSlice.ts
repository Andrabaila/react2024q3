import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '@/api/types';

export interface SelectedState {
  quantity: number;
  selectedArr: Person[];
}
const initialState: SelectedState = {
  quantity: 0,
  selectedArr: [],
};
const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setQuantity(state, action: PayloadAction<number>) {
      state.quantity = action.payload;
    },
    setSelectedArr(state, action: PayloadAction<Person[]>) {
      state.selectedArr = action.payload;
    },
  },
});

export const { setQuantity, setSelectedArr } = selectedSlice.actions;
export default selectedSlice.reducer;
