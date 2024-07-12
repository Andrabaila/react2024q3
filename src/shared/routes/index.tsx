import App from '../../app/App';
import PageNotFound from '../../pages/Page404';
import { Navigate, RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <Navigate to="/404" replace />,
  },
  {
    path: '/404',
    element: <PageNotFound />,
  },
];
