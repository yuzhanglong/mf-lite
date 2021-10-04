import { getMicroAppWebpackConfig, webpackServe } from '@attachments/module-federation-toolkits';
import appConfig from '../app-config';

const serve = async () => {
  const config = getMicroAppWebpackConfig({
    appConfig: appConfig,
    port: 10000,
    type: 'micro-app',
    isBuildMode: false,
    isAnalyzeMode: true,
  });

  await webpackServe(config);
};

serve().catch(e => console.log(e));
