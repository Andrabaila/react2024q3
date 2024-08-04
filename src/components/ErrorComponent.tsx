import { useEffect } from 'react';

const ErrorComponent = () => {
  useEffect(() => {
    throw new Error('Intentional error for testing');
  }, []);

  return null;
};

export default ErrorComponent;
