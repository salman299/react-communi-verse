import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { PrivateRoute } from './routeGuards';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));


// Communities
const AllCommunities = Loadable(lazy(() => import('views/communities')));
const MyCommunities = Loadable(lazy(() => import('views/communities/myCommunities')));
const ManageCommunities = Loadable(lazy(() => import('views/communities/manageCommunities')));

// Activities
const Events = Loadable(lazy(() => import('views/events')));


// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
  path: '/',
  element: <PrivateRoute element={<MainLayout/>} />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'communities',
      children: [
        {
          path: '',
          element: <AllCommunities />
        },
        {
          path: 'my-communities',
          element: <MyCommunities />
        },
        {
          path: 'manage-communities',
          element: <ManageCommunities />
        }
      ]
    },
    {
      path: 'events',
      children: [
        {
          path: '',
          element: <Events />
        }
      ]
    }
  ]
};

export default MainRoutes;
