import { Navigate, useRoutes, useLocation } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

import ATM from '../pages/ATM';
import CRM from '../pages/CRM';
import EDC from '../pages/EDC';
import Login from '../pages/Login';
import NotFound from '../pages/Page404';
import Register from '../pages/Register';
import DashboardApp from '../pages/DashboardApp';

export default function Router() {
  const user = localStorage.getItem('USER');
  console.log('testest', user);
  // const parsedUser = JSON.parse(user);

  return useRoutes(
    [{
      path: '/dashboard',
      element: user !== null ? <DashboardLayout /> : <LogoOnlyLayout />,
      children: [
        { path: '/dashboard', element: user !== null ? <Navigate to="app" /> : <Navigate to="/login" /> },
        { path: 'app', element: user !== null ? <DashboardApp /> : <Navigate to="/login" /> },
        { path: 'atm', element: user !== null ? <ATM /> : <Navigate to="/login" /> },
        { path: 'crm', element: user !== null ? <CRM /> : <Navigate to="/login" /> },
        { path: 'edc', element: user !== null ? <EDC /> : <Navigate to="/login" /> },
      ],
    },
    {
      path: '/',
      element: user === null ? <LogoOnlyLayout /> : <DashboardLayout />,
      children: [
        { path: '/', element: user === null ? <Navigate to="/login" /> : <Navigate to="/dashboard/app" /> },
        { path: 'login', element: user === null ? <Login /> : <Navigate to="/dashboard/app" /> },
        // { path: 'register', element: <Register /> },
        // { path: '404', element: <NotFound /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
