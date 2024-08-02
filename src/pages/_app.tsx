import { ErrorBoundary } from '@/features';
import { ThemeProvider } from '@/features/theme';
import { store } from '@/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
          <Component {...pageProps} />;
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}
