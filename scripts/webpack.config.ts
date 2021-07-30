import * as webpack from 'webpack';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import * as path from 'path';

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/index.ts',
  plugins: [
    new webpack.ProvidePlugin({
      'intl': [
        path.resolve(
          process.cwd(),
          'src/packages/intl/intl-entry',
        ),
        'default',
      ],
    }),
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};

export default config;
