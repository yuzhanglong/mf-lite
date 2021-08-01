import { Compiler } from 'webpack';

const PLUGIN_NAME = 'I18nWebpackPlugin';

export class I18nWebpackPlugin {
  public mapOldKeysToCurrentKey = new Map<string, string>();

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
      const handler = (parser) => {
        parser.hooks.program.tap('ChunkI18nPlugin', (ast, comments) => {
          for (const { value: commentValue } of (comments)) {
            if ((commentValue as string).startsWith('{ "oldKey":')) {
              const { oldKey, newKey } = JSON.parse(commentValue);
              this.mapOldKeysToCurrentKey.set(oldKey, newKey);
            }
          }
        });
      };

      normalModuleFactory.hooks.parser
        .for('javascript/auto')
        .tap('ChunkI18nPlugin', handler);
      normalModuleFactory.hooks.parser
        .for('javascript/dynamic')
        .tap('ChunkI18nPlugin', handler);
      normalModuleFactory.hooks.parser
        .for('javascript/esm')
        .tap('ChunkI18nPlugin', handler);
    });

    // make hooks, 在 compilation 结束之前执行
    compiler.hooks.make.tap('make', (compilation) => {
      // 处理资源的 hook
      compilation.hooks.processAssets.tap('ChunkI18nPlugin', (assets) => {
        for (const [k, v] of Object.entries(assets)) {
          if (k.startsWith('i18n')) {
            const { children } = (v as any).listMap();
            for (const child of children) {
              const code: string = child.generatedCode;
              const matchRes = code.match(/(JSON.parse\(')(.*)('\))/);
              if (matchRes) {
                child.generatedCode = this.transformSource(matchRes);
              }
            }
          }
        }
      });
    });
  }

  transformSource(source: RegExpMatchArray) {
    // 匹配到的第三位(index = 2)为具体内容
    const content = source[2];
    // 将结果转换成对象以供转换
    const intlObj = JSON.parse(content);
    const result = {};
    for (const item of this.mapOldKeysToCurrentKey.entries()) {
      const [oldKey, newKey] = item;
      const valueInChunk = intlObj[oldKey];
      if (valueInChunk) {
        result[newKey] = valueInChunk;
      }
    }
    return `module.exports = JSON.parse('${JSON.stringify(result)}');`;
  }
}
