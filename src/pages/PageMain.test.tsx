import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageMain from './index';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/features/theme';

describe('PageMain', () => {
  it('renders without crashing and contains expected elements', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <PageMain />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
