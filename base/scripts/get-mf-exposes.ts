/**
 * File: get-mf-exposes.ts
 * Description: 根据配置的目录（src/externals 下）, 生成 webpack module federation 配置
 * Created: 2021-08-29 13:39:40
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */
import * as fs from 'fs-extra';
import * as path from 'path';
import { externalPath } from './path';

export function getMfExposes() {
  const files = fs.readdirSync(externalPath);
  const exposes: Record<string, string> = {};

  for (const p of files) {
    const fileNameTmp = p.split('.');
    // 去除分割后的后缀名
    fileNameTmp.pop();
    const exposeName = fileNameTmp.join('.');

    const exposeKey = `./${exposeName}`;
    const exposeValue = path.resolve(externalPath, exposeName);
    exposes[exposeKey] = exposeValue;
  }
  return exposes;
}
