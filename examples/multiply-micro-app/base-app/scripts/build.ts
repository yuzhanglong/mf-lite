import { getMicroAppWebpackConfig, webpackBuild } from '@attachments/module-federation-toolkits';
import appConfig from '../app-config';

const build = async () => {
  const config = getMicroAppWebpackConfig({
    appConfig: appConfig,
    port: 8080,
    type: 'base',
    isBuildMode: true,
    isAnalyzeMode: false,
  });

  await webpackBuild(config);
};

build().catch(e => console.log(e));