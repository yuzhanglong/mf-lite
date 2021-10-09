import { getMicroAppWebpackConfig, webpackServe } from '@attachments/module-federation-toolkits';
import appConfig from '../app-config';

const serve = async () => {
  const config = getMicroAppWebpackConfig({
    appConfig: appConfig,
    port: 10001,
    type: 'micro-app',
    isBuildMode: false,
    isAnalyzeMode: false,
  });

  await webpackServe(config);
};

serve().catch(e => console.log(e));
