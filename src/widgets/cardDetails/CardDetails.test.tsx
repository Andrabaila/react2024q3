import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { useGetPersonQuery } from '../../shared/api/swapiApi';
import CardDetails from './CardDetails';
import { setIsVisible } from './cardDetailsSlice';
import { RootState } from '../../store';

const mockStore = configureStore<RootState>([]);

jest.mock('../../shared/api/swapiApi', () => ({
  useGetPersonQuery: jest.fn(),
}));

describe('CardDetails Component', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      selected: {
        selectedArr: [],
        quantity: 0,
      },
      search: {
        searchInputValue: '',
        searchQueryValue: '',
        searchResults: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
        status: 'idle',
      },
      pagination: { currentPageNumber: 1, totalPages: 1 },
      swapiApi: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {
          reducerPath: 'swapiApi',
          online: true,
          focused: true,
          middlewareRegistered: true,
          refetchOnMountOrArgChange: true,
          refetchOnReconnect: true,
          refetchOnFocus: true,
          keepUnusedDataFor: 60,
          invalidationBehavior: 'delayed',
        },
      },
      details: { isVisible: true, personURL: 'https://swapi.dev/api/people/1/' },
    });

    store.dispatch = jest.fn();
  });

  it('renders loading state', () => {
    (useGetPersonQuery as jest.Mock).mockReturnValue({ data: null, isLoading: true });

    render(
      <Provider store={store}>
        <CardDetails />
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders person details', () => {
    const person = {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      skin_color: 'fair',
      hair_color: 'blond',
      eye_color: 'blue',
      height: '172',
      mass: '77',
      homeworld: 'Tatooine',
      url: 'https://swapi.dev/api/people/1/',
    };
    (useGetPersonQuery as jest.Mock).mockReturnValue({ data: person, isLoading: false });

    render(
      <Provider store={store}>
        <CardDetails />
      </Provider>,
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText(/birth year: 19BBY/)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/)).toBeInTheDocument();
  });

  it('dispatches setIsVisible on close button click', () => {
    const person = {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      skin_color: 'fair',
      hair_color: 'blond',
      eye_color: 'blue',
      height: '172',
      mass: '77',
      homeworld: 'Tatooine',
      url: 'https://swapi.dev/api/people/1/',
    };
    (useGetPersonQuery as jest.Mock).mockReturnValue({ data: person, isLoading: false });

    render(
      <Provider store={store}>
        <CardDetails />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Close'));

    expect(store.dispatch).toHaveBeenCalledWith(setIsVisible(false));
  });

  it('renders "No such person" when no data', () => {
    (useGetPersonQuery as jest.Mock).mockReturnValue({ data: null, isLoading: false });

    render(
      <Provider store={store}>
        <CardDetails />
      </Provider>,
    );

    expect(screen.getByText('No such person')).toBeInTheDocument();
  });
});
