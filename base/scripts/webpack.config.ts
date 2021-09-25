import * as path from 'path';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import TerserWebpackPlugin = require('terser-webpack-plugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import * as webpack from 'webpack';
import { publicPath, sourcePath } from './path';
import { CSS_PREFIX, FILE_PREFIX, JS_PREFIX } from './const';
import { getModuleFederationExposes } from './get-module-federation-exposes';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ModuleFederationPlugin } = require('webpack').container;


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

    // 公共路径
    publicPath: '/',
  },
  cache: {
    type: 'filesystem',
  },
  optimization: {
    runtimeChunk: 'single',
    minimize: isProd,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        thirdVendors: {
          name: 'initial-third-vendors',
          test: /moment|lodash|mobx|qiankun/,
          priority: 20,
          enforce: true,
        },
        reactVendors: {
          name: 'initial-react-vendors',
          test: /react\/|react-dom\/|react-router\/|react-router-dom\/|axios/,
          priority: 20,
          enforce: true,
        },
        uiComponents: {
          name: 'initial-ui-components-vendors',
          test: /antd/,
          priority: 20,
          enforce: true,
        },
        uiIcons: {
          name: 'initial-ui-icons-vendors',
          test: /@ant-design\/icons/,
          priority: 20,
          enforce: true,
        },
        uiOthers: {
          name: 'initial-material-ui-others-vendors',
          test: /@ant-design\/*/,
          priority: 10,
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
    new ModuleFederationPlugin({
      name: 'base_app',
      library: {
        type: 'var',
        name: 'base_app',
      },
      filename: 'base_app_entry.js',
      exposes: getModuleFederationExposes([
        'react',
        'react-dom',
        'react-router',
        'react-router-dom',
        'react/jsx-dev-runtime',
        'mobx',
        'antd',
        'mobx-react-lite',
        {
          path: './global-store',
          resolve: path.resolve(sourcePath, 'store', 'global-store.ts'),
        },
      ]),
    }),
    new MiniCssExtractPlugin({
      filename: `${CSS_PREFIX}/${isProd ? '[name].[contenthash].css' : '[name].css'}`,
      chunkFilename: `${CSS_PREFIX}/${isProd ? '[id].[contenthash].css' : '[id].css'}`,
      ignoreOrder: true,
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerPort: 12000,
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/),
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '~src': sourcePath,
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};

export default config;

