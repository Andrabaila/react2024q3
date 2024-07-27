import { useEffect } from 'react';
import { Person } from '../../pages/main/api/types';
import { useGetPeopleQuery } from '../../pages/main/api/swapiApi';
import { useAppSelector } from '../../shared/hooks';
import Pagination from '../pagination';
import styles from './CardList.module.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTotalPages } from '../pagination/paginationSlice';
import Card from '../card';

export default function CardList() {
  const searchQuery = useAppSelector((state) => state.search.searchQueryValue);
  const currentPageNumber = useAppSelector((state) => state.pagination.currentPageNumber);
  const dispatch = useDispatch();

  const [, setURLSearchParams] = useSearchParams();
  useEffect(() => {
    setURLSearchParams(`search=${searchQuery}&page=${currentPageNumber}`);
  }, [setURLSearchParams, searchQuery, currentPageNumber]);

  const { data: peopleData, isLoading } = useGetPeopleQuery({
    searchQuery: searchQuery.trim(),
    page: currentPageNumber,
  });

  useEffect(() => {
    if (peopleData) {
      dispatch(setTotalPages(Math.ceil(peopleData.count / 10)));
    }
  }, [dispatch, peopleData]);

  return (
    <section className={styles.section}>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div className={styles.people}>
            {peopleData && peopleData.results.length ? (
              peopleData.results.map((el: Person) => <Card el={el} key={el.name} />)
            ) : (
              <h3>Sorry!</h3>
            )}
          </div>
          {peopleData && peopleData.results.length ? (
            <Pagination />
          ) : (
            <div>There are no results matching the specified search criteria</div>
          )}
        </>
      )}
    </section>
  );
}
