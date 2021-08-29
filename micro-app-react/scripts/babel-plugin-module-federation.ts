import { NodePath } from '@babel/core';
import { isImportDeclaration, Program } from '@babel/types';

interface PluginOptions {
  remotes: Record<string, string>;
  moduleAlias: Record<string, string>;
}

function babelPluginTransformImport(api: any, options: PluginOptions) {
  const pluginInstance = {
    visitor: {
      Program: {
        exit(path: NodePath<Program>) {
          const { body } = path.node;
          for (const bodyElement of body) {
            if (isImportDeclaration(bodyElement)) {
              // console.log(bodyElement);
            }
          }
        },
      },
    },
  };
  return pluginInstance;
}

export default babelPluginTransformImport;
