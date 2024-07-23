import { useEffect } from 'react';
import { Person } from '../../pages/main/api/types';
import { useGetPeopleQuery } from '../../pages/main/api/swapiApi';
import { useAppSelector } from '../../shared/hooks';
import Pagination from '../pagination';
import styles from './CardList.module.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTotalPages } from '../pagination/paginationSlice';
import { setIsVisible, setPersonURL } from '../cardDetails/cardDetailsSlice';

export default function CardList() {
  const searchQuery = useAppSelector((state) => state.search.searchQueryValue);
  const currentPageNumber = useAppSelector((state) => state.pagination.currentPageNumber);
  const isDetailsVisible = useAppSelector((state) => state.details.isVisible);
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

  const handleClick = (url: string) => {
    if (!isDetailsVisible) {
      dispatch(setIsVisible(true));
      dispatch(setPersonURL(url));
    }
  };

  return (
    <section className={styles.section}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.people}>
            {peopleData && peopleData.results.length ? (
              peopleData.results.map((el: Person) => (
                <div className={styles.person} key={el.name} onClick={() => handleClick(el.url)}>
                  <h2 className={styles.name}>{el.name}</h2>
                  <p className={styles.description}>
                    Was born in the year {el.birth_year}.{' '}
                    {el.gender.charAt(0).toUpperCase() + el.gender.slice(1)} has {el.eye_color}{' '}
                    eyes, {el.hair_color} hair, weighs {el.mass} kg, and is {el.height} cm tall.
                  </p>
                </div>
              ))
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
