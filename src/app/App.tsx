import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '../features/';
import { routes } from './routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
