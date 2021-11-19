import webpack, { NormalModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import moment from 'moment';
import * as path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import { publicPath as assetPublicPath, sourcePath } from '../common/paths';
import { CSS_PREFIX, FILE_PREFIX, JS_PREFIX } from '../common/constants';
import { getMicroAppConfigManager, MicroAppConfig } from './micro-fe-app-config';
import { getModuleFederationExposes } from './get-module-federation-exposes';
import { EmitMfExposeWebpackPlugin } from './emit-mf-expose-webpack-plugin';
import { AddEntryAttributeWebpackPlugin } from './add-entry-attribute-webpack-plugin';

const TerserWebpackPlugin = require('terser-webpack-plugin');

const { ModuleFederationPlugin } = require('webpack').container;

export interface MicroAppWebpackConfigOptions {
  // 项目类型，base: 基座， micro-app 微应用
  type: 'base-app' | 'micro-app';

  // 项目运行的端口
  port: number;

  // 微应用配置
  appConfig: MicroAppConfig;

  // 是否在构建环境
  isBuildMode: boolean;

  // 开启分析模式
  isAnalyzeMode?: boolean;
}

/**
 * 基座或者微应用的 webpack 配置封装
 *
 * @author yuzhanglong
 * @date 2021-10-03 19:32:18
 * @param options 相关配置选项，可参考上面的类型定义
 * @see MicroAppWebpackConfigOptions
 */
export const getMicroAppWebpackConfig = (options: MicroAppWebpackConfigOptions) => {
  const { port, appConfig, isBuildMode, isAnalyzeMode } = options;
  const websocketPath = `ws://localhost:${port.toString()}/ws`;

  // 是否为生产环境
  const isProductionEnvironment = process.env.NODE_ENV === 'production';

  // 微应用工具管理类
  const microAppConfigManager = getMicroAppConfigManager(appConfig);

  // noinspection UnnecessaryLocalVariableJS
  const config = {
    mode: isProductionEnvironment ? 'production' : 'development',

    // 打包入口，默认为 index.tsx
    entry: path.resolve(sourcePath, 'index.tsx'),

    // 在生产环境下默认不会打包 sourcemap (但有时候可能还是有必要的，比如接入监控平台)
    devtool: isProductionEnvironment ? false : 'source-map',

    // 开启打包文件缓存，第二次打开可以节约大量的时间
    // 在 build 模式下不要打开，否则会报错
    cache: isBuildMode ? false : {
      type: 'filesystem',
    },

    // 代码优化配置
    optimization: {
      // 这里保证了基座热更新的实现
      runtimeChunk: 'single',
      minimize: isProductionEnvironment,
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
      // 一些常见依赖的代码分割
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
    },

    // webpack dev-server
    // @ts-ignore
    devServer: {
      client: {
        webSocketURL: websocketPath,
      },
      static: {
        directory: assetPublicPath,
        watch: {
          ignored: (f: string) => {
            // 生成的类型定义不要监听，否则会引发全局的 reload 使 HMR 失去意义
            return f.endsWith('.d.ts');
          },
        },
      },
      allowedHosts: 'all',
      hot: true,
      port: port,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },

    // 输出
    output: {
      // library 名称
      library: `${microAppConfigManager.config.name}`,

      // 输出的文件名称
      // 如果你要修改此内容，请看一下下面调用 html-webpack-plugin 代码的相关注释
      filename: isProductionEnvironment
        ? `${JS_PREFIX}/[name].[contenthash:8].bundle.js`
        : `${JS_PREFIX}/[name].bundle.js`,

      // 输出文件名称，和 fileName 不同，这里的输出文件为非初始（non-initial）文件，例如我们熟悉的路由懒加载
      chunkFilename: isProductionEnvironment
        ? `${JS_PREFIX}/[name].[contenthash:8].chunk.js`
        : `${JS_PREFIX}/[name].chunk.js`,

      // asset/resource 模块以 [hash][ext][query] 文件名发送到输出目录
      assetModuleFilename: `${FILE_PREFIX}/[name].[hash][ext]`,

      // 公共路径
      publicPath: microAppConfigManager.config.url,

      // 输出 umd 类型的 bundle
      libraryTarget: 'umd',
    },


    plugins: [
      // NormalModuleReplacementPlugin 需要我们传入一个回调
      // 我们可以在这里将默认的公共的 package 级别依赖重定向到 remote(即共享模块)
      // 这个回调已被封装成公共方法，它会从你的 app-config 目录下读取 remote 字段，从中找到匹配的 sharedLibraries
      new NormalModuleReplacementPlugin(
        /(.*)/,
        microAppConfigManager.getNormalModuleReplacementPluginCallBack(),
      ),

      // 输出 html 入口文件
      new HtmlWebpackPlugin({
        template: path.resolve(assetPublicPath, 'index.html'),
      }),

      // qiankun 底层依赖的 import-html-entry 会取所有 scripts 里面排在最后的 script 作为 entry。
      // 具体代码可查看：https://github.com/kuitos/import-html-entry/blob/master/src/index.js#L321
      // 但是我们通过 html-webpack-plugin 导出的 HTML，一般情况下是 main 在最后，但是在 webpack module federation 中，会生成一个额外的 entry 排在 main 的后面。
      // 从而导致拿不到 main 入口的生命周期函数, 我们可以向 script 标签加入 entry 属性解决这个问题
      new AddEntryAttributeWebpackPlugin((src => {
        return !!(src.match(/main\.(.*)\.bundle.js$/) || src.match('main.bundle.js'));
      })),

      // webpack module federation 的插件，其配置基于 app-config 封装，一般无需改动
      new ModuleFederationPlugin({
        name: microAppConfigManager.config.name,
        filename: 'module-federation-entry.js',
        remotes: microAppConfigManager.getModuleFederationRemotes(),
        exposes: getModuleFederationExposes(microAppConfigManager.config.exposes),
      }),

      // 非生产环境下启动 react 热更新插件
      // 注意，如果将代码打包到测试服务器上(非生产环境)，那么也应该开启这个插件以向主应用插入相关胶水代码
      // 由于子应用的 react 是由主应用 share 的，子应用如果需要热更新必须依赖这些胶水代码
      // 另外这需要和 src/utils 目录下的 init-common 配合使用，开发者无需额外处理
      !isProductionEnvironment && new ReactRefreshWebpackPlugin({
        overlay: {
          sockPath: websocketPath,
        },
      }),

      // css 压缩
      isProductionEnvironment && new MiniCssExtractPlugin({
        filename: `${CSS_PREFIX}/${isProductionEnvironment ? '[name].[contenthash].css' : '[name].css'}`,
        chunkFilename: `${CSS_PREFIX}/${isProductionEnvironment ? '[id].[contenthash].css' : '[id].css'}`,
        ignoreOrder: true,
      }),

      // 定义一些全局的变量，例如版本、打包时间、环境信息
      new webpack.DefinePlugin({
        // eslint-disable-next-line import/no-dynamic-require
        __APP_VERSION__: JSON.stringify(require(path.resolve(process.cwd(), 'package.json')).version),
        __MODE__: JSON.stringify(process.env.NODE_ENV?.toUpperCase()),
        __BUILD_TIME__: JSON.stringify(moment().format('MMMM Do YYYY, h:mm:ss A')),
      }),

      // Moment.js 默认情况下它会打包所有的 locale 文件
      // 我们需要用户选择导入特定的区域设置
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),

      // 写入共享模块（非 package）的类型定义
      new EmitMfExposeWebpackPlugin({
        appConfig: microAppConfigManager.config,
        outputBasePath: isBuildMode ? undefined : assetPublicPath,
      }),

      isAnalyzeMode && new BundleAnalyzerPlugin(),
    ].filter(Boolean),

    // 解析配置
    resolve: {
      // 扩展名省略
      extensions: ['.ts', '.tsx', '.js', '.jsx'],

      // 实用 alias
      alias: {
        '~src': sourcePath,
      },
    },

    // 模块解析
    module: {
      rules: [
        {
          oneOf: [
            // babel 相关
            {
              test: [/\.[jt]sx?$/],
              include: [sourcePath],
              use: {
                loader: require.resolve('babel-loader'),
                options: {
                  presets: [
                    [
                      require.resolve('@babel/preset-env'),
                    ],
                    [
                      require.resolve('@babel/preset-react'),
                      {
                        runtime: 'automatic',
                      },
                    ],
                    [
                      require.resolve('@babel/preset-typescript'),
                    ],
                  ],
                  plugins: [
                    [
                      require.resolve('@babel/plugin-proposal-decorators'),
                      {
                        legacy: true,
                      },
                    ],
                    [require.resolve('@babel/plugin-transform-runtime')],
                  ].filter(Boolean),
                },
              },
            },
            // css 预处理相关
            {
              test: [/\.(le|c)ss$/],
              use: [
                isProductionEnvironment ? MiniCssExtractPlugin.loader : require.resolve('style-loader'),
                require.resolve('css-loader'),
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    postcssOptions: {
                      plugins: [
                        require('autoprefixer'),
                      ],
                    },
                  },
                },
                {
                  loader: require.resolve('less-loader'),
                  options: {
                    lessOptions: {
                      javascriptEnabled: true,
                    },
                  },
                },
              ],
            },
            // 其它内容全部以 asset/resource 输出
            {
              exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: 'asset/resource',
            },
          ],
        },
      ],
    },
  };

  // 合并用户自定义的 webpack 配置
  // @ts-ignore
  return merge(config, microAppConfigManager.config.webpackConfig || {});
};
