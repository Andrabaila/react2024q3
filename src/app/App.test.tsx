import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main page by default', async () => {
  render(<App />);

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});
