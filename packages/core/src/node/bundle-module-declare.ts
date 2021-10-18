import { ModuleDeclarationKind, Project, SyntaxKind } from 'ts-morph';

export interface FileOptions {
  // 声明文件路径
  path: string;

  // 声明文件模块名称
  moduleName: string;
}

/**
 * 打包类型定义文件
 *
 * @author yuzhanglong
 * @date 2021-10-03 19:28:19
 * @param fileOptions 文件相关选项，可参考上面的类型定义
 */
export const bundleModuleDeclare = (fileOptions: FileOptions[]) => {
  const project = new Project();

  const content = [];

  fileOptions.forEach(file => {
    // 添加源代码
    const source = project.addSourceFileAtPath(file.path);

    // 遍历每一个子节点，如果是 SyntaxKind.DeclareKeyword（即 declare 关键词），进行文本替换
    source.forEachDescendant(item => {
      if (item.getKind() === SyntaxKind.DeclareKeyword) {
        // 删除即可, 需要判断是不是第一个节点，否则会报异常
        item.replaceWithText(item.isFirstNodeOnLine() ? 'export' : '');
      }
    });

    // 备份根节点
    const baseStatements = source.getStructure().statements;

    // 移除现存的所有节点
    source.getStatements().forEach(res => res.remove());

    // 创建一个 module declaration，将上面备份的根节点插入之
    source.addModule({
      name: `'${file.moduleName}'`,
      declarationKind: ModuleDeclarationKind.Module,
      hasDeclareKeyword: true,
      statements: baseStatements,
    });

    // 格式化代码
    source.formatText();

    // 补充一些注释
    content.push(`// module name: ${file.moduleName}\n\n`);
    content.push(source.getText());
    content.push('\n');
  });

  return content.join('');
};
