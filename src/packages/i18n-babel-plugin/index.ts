import { NodePath, PluginObj } from '@babel/core';
import { ObjectExpression, StringLiteral } from '@babel/types';

export interface PluginOptions {
  intlKeyPrefix: string;
  include: RegExp;
}

function I18nBabelPlugin(api: any, options: PluginOptions) {
  const { intlKeyPrefix } = options;

  const cnt = 0;

  const pluginInstance: PluginObj = {
    visitor: {
      StringLiteral(path: NodePath<StringLiteral>) {
        const {
          node: {
            value: stringValue,
          },
          parentPath: {
            scope: parentScope,
            type: parentType,
          },
        } = path;

        // 是否被父节点的 intl 方法调用
        const isParentIntlCallExpression = parentType === 'CallExpression';

        // 该字符串匹配了 options 中给予的 prefix
        const isValueStartWithProvidedIntlPrefix = stringValue.startsWith(intlKeyPrefix);

        // 该字符串父级的作用域中有变量优先级高于全局
        const isParentScopeHasIntlBinding = parentScope.hasBinding('intl');
        if (isParentIntlCallExpression && isValueStartWithProvidedIntlPrefix && !isParentScopeHasIntlBinding) {
          const newKeyStr = `$${(cnt + 1).toString()}`;
          path.addComment('leading', `{ "oldKey": "${stringValue}", "newKey": "${newKeyStr}" }`);

          // 使用压缩过的新 key 替换节点
          path.replaceWithSourceString(`'${newKeyStr}'`);
        }
      }
    },
  };
  return pluginInstance;
}

export default I18nBabelPlugin;
