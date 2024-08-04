import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeContext, ThemeContextProps, ThemeProvider } from '../features/ThemeContext';

const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextProps;

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('renders with initial light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(document.body.className).toBe('light');
  });

  it('toggles theme to dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Toggle Theme'));

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.body.className).toBe('dark');
  });

  it('toggles theme back to light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Toggle Theme'));
    fireEvent.click(screen.getByText('Toggle Theme'));

    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(document.body.className).toBe('light');
  });
});
