import { MicroAppConfig } from '@attachments/module-federation-toolkits/lib/node/micro-fe-app-config';
import * as path from 'path';
import { sourcePath } from '@attachments/module-federation-toolkits/lib/common/paths';

const config: MicroAppConfig = {
  name: 'micro_app_one',
  url: 'http://localhost:10000/',
  exposes: [
    {
      type: 'module',
      name: 'subtraction',
      path: path.resolve(sourcePath, 'subtraction.ts')
    }
  ],
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
