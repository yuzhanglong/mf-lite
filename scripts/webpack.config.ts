import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';

const config: webpack.Configuration = {
  mode: 'development',
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
