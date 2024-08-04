import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { SearchInput } from '../ui';
import { People } from '../api/types';

jest.mock('../../hooks/', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn(),
}));

interface RootState {
  searchInputValue: string;
  searchQueryValue: string;
  searchResults: People;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const mockStore = configureStore<RootState>([]);
const initialState: RootState = {
  searchInputValue: localStorage.getItem('searchInputValue') || '',
  searchQueryValue: localStorage.getItem('searchQueryValue') || '',
  searchResults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  status: 'idle',
};

describe('SearchInput', () => {
  let store: MockStoreEnhanced<RootState, object>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders the search input component', () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>,
    );

    expect(screen.getByPlaceholderText('enter name')).toBeInTheDocument();
  });

  it('updates the search input value on change', () => {
    const mockUseSelector = jest.requireMock('../../hooks/').useAppSelector;
    mockUseSelector.mockImplementation((selector: (state: RootState) => unknown) =>
      selector(store.getState()),
    );
  });
});
