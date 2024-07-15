import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import { swapiApi } from './pages/main/api/swapiApi';

const setupStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      [swapiApi.reducerPath]: swapiApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swapiApi.middleware),
  });

export const store = setupStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
