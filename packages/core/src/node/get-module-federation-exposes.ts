/**
 * File: get-mf-exposes.ts
 * Description: 根据配置的目录（src/externals 下）, 生成 webpack module federation 配置
 * Created: 2021-08-29 13:39:40
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import { CachedInputFileSystem, ResolverFactory } from 'enhanced-resolve';
import * as fs from 'fs';

type MfExposesModule = string | {
  name: string;
  path: string;
}

const myResolver = ResolverFactory.createResolver({
  fileSystem: new CachedInputFileSystem(fs, 4000),
  conditionNames: ['node'],
  extensions: ['.js', '.json', '.node'],
  useSyncFileSystemCalls: true,
  mainFields: ['esm', 'module', 'main'],
});

export function getModuleFederationExposes(modules: MfExposesModule[]) {
  const exposes: Record<string, string> = {};
  for (const module of modules) {
    if (typeof module === 'string') {
      const key = `./${module}`;

      const resolveResult = myResolver.resolveSync({}, process.cwd(), module);

      if (typeof resolveResult !== 'string') {
        throw new Error(`resolve error: ${module}`);
      }

      exposes[key] = resolveResult;
    } else if (typeof module === 'object') {
      exposes[`./${module.name}`] = module.path;
    }
  }
  return exposes;
}
