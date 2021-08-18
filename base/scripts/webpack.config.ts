import * as path from 'path';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
import { publicPath, sourcePath } from './path';

const packageName = require('../package.json').name;

const env = process.env.NODE_ENV;
const isProd = env === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  entry: path.resolve(sourcePath, 'index.tsx'),
  devtool: 'source-map',
  devServer: {
    client: {
      webSocketURL: 'ws://localhost:8080/ws',
    },
    static: publicPath,
    allowedHosts: 'all',
    hot: true,
    port: 8080,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
    }),
    !isProd && new ReactRefreshPlugin(),
  ].filter(Boolean),
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
};

export default config;

