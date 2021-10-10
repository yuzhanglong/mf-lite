import { MicroAppConfig } from '@attachments/module-federation-toolkits/lib/node/micro-fe-app-config';

const config: MicroAppConfig = {
  name: 'micro_app_two',
  url: 'http://localhost:10001/',
  exposes: [],
  remotes: [
    {
      name: 'base_app',
      url: 'http://localhost:8080/',
      sharedLibraries: [
        'react',
        'react-dom',
        'react/jsx-dev-runtime',
        'react-router',
        'react-router-dom',
        'react-router-config'
      ]
    }
  ]
};

export default config;
