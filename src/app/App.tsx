import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from '../features/ErrorBoundary';
import { routes } from './routes';

const router = createBrowserRouter(routes);
export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
