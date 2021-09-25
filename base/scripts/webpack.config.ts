import * as path from 'path';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import TerserWebpackPlugin = require('terser-webpack-plugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import * as webpack from 'webpack';
import { NormalModuleReplacementPlugin } from 'webpack';
import { publicPath, sourcePath } from './path';
import { CSS_PREFIX, FILE_PREFIX, JS_PREFIX } from './const';

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
    new NormalModuleReplacementPlugin(
      /(.*)/,
      (v: { request: string }) => {
        const externalPackages = [
          'react',
          'react-dom',
          'mobx',
          'mobx-react-lite',
          'react-router-dom',
          'antd',
        ];
        if (externalPackages.includes(v.request)) {
          // eslint-disable-next-line no-param-reassign
          v.request = `mf_provider/${v.request}`;
        }
      }),
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
    }),
    new ModuleFederationPlugin({
      remotes: {
        'mf_provider': 'mf_provider@https://mf.yuzzl.top/mf_provider.js',
      },
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

