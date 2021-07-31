import * as webpack from 'webpack';
import HtmlWebpackPlugin = require('html-webpack-plugin')
import * as path from 'path';

const config: webpack.Configuration = {
  mode: 'development',
  entry: './hello/index.ts',
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      'intl': [
        path.resolve(
          process.cwd(),
          'src/packages/intl/intl-entry'
        ),
        'default'
      ]
    }),
    new HtmlWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      // 选择哪些块进行优化, 提供 all 味着即使在异步和非异步块之间也可以共享块
      chunks: 'all',

      // 自定义拆分块的名称，webpack 默认配置即可
      name: false,

      cacheGroups: {
        // 默认配置下的入口 vendor 名字又臭又长，这里对此作出修改，通过 hash 值来保证不会冲突
        defaultVendors: {
          filename: (pathData) => {
            return `vendor-${pathData.chunk.hash}.js`;
          }
        }
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
};

export default config;
