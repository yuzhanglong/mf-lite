import { MicroAppConfig } from '@mf-lite/core/lib/node/micro-fe-app-config';

const config: MicroAppConfig = {
  name: 'micro_app',
  url: 'https://mf-lite-quick-start-micro-app.vercel.app/',
  exposes: [],
  remotes: [
    {
      name: 'base_app',
      url: 'https://mf-lite-quick-start-base-app.vercel.app/',
      sharedLibraries: [
        'react',
        'react-dom',
        'react/jsx-dev-runtime',
        'react-router',
        'react-router-dom',
        'react-router-config',
      ],
    },
  ],
};

export default config;
