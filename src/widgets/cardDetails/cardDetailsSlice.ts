import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CardDetailsState {
  isVisible: boolean;
  personURL: string;
}

const initialState: CardDetailsState = {
  isVisible: false,
  personURL: '',
};

const cardDetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setIsVisible(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
    setPersonURL(state, action: PayloadAction<string>) {
      state.personURL = action.payload;
    },
  },
});

export const { setIsVisible, setPersonURL } = cardDetailsSlice.actions;
export default cardDetailsSlice.reducer;
