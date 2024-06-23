import { useRoutes } from 'react-router-dom';
// import { PrivateRoute, PublicRoute } from './routeGuards';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  // const mainRoutes = {
  //   path: '/',
  //   element: <PrivateRoute element={<MainRoutes.element />} />,
  //   children: MainRoutes.children,
  // };

  // const authenticationRoutes = {
  //   path: '/',
  //   element: <PublicRoute element={<AuthenticationRoutes.element />} />,
  //   children: AuthenticationRoutes.children,
  // };

  return useRoutes([MainRoutes, AuthenticationRoutes]);
}
