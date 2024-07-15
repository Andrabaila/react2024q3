import PageNotFound from '../../pages/404/Page404';
import { Navigate, RouteObject } from 'react-router-dom';
import PageError from '../../pages/error/PageError';
import PageMain from '../../pages/main/PageMain';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PageMain />,
    errorElement: <Navigate to="/error" replace />,
  },
  {
    path: '/404',
    element: <PageNotFound />,
  },
  {
    path: '/error',
    element: <PageError />,
  },
];
