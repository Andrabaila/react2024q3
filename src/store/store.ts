import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './api/swapiApi';
import searchReducer from './ui/searchSlice';
import paginationReducer from './components/pagination/paginationSlice';
import detailsReducer from './components/cardDetails/cardDetailsSlice';
import selectedReducer from './components/flyoutElement/selectedSlice';

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
