import { useCallback, useEffect, useState } from 'react';
import CardList from '../../widgets/cardList/CardList';
import { SearchBar } from '../../widgets/searchBar/SearchBar';
import { useLocalStorage } from '../../app/hooks/useLocalStorage';
import { Pagination } from '../../widgets/pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useGetPeopleQuery } from './api/swapiApi';

type InitialState = {
  searchInputValue: string;
  currentPageNumber: number;
};

export default function PageMain() {
  const { searchInputValue, setSearchInputValue } = useLocalStorage();
  const [state, setState] = useState<InitialState>({
    searchInputValue: searchInputValue,
    currentPageNumber: 1,
  });
  const [, setURLSearchParams] = useSearchParams();

  const {
    data: peopleData,
    error,
    isLoading,
  } = useGetPeopleQuery({
    searchQuery: state.searchInputValue.trim(),
    page: state.currentPageNumber,
  });

  const handleClick = useCallback(() => {
    setSearchInputValue(state.searchInputValue);
    setState((prev) => ({
      ...prev,
      currentPageNumber: 1,
    }));
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
    throw new Error('ERROR!!!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      searchInputValue: e.target.value,
    }));
  };

  const getPreviousPage = () => {
    if (state.currentPageNumber > 1) {
      setState((prev) => ({
        ...prev,
        currentPageNumber: state.currentPageNumber - 1,
      }));
    }
  };

  const getNextPage = () => {
    if (peopleData && state.currentPageNumber < Math.ceil(peopleData.count / 10)) {
      setState((prev) => ({
        ...prev,
        currentPageNumber: state.currentPageNumber + 1,
      }));
    }
  };

  if (error) {
    handleError();
  }

  return (
    <>
      <SearchBar
        handleClick={handleClick}
        handleError={handleError}
        value={state.searchInputValue}
        onChange={handleChange}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CardList list={peopleData?.results || []} />
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
