import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initialValue: string = '') => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, storedValue);
      } catch (error) {
        console.error(error);
      }
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, storedValue);
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, storedValue);
        } catch (error) {
          console.error(error);
        }
      }
    };
  }, [key, storedValue]);

  return { storedValue, setStoredValue };
};

export default useLocalStorage;
