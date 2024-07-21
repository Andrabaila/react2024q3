import styles from './ErrorButton.module.css';

const ErrorButton = () => {
  const handleError = () => {
    window.location.href = '/error';
  };

  return (
    <button className={styles.button} onClick={handleError}>
      Error
    </button>
  );
};

export default ErrorButton;
