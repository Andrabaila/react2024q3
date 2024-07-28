import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import SearchButton from './SearchButton';
import { setQueryValue } from '../searchInput/searchSlice';
import { setCurrentPageNumber } from '../../../widgets/pagination/paginationSlice';

// Мокируем хук useAppDispatch и useAppSelector
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

    // Проверяем, что кнопка рендерится
    const button = screen.getByText('Search');
    expect(button).toBeInTheDocument();

    // Нажимаем на кнопку
    fireEvent.click(button);

    // Проверяем, что dispatch был вызван с правильными аргументами
    expect(dispatchMock).toHaveBeenCalledWith(setQueryValue('new value'));
    expect(dispatchMock).toHaveBeenCalledWith(setCurrentPageNumber(1));
  });
});
