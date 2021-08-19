import * as path from 'path';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
import TerserWebpackPlugin = require('terser-webpack-plugin');
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import { publicPath, sourcePath } from './path';
import { CSS_PREFIX, FILE_PREFIX, JS_PREFIX } from './const';

const env = process.env.NODE_ENV;
const isProd = env === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  entry: path.resolve(sourcePath, 'index.tsx'),
  devtool: isProd ? false : 'source-map',
  output: {
    // 输出的文件名称
    filename: `${JS_PREFIX}/[name].[contenthash:8].js`,

    // 输出文件名称，和 fileName 不同，这里的输出文件为非初始（non-initial）文件，例如我们熟悉的路由懒加载
    chunkFilename: `${JS_PREFIX}/[name].[contenthash:8].chunk.js`,

    // asset/resource 模块以 [hash][ext][query] 文件名发送到输出目录
    assetModuleFilename: `${FILE_PREFIX}/[hash][ext][query]`,
  },
  optimization: {
    runtimeChunk: 'single',
    minimize: isProd,
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        uiVendors: {
          name: 'initial-ui-vendors',
          test: /react\/|react-dom\/|mobx-react\/|mobx\/|react-router\/|react-router-dom\/|axios\//,
          enforce: true,
        },
        antd: {
          name: 'initial-antd',
          test: /antd\/es|antd\/lib|rc-.*/,
          enforce: true,
        },
      },
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
      new BundleAnalyzerPlugin({
        analyzerPort: 8000,
      }),
    ],
  },
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
    }),
    !isProd && new ReactRefreshPlugin(),
    new MiniCssExtractPlugin({
      filename: `${CSS_PREFIX}/${isProd ? '[name].[contenthash].css' : '[name].css'}`,
      chunkFilename: `${CSS_PREFIX}/${isProd ? '[id].[contenthash].css' : '[id].css'}`,
      ignoreOrder: true,
    }),
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  }
};

export default config;

