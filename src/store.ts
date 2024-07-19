import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import { swapiApi } from './pages/main/api/swapiApi';
import searchReducer from './shared/ui/searchInput/searchSlice';
import paginationReducer from './pages/main/paginationSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    counter: counterReducer,
    pagination: paginationReducer,
    [swapiApi.reducerPath]: swapiApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
