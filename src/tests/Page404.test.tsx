import { render, screen, fireEvent } from '@testing-library/react';
import Page404 from '../app/404/page';

describe('Page404', () => {
  test('renders 404 page with messages', () => {
    render(<Page404 />);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Sorry, there is no such page./i)).toBeInTheDocument();
    expect(screen.getByText(/Прабачце, такой старонкі не існуе./i)).toBeInTheDocument();
    expect(screen.getByText(/Извините, такой страницы не существует./i)).toBeInTheDocument();
    expect(screen.getByText(/Przepraszam, nie ma takiej strony./i)).toBeInTheDocument();
  });

  test('button redirects to main page', () => {
    render(<Page404 />);

    const button = screen.getByText(/Go to main page/i);
    fireEvent.click(button);

    expect(window.location.href).toBe('http://localhost/');
  });
});
