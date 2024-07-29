import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './pages/main/api/swapiApi';
import searchReducer from './shared/ui/searchInput/searchSlice';
import paginationReducer from './widgets/pagination/paginationSlice';
import detailsReducer from './widgets/cardDetails/cardDetailsSlice';
import selectedReducer from './widgets/flyoutElement/selectedSlice';

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
