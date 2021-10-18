import webpack from 'webpack';
import * as path from 'path';
import { MicroAppConfig } from './micro-fe-app-config';
import { emitMfExposeDeclaration } from './emit-mf-expose-declaration';


interface EmitMfExposeWebpackPluginOptions {
  // app 配置
  appConfig: MicroAppConfig;

  // 输出内容的基础路径，如果没有指定则为 compilation.compiler.outputPath
  // 由于 serve 模式 build 模式输出位置不同，这个选项是有必要的，降低开发成本
  outputBasePath?: string;
}

/**
 * 向 build 打包产物注入类型定义的 webpack-plugin
 *
 * @author yuzhanglong
 * @date 2021-10-03 19:31:02
 */
export class EmitMfExposeWebpackPlugin {
  private readonly config: EmitMfExposeWebpackPluginOptions;

  constructor(config: EmitMfExposeWebpackPluginOptions) {
    this.config = config;
  }

  apply(compiler: webpack.Compiler) {
    const { appConfig, outputBasePath } = this.config;

    // TODO: 使用文件 hash 进行缓存，避免相同的内容重复打包，可以参考下面的的注释 DEMO
    // compiler.hooks.thisCompilation.tap('EmitMfExposeWebpackPlugin', (compilation) => {
    //   compilation.hooks.processAssets.tapAsync({
    //     name: 'EmitMfExposeWebpackPlugin',
    //     stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
    //   }, (compilationAssets, callback) => {
    //     // 首先收集所有的文件，进行 content hash 值比对
    //     // @ts-ignore
    //     const data = [...compilation.modules].filter(res => res.request && res.request.includes('shared-utils.ts'))[0];
    //     console.log(data.buildInfo);
    //     return callback();
    //   });
    // });

    // afterEmit 生命周期的时机：输出 asset 到 output 目录之后
    // 实践证明，它不会阻塞 webpack dev-server 的流程，不会影响开发体验。
    compiler.hooks.afterEmit.tap('EmitMfExposeWebpackPlugin', async (compilation) => {
      if (appConfig) {
        // 拿到本项目的 outputPath
        const { outputPath } = compilation.compiler;
        // 生成相关目录
        const target = path.resolve(outputBasePath ?? outputPath, 'mf-expose-types');
        console.log('[mf-lite] compiling shared remote module declarations...');

        // 基于用户的配置 appConfig 生成类型定义
        await emitMfExposeDeclaration(appConfig, target);
      }
    });
  }
}
