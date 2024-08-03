import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import PageMain from '@/pages/';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from '@/features/theme';

jest.mock('@/widgets/cardList/CardList', () => {
  const MockCardList = () => <div data-testid="card-list">CardList</div>;
  MockCardList.displayName = 'MockCardList';
  return MockCardList;
});

jest.mock('@/widgets/cardDetails/CardDetails', () => {
  const MockCardDetails = () => <div data-testid="card-details">CardDetails</div>;
  MockCardDetails.displayName = 'MockCardDetails';
  return MockCardDetails;
});

jest.mock('@/widgets', () => ({
  FlyoutElement: () => <div data-testid="flyout-element">FlyoutElement</div>,
  Header: () => <div data-testid="header">Header</div>,
}));

describe('PageMain', () => {
  it('renders without crashing and contains expected elements', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <PageMain />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getByTestId('card-details')).toBeInTheDocument();
    expect(screen.getByTestId('flyout-element')).toBeInTheDocument();
    expect(screen.getByText('CardList')).toBeInTheDocument();
  });
});
