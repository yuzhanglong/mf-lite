import * as path from 'path';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import { publicPath, sourcePath } from './path';

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const env = process.env.NODE_ENV;
const isProd = env === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    static: publicPath,
    // client: {
    //   webSocketURL: 'wss://localhost:8080/ws',
    // },
  },
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
    }),
    // new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': sourcePath,
    },
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
