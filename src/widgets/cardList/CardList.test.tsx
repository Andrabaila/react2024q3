import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetPeopleQuery } from '../../shared/api/swapiApi';
import CardList from './CardList';
import { Person } from '../../shared/api/types';
import { useSearchParams } from 'next/navigation';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../../shared/api/swapiApi', () => ({
  useGetPeopleQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('../card', () => {
  const Card = ({ el }: { el: Person }) => <div>{el.name}</div>;
  Card.displayName = 'Card';
  return Card;
});

const mockPeopleData = {
  count: 1,
  results: [{ name: 'Luke Skywalker' }] as Person[],
};

describe('CardList', () => {
  const mockDispatch = jest.fn();
  const setURLSearchParams = jest.fn();

  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        search: { searchQueryValue: 'Luke' },
        pagination: { currentPageNumber: 1 },
      }),
    );

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSearchParams as jest.Mock).mockReturnValue([{}, setURLSearchParams]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useGetPeopleQuery as jest.Mock).mockReturnValue({ data: null, isLoading: true });

    render(<CardList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders people data', () => {
    (useGetPeopleQuery as jest.Mock).mockReturnValue({ data: mockPeopleData, isLoading: false });

    render(<CardList />);

    screen.debug();

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.queryByText('Sorry!')).not.toBeInTheDocument();
    expect(
      screen.queryByText('There are no results matching the specified search criteria'),
    ).not.toBeInTheDocument();
  });

  it('renders no results message', () => {
    (useGetPeopleQuery as jest.Mock).mockReturnValue({
      data: { count: 0, results: [] },
      isLoading: false,
    });

    render(<CardList />);

    expect(
      screen.getByText('There are no results matching the specified search criteria'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
