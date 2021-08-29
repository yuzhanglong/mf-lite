/**
 * File: get-mf-exposes.ts
 * Description: 根据配置的目录（src/externals 下）, 生成 webpack module federation 配置
 * Created: 2021-08-29 13:39:40
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

type MfExposesModule = string | {
  path: string
  resolve: string
}

export function getModuleFederationExposes(modules: MfExposesModule[]) {
  const exposes: Record<string, string> = {};
  for (const module of modules) {
    if (typeof module === 'string') {
      const key = `./${module}`;
      exposes[key] = require.resolve(module);
    } else if (typeof module === 'object') {
      exposes[module.path] = module.resolve;
    }
  }
  return exposes;
}
