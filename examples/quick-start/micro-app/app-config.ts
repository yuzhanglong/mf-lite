import { MicroAppConfig } from '@attachments/module-federation-toolkits/lib/node/micro-fe-app-config';

const config: MicroAppConfig = {
  name: 'micro_app_react',
  url: 'http://localhost:10000/',
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
        'react-router-config',
        'antd'
      ]
    }
  ]
};

export default config;
