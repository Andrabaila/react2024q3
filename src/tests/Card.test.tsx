import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Card from '@/components/Card';
import { setIsVisible, setPersonURL } from '@/store/cardDetailsSlice';
import { setSelectedArr } from '@/store//selectedSlice';
import { Person } from '@/api/types';

const mockStore = configureStore<RootState>([]);
const person: Person = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  eye_color: 'blue',
  url: 'https://swapi.dev/api/people/1/',
  created: '',
  edited: '',
  hair_color: '',
  height: '',
  homeworld: '',
  mass: '',
  skin_color: '',
};

interface RootState {
  details: {
    isVisible: boolean;
  };
  selected: {
    selectedArr: Person[];
  };
}

describe('Card Component', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      details: { isVisible: false },
      selected: { selectedArr: [] },
    });

    store.dispatch = jest.fn();
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <Card el={person} />
      </Provider>,
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText(/Was born in the year 19BBY/)).toBeInTheDocument();
  });

  it('dispatches actions on click and checkbox change', () => {
    render(
      <Provider store={store}>
        <Card el={person} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(store.dispatch).toHaveBeenCalledWith(setIsVisible(true));
    expect(store.dispatch).toHaveBeenCalledWith(setPersonURL(person.url));

    const checkbox = screen.getByLabelText('select person');
    fireEvent.click(checkbox);
    expect(store.dispatch).toHaveBeenCalledWith(setSelectedArr([person]));
  });
});
