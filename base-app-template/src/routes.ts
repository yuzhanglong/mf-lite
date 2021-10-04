import { RouteConfig } from 'react-router-config';
import Home from './pages/home';
import { createMicroApp } from '~src/utils/create-micro-app';

export const routes: RouteConfig[] = [
  {
    component: Home,
    routes: [
      {
        path: '/react',
        component: createMicroApp('micro-app-react'),
      }
    ],
  },
];
