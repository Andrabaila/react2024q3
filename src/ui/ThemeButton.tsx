import { useTheme } from '../hooks';

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme</button>
  );
};

export default ThemeButton;
