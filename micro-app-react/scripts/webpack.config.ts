import * as path from 'path';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import { publicPath, sourcePath } from './path';

const env = process.env.NODE_ENV;
const isProd = env === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  devServer: {
    historyApiFallback: true,
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
