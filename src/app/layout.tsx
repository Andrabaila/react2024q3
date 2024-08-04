import { ReactNode } from 'react';
import { ErrorBoundary } from '@/features';
import { ThemeProvider } from '@/features/ThemeContext';
import { store } from '@/store/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Provider store={store}>
          <ErrorBoundary>
            <ThemeProvider>{children}</ThemeProvider>
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}
