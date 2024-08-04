import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from '@/api/swapiApi';
import searchReducer from '@/store/searchSlice';
import paginationReducer from '@/store/paginationSlice';
import detailsReducer from '@/store/cardDetailsSlice';
import selectedReducer from '@/store/selectedSlice';

export const store = configureStore({
  reducer: {
    selected: selectedReducer,
    search: searchReducer,
    pagination: paginationReducer,
    [swapiApi.reducerPath]: swapiApi.reducer,
    details: detailsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
