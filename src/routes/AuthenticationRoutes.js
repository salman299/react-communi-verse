import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { PublicRoute } from './routeGuards';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <PublicRoute element={<MinimalLayout />} />,
  children: [
    {
      path: '/login/',
      element: <AuthLogin />
    },
    {
      path: '/register/',
      element: <AuthRegister />
    }
  ]
};

export default AuthenticationRoutes;
