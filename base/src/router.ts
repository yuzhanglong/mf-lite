import { RouteConfig } from 'react-router-config';
import React from 'react';

export const routes: RouteConfig[] = [
  {
    component: React.lazy(() => import('./layout')),
    routes: [
      {
        path: '/react',
        component: React.lazy(() => import('./react-micro-wrapper')),
      },
      {
        path: '/vue',
        component: React.lazy(() => import('./vue-micro-wrapper')),
      },
    ],
  },
];
