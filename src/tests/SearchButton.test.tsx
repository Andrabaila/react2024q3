import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SearchButton } from '../ui';
import { setQueryValue } from '../ui/searchSlice';
import { setCurrentPageNumber } from '../store/paginationSlice';

jest.mock('../../hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../searchInput/searchSlice', () => ({
  setQueryValue: jest.fn(),
}));

jest.mock('../../../widgets/pagination/paginationSlice', () => ({
  setCurrentPageNumber: jest.fn(),
}));

describe('SearchButton', () => {
  const useAppDispatchMock = useAppDispatch as jest.Mock;
  const useAppSelectorMock = useAppSelector as jest.Mock;
  const setQueryValueMock = setQueryValue as unknown as jest.Mock;
  const setCurrentPageNumberMock = setCurrentPageNumber as unknown as jest.Mock;
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    useAppDispatchMock.mockClear();
    useAppSelectorMock.mockClear();
    setQueryValueMock.mockClear();
    setCurrentPageNumberMock.mockClear();

    dispatchMock = jest.fn();
    useAppDispatchMock.mockReturnValue(dispatchMock);

    useAppSelectorMock.mockImplementation((selector) => {
      if (selector.toString().includes('searchInputValue')) {
        return 'new value';
      } else if (selector.toString().includes('searchQueryValue')) {
        return 'old value';
      }
      return undefined;
    });
  });

  it('renders Search button and handles click', () => {
    render(<SearchButton />);

    const button = screen.getByText('Search');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(dispatchMock).toHaveBeenCalledWith(setQueryValue('new value'));
    expect(dispatchMock).toHaveBeenCalledWith(setCurrentPageNumber(1));
  });
});
