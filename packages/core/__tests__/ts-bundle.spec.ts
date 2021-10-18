/**
 * File: ts-bundle.spec.ts
 * Description: typescript 类型定义打包工具封装
 * Created: 2021-10-01 14:25:20
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import * as path from 'path';
import * as fs from 'fs';
import { bundleModuleDeclare, bundleTsDeclaration } from '../src';

describe('test ts-bundle utils', () => {
  const p = path.resolve(__dirname, 'assets');

  test('test dts bundle generator wrapper', async () => {
    await bundleTsDeclaration([
      {
        entryPath: path.resolve(p, 'bar.ts'),
        outputPath: path.resolve(p, 'bar-tmp.d.ts'),
      },
      {
        entryPath: path.resolve(p, 'foo.ts'),
        outputPath: path.resolve(p, 'foo-tmp.d.ts'),
      },
    ]);

    expect(fs.readFileSync(path.resolve(p, 'bar-tmp.d.ts')).toString()).toMatchSnapshot();
    expect(fs.readFileSync(path.resolve(p, 'foo-tmp.d.ts')).toString()).toMatchSnapshot();
  }, 20000);

  test('test bundleModuleDeclare', () => {
    const content = bundleModuleDeclare([
      {
        moduleName: 'app1/foo',
        path: path.resolve(p, 'foo-tmp.d.ts'),
      },
      {
        moduleName: 'app1/bar',
        path: path.resolve(p, 'bar-tmp.d.ts'),
      },
    ]);
    expect(content).toMatchSnapshot();
  });
});
