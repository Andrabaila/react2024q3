import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import Pagination from './Pagination';
import { setCurrentPageNumber } from './paginationSlice';

// Mock the hooks
jest.mock('../../shared/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('./paginationSlice', () => ({
  setCurrentPageNumber: jest.fn(),
}));

describe('Pagination', () => {
  const useAppDispatchMock = useAppDispatch as jest.Mock;
  const useAppSelectorMock = useAppSelector as jest.Mock;
  const setCurrentPageNumberMock = setCurrentPageNumber as unknown as jest.Mock;

  beforeEach(() => {
    useAppDispatchMock.mockClear();
    useAppSelectorMock.mockClear();
    setCurrentPageNumberMock.mockClear();
  });

  it('renders the current page number and total pages', () => {
    useAppSelectorMock.mockImplementation((selectorFn) =>
      selectorFn({
        pagination: {
          currentPageNumber: 1,
          totalPages: 5,
        },
      }),
    );

    render(<Pagination />);

    expect(screen.getByText('1 of 5')).toBeInTheDocument();
  });

  it('dispatches setCurrentPageNumber with the previous page number when back button is clicked', () => {
    const dispatchMock = jest.fn();
    useAppDispatchMock.mockReturnValue(dispatchMock);
    useAppSelectorMock.mockImplementation((selectorFn) =>
      selectorFn({
        pagination: {
          currentPageNumber: 2,
          totalPages: 5,
        },
      }),
    );

    render(<Pagination />);

    fireEvent.click(screen.getByText('back'));

    expect(dispatchMock).toHaveBeenCalledWith(setCurrentPageNumber(1));
  });

  it('dispatches setCurrentPageNumber with the next page number when forward button is clicked', () => {
    const dispatchMock = jest.fn();
    useAppDispatchMock.mockReturnValue(dispatchMock);
    useAppSelectorMock.mockImplementation((selectorFn) =>
      selectorFn({
        pagination: {
          currentPageNumber: 1,
          totalPages: 5,
        },
      }),
    );

    render(<Pagination />);

    fireEvent.click(screen.getByText('forward'));

    expect(dispatchMock).toHaveBeenCalledWith(setCurrentPageNumber(2));
  });

  it('does not dispatch setCurrentPageNumber when back button is clicked on the first page', () => {
    const dispatchMock = jest.fn();
    useAppDispatchMock.mockReturnValue(dispatchMock);
    useAppSelectorMock.mockImplementation((selectorFn) =>
      selectorFn({
        pagination: {
          currentPageNumber: 1,
          totalPages: 5,
        },
      }),
    );

    render(<Pagination />);

    fireEvent.click(screen.getByText('back'));

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('does not dispatch setCurrentPageNumber when forward button is clicked on the last page', () => {
    const dispatchMock = jest.fn();
    useAppDispatchMock.mockReturnValue(dispatchMock);
    useAppSelectorMock.mockImplementation((selectorFn) =>
      selectorFn({
        pagination: {
          currentPageNumber: 5,
          totalPages: 5,
        },
      }),
    );

    render(<Pagination />);

    fireEvent.click(screen.getByText('forward'));

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
