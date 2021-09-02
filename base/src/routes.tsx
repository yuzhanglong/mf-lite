import { RouteConfig } from 'react-router-config';
import AppLayout from '~src/components/app-layout';
import Home from './pages/home';
import ReactMicroApp from '~src/micro-apps/react-micro-app';

export const routes: RouteConfig[] = [
  {
    component: AppLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/react',
        component: ReactMicroApp,
      },
    ],
  },
];
