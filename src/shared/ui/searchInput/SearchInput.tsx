import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { setSearchValue } from './searchSlice';
import styles from './SearchInput.module.css';

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.searchValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
  };

  return (
    <input
      type="search"
      className={styles.input}
      placeholder="enter name 🔍"
      value={searchValue}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
