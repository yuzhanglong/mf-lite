import { Navigate } from 'react-router-dom';
import React from 'react';
import DashboardLayout from '~src/components/DashboardLayout';
import MainLayout from '~src/components/MainLayout';

const Dashboard = React.lazy(() => import('~src/pages/dashboard'));
const VueMicroApp = React.lazy(() => import('~src/micro-apps/vue-micro-wrapper'));
const ReactMicroApp = React.lazy(() => import('~src/micro-apps/react-micro-wrapper'));

const routes = [
  {
    path: '/app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <div>dash board!</div> },
      { path: 'react', element: <ReactMicroApp /> },
      { path: 'vue', element: <VueMicroApp /> },
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
