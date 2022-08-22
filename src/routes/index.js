import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
//
import { PATH_AFTER_LOGIN } from '../config';

// import LoadingScreen from '../components/LoadingScreen';

// const DashboardApp = Loadable(lazy(() => import('../pages/DashboardApp')));
// const ATM = Loadable(lazy(() => import('../pages/ATM')));
// const CRM = Loadable(lazy(() => import('../pages/CRM')));
// const EDC = Loadable(lazy(() => import('../pages/EDC')));
import ATM from '../pages/ATM';
import CRM from '../pages/CRM';
import EDC from '../pages/EDC';
import Login from '../pages/Login';
import NotFound from '../pages/Page404';
import Register from '../pages/Register';
import DashboardApp from '../pages/DashboardApp';

// const Loadable = (Component) => (props) => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { pathname } = useLocation();

//   return (
//     <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };

// export default function Router() {
//   return useRoutes([
//     {
//       path: '/',
//       children: [
//         {
//           path: 'login',
//           element: <Login />,
//         },
//       ],
//     },

//     // Dashboard Routes
//     {
//       path: 'dashboard',
//       element: <DashboardLayout />,
//       children: [
//         { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
//         { path: 'app', element: <DashboardApp /> },
//         { path: 'atm', element: <ATM /> },
//         { path: 'crm', element: <CRM /> },
//         { path: 'edc', element: <EDC /> },
//       ],
//     },

//     { path: '*', element: <Navigate to="/404" replace /> },
//   ]);
// }

export default function Router() {
  const user = localStorage.getItem('USER');
  console.log('testest', user);
  // const parsedUser = JSON.parse(user);
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard', element: <Navigate to="app" /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'atm', element: <ATM /> },
        { path: 'crm', element: <CRM /> },
        { path: 'edc', element: <EDC /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        // { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
