import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export const webpackPromisify = (config: Record<string, any>) => {
  return new Promise((resolve, reject) => {
    webpack(config, (err: any, state) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        reject();
      }

      const info = state.toJson();

      if (state.hasErrors()) {
        console.error(info.errors);
        reject();
      }

      if (state.hasWarnings()) {
        console.warn(info.warnings);
        reject();
      }

      resolve(true);
    });
  });
};

export const webpackBuild = async (config: Record<string, any>) => {
  await webpackPromisify(config);
};


export const webpackServe = async (config: Record<string, any>) => {
  const compiler = webpack(config);

  const devServerOptions = {
    ...config.devServer,
  };

  // @ts-ignore
  const server = new WebpackDevServer(devServerOptions, compiler);

  server.startCallback(() => {
    console.log('webpack dev server is running...');
  });
};
