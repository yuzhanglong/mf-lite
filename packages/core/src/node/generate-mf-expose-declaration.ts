/**
 * 生成 module federation expose 声明，一般用于消费者调用
 *
 * @author yuzhanglong
 * @date 2021-10-02 14:53:24
 */
import axios from 'axios';
import * as url from 'url';
import * as fs from 'fs-extra';
import * as path from 'path';
import { MicroAppConfig } from './micro-fe-app-config';
import { sourcePath } from '../common/paths';

export const generateMfExposeDeclaration = async (appConfig: MicroAppConfig) => {
  const declareTypeRoot = path.resolve(sourcePath, 'types', 'mf-remotes');
  await fs.ensureDir(declareTypeRoot);

  for (const { name, url: remoteUrl } of appConfig.remotes) {
    const targetFileName = `${name}-exposes.d.ts`;
    // example: https://base-40kkvlqeq-yzl.vercel.app/mf-expose-types/exposes.d.ts
    const remote = url.resolve(remoteUrl, 'mf-expose-types/exposes.d.ts');
    console.log(`fetching remotes types declarations from ${remote}...`);
    const declarations = await axios.get(remote);
    await fs.writeFile(path.resolve(declareTypeRoot, targetFileName), declarations.data);
  }

  console.log('Done!');
};
