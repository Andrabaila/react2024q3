import App from '../App';
import PageNotFound from '../../pages/404/Page404';
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
