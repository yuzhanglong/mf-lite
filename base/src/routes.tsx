import { Navigate } from 'react-router-dom';
import React from 'react';
import HomeLayout from '~src/components/DashboardLayout';
import MainLayout from '~src/components/MainLayout';

const Dashboard = React.lazy(() => import('~src/pages/temp-home'));
const ReactMicroApp = React.lazy(() => import('~src/micro-apps/react-micro-wrapper'));

const routes = [
  {
    path: '/app',
    element: <HomeLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'react', element: <ReactMicroApp /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to='/app/dashboard' /> },
    ],
  },
];

export default routes;
