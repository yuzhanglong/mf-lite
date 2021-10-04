import { MicroAppConfig } from '@attachments/module-federation-toolkits/lib/node/micro-fe-app-config';

const config: MicroAppConfig = {
  name: 'react-demo-app',
  url: 'https://react-demo-app-yzl.vercel.app/',
  exposes: [],
  remotes: [
    {
      name: 'base_app',
      url: 'https://base-yzl.vercel.app/',
      sharedEntryPath: 'https://base-yzl.vercel.app/base_app_entry.js',
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
