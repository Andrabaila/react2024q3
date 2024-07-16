import { useState, useEffect } from 'react';

export const useLocalStorage = () => {
  const key = 'searchInputValue';
  const [searchInputValue, setSearchInputValue] = useState('');

  // Load the query from local storage when the component mounts
  useEffect(() => {
    const savedQuery = localStorage.getItem(key);
    if (savedQuery) {
      setSearchInputValue(savedQuery);
    } else {
      localStorage.setItem(key, searchInputValue);
    }
  }, [searchInputValue]);

  // Save the query to local storage when the component unmounts
  useEffect(() => {
    window.addEventListener('beforeunload', () => localStorage.setItem(key, searchInputValue));
    return () => {
      localStorage.setItem(key, searchInputValue);
    };
  }, [searchInputValue]);

  return { searchInputValue, setSearchInputValue };
};

export default useLocalStorage;
