import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { I18nWebpackPlugin } from '@attachments/i18n-webpack-plugin';

const env = process.env.NODE_ENV;
const isProd = env === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      'intl': [
        path.resolve(
          process.cwd(),
          'src/intl-entry',
        ),
        'default',
      ],
    }),
    new HtmlWebpackPlugin(),
    isProd && new I18nWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  module: {
    rules: [
      {
        test: [/\.[jt]sx?$/],
        include: [path.resolve(process.cwd(), './src')],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

export default config;
