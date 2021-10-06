import * as path from 'path';
import { MicroAppConfig } from '@attachments/module-federation-toolkits/lib/node/micro-fe-app-config';
import { sourcePath } from '@attachments/module-federation-toolkits/lib/common/paths';

const config: MicroAppConfig = {
  remotes: [],
  name: 'base_app',
  url: 'https://mf-lite-quick-start-base-app.vercel.app/',
  exposes: [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'react-router-config',
    'react/jsx-dev-runtime',
    {
      name: 'shared-utils',
      path: path.resolve(sourcePath, 'utils', 'shared-utils.ts'),
      type: 'module',
    },
  ],
};

export default config;
