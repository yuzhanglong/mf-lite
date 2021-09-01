import * as path from 'path';
import HtmlWebpackPlugin = require('html-webpack-plugin');

import TerserWebpackPlugin = require('terser-webpack-plugin');
import { NormalModuleReplacementPlugin } from 'webpack';
import { publicPath, sourcePath } from './path';

const { ModuleFederationPlugin } = require('webpack').container;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const packageName = require('../package.json').name;

const env = process.env.NODE_ENV;
const isProd = env === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  entry: path.resolve(sourcePath, 'index.tsx'),
  devtool: 'source-map',
  devServer: {
    client: {
      webSocketURL: 'ws://localhost:10000/ws',
    },
    static: publicPath,
    allowedHosts: 'all',
    hot: true,
    port: 10000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    library: `${packageName}`,
    libraryTarget: 'umd',
    publicPath: '/react-micro-app/',
  },
  plugins: [
    new NormalModuleReplacementPlugin(
      /^(react)$|(react-dom)$|(@material-ui\/core)$|^(react\/jsx-dev-runtime)$|^(mobx)$|^(mobx-react-lite)$|^(moment)$|^(lodash)$/,
      (v: any) => {
        // eslint-disable-next-line no-param-reassign
        v.request = `mf_provider/${v.request}`;
      }),
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
    }),
    new ModuleFederationPlugin({
      name: 'micro-react-app',
      remotes: {
        'base_app': `base_app@https://micro-fe.yuzzl.top/base_app_entry.js`,
        'mf_provider': `mf_provider@https://remote.yuzzl.top/mf_provider_entry.js`,
      },
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerPort: 12001,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: [/\.[jt]sx?$/],
        include: [sourcePath],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    minimize: isProd,
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};

export default config;
