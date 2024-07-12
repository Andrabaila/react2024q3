import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorBoundary from './ErrorBoundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './shared/routes/index.tsx';

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
