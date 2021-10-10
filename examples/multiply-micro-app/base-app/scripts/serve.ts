import { getMicroAppWebpackConfig, webpackServe } from '@attachments/module-federation-toolkits';
import merge from 'webpack-merge';
import * as webpack from 'webpack';
import appConfig from '../app-config';

class AddEntryAttributeWebpackPlugin {
  private readonly entryMatchCallback;

  constructor(matchCallback: (src: string) => boolean) {
    this.entryMatchCallback = matchCallback;
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap('AddEntryAttributeWebpackPlugin', (compilation) => {
      const HtmlWebpackPluginInstance = compiler.options.plugins
        .map(({ constructor }) => constructor)
        .find(constructor => constructor && constructor.name === 'HtmlWebpackPlugin');

      if (HtmlWebpackPluginInstance) {
        const hooks = (HtmlWebpackPluginInstance as any).getHooks(compilation).alterAssetTagGroups;
        hooks.tap(
          'AddEntryAttributeWebpackPlugin',
          (data) => {
            data.headTags.forEach(tag => {
              if (tag.tagName === 'script' && this.entryMatchCallback(tag.attributes?.src)) {
                // eslint-disable-next-line no-param-reassign
                tag.attributes.entry = true;
              }
            });
          }
        );
      }
    });
  }
}

const serve = async () => {
  const config = getMicroAppWebpackConfig({
    appConfig: appConfig,
    port: 8080,
    type: 'base',
    isBuildMode: false,
    isAnalyzeMode: false
  });

  // @ts-ignore
  const cfg = merge(config, {
    plugins: [
      new AddEntryAttributeWebpackPlugin((src) => {
        return !!(src.match(/^main\.(.*)\.bundle.js$/) || src.match('main.bundle.js'));
      })
    ]
  });

  await webpackServe(cfg);
};

serve().catch(e => console.log(e));
