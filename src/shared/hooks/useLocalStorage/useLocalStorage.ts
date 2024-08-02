import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initialValue: string = '') => {
  // State to store the current value
  const [storedValue, setStoredValue] = useState<string>(() => {
    // Check if `window` is defined (i.e., code is running on the client side)
    if (typeof window === 'undefined') {
      return initialValue;
    }
    // Retrieve the item from localStorage
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Effect to update localStorage when `storedValue` changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, storedValue);
      } catch (error) {
        console.error(error);
      }
    }
  }, [key, storedValue]);

  // Effect to handle the beforeunload event to persist data
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
