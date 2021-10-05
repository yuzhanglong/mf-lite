import { RouteConfig } from 'react-router-config';
import PageOne from './pages/page-one';
import Home from './pages/home';
import PageTwo from './pages/page-two';

export const routes: RouteConfig[] = [
  {
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        component: PageOne,
      },
      {
        path: '/page-one',
        component: PageOne,
      },
      {
        path: '/page-two',
        component: PageTwo,
      },
    ],
  },
];
