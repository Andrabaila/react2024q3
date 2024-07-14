import React, { useCallback, useEffect, useState } from 'react';
import CardList from '../../widgets/cardList/CardList';
import { SearchBar } from '../../widgets/searchBar/SearchBar';
import { People, getPeople } from './api/api';
import { useLocalStorage } from '../../app/hooks/useLocalStorage';
import { Pagination } from '../../widgets/pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

type InitialState = {
  searchInputValue: string;
  searchResults: People;
  isLoading: boolean;
  isError: boolean;
  currentPageNumber: number;
};

export default function PageMain() {
  const { searchInputValue, setSearchInputValue } = useLocalStorage();
  const [state, setState] = useState<InitialState>({
    searchInputValue: searchInputValue,
    searchResults: { count: 0, next: null, previous: null, results: [] },
    isLoading: false,
    isError: false,
    currentPageNumber: 1,
  });
  const [, setURLSearchParams] = useSearchParams();

  const handleClick = useCallback(async () => {
    setSearchInputValue(state.searchInputValue);
    setState((prev) => ({
      ...prev,
      currentPageNumber: 1,
      isLoading: true,
    }));
    const peopleArray = await getPeople(state.searchInputValue.trim(), 1);
    if (peopleArray) {
      setState((prev) => ({
        ...prev,
        searchResults: peopleArray,
        isLoading: false,
      }));
    }
  }, [setSearchInputValue, state.searchInputValue]);

  useEffect(() => {
    handleClick();
    window.addEventListener('beforeunload', () => setSearchInputValue(searchInputValue));
    return () => setSearchInputValue(searchInputValue);
  }, []);

  useEffect(() => {
    setURLSearchParams(`page=${state.currentPageNumber}`);
  }, [setURLSearchParams, state.currentPageNumber]);

  const handleError = () => {
    setState((prev) => ({
      ...prev,
      isError: true,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      searchInputValue: e.target.value,
    }));
  };

  if (state.isError) {
    throw new Error('ERROR!!!');
  }

  const getPreviousPage = async () => {
    if (state.currentPageNumber > 1) {
      setState((prev) => ({
        ...prev,
        currentPageNumber: state.currentPageNumber - 1,
        isLoading: true,
      }));
      const peopleArray = await getPeople(
        state.searchInputValue.trim(),
        state.currentPageNumber - 1,
      );
      if (peopleArray) {
        setState((prev) => ({
          ...prev,
          searchResults: peopleArray,
          isLoading: false,
        }));
      }
    }
  };
  const getNextPage = async () => {
    const totalPages = Math.ceil(state.searchResults.count / 10);
    if (state.currentPageNumber < totalPages) {
      setState((prev) => ({
        ...prev,
        currentPageNumber: state.currentPageNumber + 1,
        isLoading: true,
      }));

      const peopleArray = await getPeople(
        state.searchInputValue.trim(),
        state.currentPageNumber + 1,
      );
      if (peopleArray) {
        setState((prev) => ({
          ...prev,
          searchResults: peopleArray,
          isLoading: false,
        }));
      }
    }
  };

  return (
    <>
      <SearchBar
        handleClick={handleClick}
        handleError={handleError}
        value={state.searchInputValue}
        onChange={handleChange}
      />
      {state.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CardList list={state.searchResults.results} />
          <Pagination
            currentPageNumber={state.currentPageNumber}
            getPreviousPage={getPreviousPage}
            getNextPage={getNextPage}
          />
        </>
      )}
    </>
  );
}
