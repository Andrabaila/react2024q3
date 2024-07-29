export default function Page404() {
  const handleClick = () => {
    window.location.href = '/';
  };

  return (
    <main>
      <h1>404</h1>
      <p>Sorry, there is no such page.</p>
      <p>Прабачце, такой старонкі не існуе.</p>
      <p>Извините, такой страницы не существует.</p>
      <p>Przepraszam, nie ma takiej strony.</p>
      <button type="button" onClick={handleClick}>
        Go to main page
      </button>
    </main>
  );
}
