import styles from './FallbackUI.module.css';

const handleClick = () => {
  window.location.href = '/';
};

const FallbackUI = () => {
  return (
    <main className={styles.error_main}>
      <h1 className={styles.error}>ERROR!!!</h1>
      <div>
        <p>An error occurred, this is error page.</p>
        <p>Адбылася памылка, гэта старонка памылкі.</p>
        <p>Произошла ошибка, это страница ошибки.</p>
        <p>Wystąpił błąd, to jest strona błędu.</p>
      </div>
      <button type="button" onClick={handleClick}>
        Go to main page
      </button>
    </main>
  );
};

export default FallbackUI;
