import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) || '';
  });

  useEffect(() => {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      setStoredValue(savedValue);
    } else {
      localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(key, storedValue);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      localStorage.setItem(key, storedValue);
    };
  }, [key, storedValue]);

  return { storedValue, setStoredValue };
};

export default useLocalStorage;
