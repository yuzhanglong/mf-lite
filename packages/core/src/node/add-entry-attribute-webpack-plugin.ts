import webpack from 'webpack';
import { Hooks } from 'html-webpack-plugin';

/**
 * 向 html-webpack-plugin 导出的 HTML 模板 script 添加属性
 *
 * @author yuzhanglong
 * @date 2021-10-10 02:31:52
 */
export class AddEntryAttributeWebpackPlugin {
  private readonly entryMatchCallback;

  constructor(matchCallback: (src: string) => boolean) {
    this.entryMatchCallback = matchCallback;
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap('AddEntryAttributeWebpackPlugin', (compilation) => {
      // 通过最终的 webpack 配置的 plugins 属性，根据插件的 constructor.name 拿到 html-webpack-plugin 实例
      const HtmlWebpackPluginInstance: any = compiler.options.plugins
        .map(({ constructor }) => constructor)
        .find(constructor => constructor && constructor.name === 'HtmlWebpackPlugin');


      if (HtmlWebpackPluginInstance) {
        // 获取 html-webpack-plugin 所有的 hooks
        const hooks = HtmlWebpackPluginInstance.getHooks(compilation) as Hooks;

        // 在插入标签之前做些什么
        hooks.alterAssetTagGroups.tap(
          'AddEntryAttributeWebpackPlugin', (data) => {
            // 拿到所有的标签，如果是 script 标签，并且满足我们的匹配函数，则将其 attributes['entry'] 设为 true
            data.headTags.forEach(tag => {
              if (tag.tagName === 'script' && this.entryMatchCallback(tag.attributes?.src)) {
                // eslint-disable-next-line no-param-reassign
                tag.attributes.entry = true;
              }
            });
            return data;
          },
        );
      }
    });
  }
}
