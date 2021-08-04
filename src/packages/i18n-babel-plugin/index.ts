import { NodePath, PluginObj, Node } from '@babel/core';
import { StringLiteral } from '@babel/types';

export interface PluginOptions {
  intlKeyPrefix: string;
  include: RegExp;
}

type StringLiteralPath = NodePath<StringLiteral>

function createIntlKeyCommentManager() {
  let count = 0;

  const addComment = (path: StringLiteralPath, oldKey: string, compress = true) => {
    const newKeyStr = `$${(count + 1).toString()}`;
    path.addComment('leading', `{ "oldKey": "${oldKey}", "newKey": "${compress ? newKeyStr : oldKey}" }`);

    count += 1;
    // 使用压缩过的新 key 替换节点
    if (compress) {
      path.replaceWithSourceString(`'${newKeyStr}'`);
    }
  };

  return {
    addComment,
  };
}

// intl 方法 + 字符串直接调用，在其中没有字符串拼接和模板字符串，形如 intl('my-str', {})
function isCallByIntlMethodDirectly(path: NodePath<Node>) {
  const { parent } = path;
  // 1. 父亲节点的类型是否为 CallExpression 且名字是 intl
  const isParentIntlCallExpression = parent.type === 'CallExpression';

  // 2. 全局变量名是否符合我们的要求
  // @ts-ignore
  const isCalleeNamedIntl = parent?.callee?.name === 'intl';

  return isParentIntlCallExpression && isCalleeNamedIntl;
}

function isCallByConditionalExpression(path: StringLiteralPath) {
  const { parent, parentPath } = path;
  // 父表达式是否为三元表达式
  if (!(parent.type === 'ConditionalExpression')) {
    return false;
  }

  // 是否由 intl 方法直接调用
  return isCallByIntlMethodDirectly(parentPath);
}

function I18nBabelPlugin(api: any, options: PluginOptions) {
  const { intlKeyPrefix } = options;

  const addCommentManager = createIntlKeyCommentManager();

  const pluginInstance: PluginObj = {
    visitor: {
      StringLiteral(path: StringLiteralPath) {
        const {
          node: {
            value: stringValue,
          },
        } = path;

        // 该字符串匹配了 options 中给予的 prefix
        const isValueStartWithProvidedIntlPrefix = stringValue.startsWith(intlKeyPrefix);
        // 除了全局以外，其作用域内没有 intl
        const isParentScopeHasIntlBinding = path.scope.hasBinding('intl');

        if (isValueStartWithProvidedIntlPrefix && !isParentScopeHasIntlBinding) {
          if (isCallByIntlMethodDirectly(path)) {
            addCommentManager.addComment(path, stringValue);
          } else if (isCallByConditionalExpression(path)) {
            addCommentManager.addComment(path, stringValue);
          } else {
            // 如果只是字符串中包含 prefix，例如将 key 赋值给了一个常量、把 key 放在对象中
            // 为了打包不出错，我们会在产物中保留这些 key
            // 但最佳实践应该是上面两种情况，事实上在实际开发过程中上面两种情况已经足够
            addCommentManager.addComment(path, stringValue, false);
          }
        }
      },
    },
  };
  return pluginInstance;
}

export default I18nBabelPlugin;
