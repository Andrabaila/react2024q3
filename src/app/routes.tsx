import { Navigate, RouteObject } from 'react-router-dom';
import LazyComponent from '../features/lazyComponent/LazyComponent';
import { Page404, PageError, PageMain } from '../pages';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: LazyComponent(PageMain),
    errorElement: <Navigate to="/error" replace />,
  },
  {
    path: '/404',
    element: LazyComponent(Page404),
  },
  {
    path: '/error',
    element: LazyComponent(PageError),
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
];
