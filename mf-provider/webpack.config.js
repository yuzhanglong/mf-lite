const { ModuleFederationPlugin } = require('webpack').container;

function getModuleFederationExposes(modules) {
  const exposes = {};
  for (const module of modules) {
    if (typeof module === 'string') {
      const key = `./${module}`;
      exposes[key] = require.resolve(module);
    } else if (typeof module === 'object') {
      exposes[module.path] = module.resolve;
    }
  }
  return exposes;
}

const env = process.env.NODE_ENV;
const isProd = env === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'source-map',
  entry: './src/index.js',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '~src': './src',
    },
  },
  output: {
    // 公共路径
    publicPath: 'auto',
  },
  devServer: {
    allowedHosts: 'all',
    hot: true,
    port: 8081,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mf_provider',
      filename: 'mf_provider_entry.js',
      exposes: getModuleFederationExposes([
        'react',
        'react-dom',
        '@material-ui/core',
        'react/jsx-dev-runtime',
        'mobx',
        'mobx-react-lite',
        'moment',
        'lodash',
      ]),
    }),
  ],
};
