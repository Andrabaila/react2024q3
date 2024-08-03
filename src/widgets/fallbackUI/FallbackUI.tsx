const handleClick = () => {
  window.location.href = '/';
};

const FallbackUI = () => {
  return (
    <main className="text-red-500">
      <h1 className="flex flex-col items-center">ERROR!!!</h1>
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
