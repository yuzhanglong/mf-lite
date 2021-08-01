/**
 * File: i18n-babel-plugin.spec.ts
 * Description: babel 插件单侧
 * Created: 2021-08-01 17:31:50
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import I18nBabelPlugin, { PluginOptions } from '@/packages/i18n-babel-plugin';
import { transformSync } from '@babel/core';

describe('test i18n-babel-plugin', () => {
  test('work', () => {
    const example = `
    const Yzl_Test_Name = '111'
intl('Yzl_Test_Name', {})
`;
    const { code } = transformSync(example, {
      filename: 'index.js',
      plugins: [
        [
          I18nBabelPlugin,
          {
            intlKeyPrefix: 'Yzl_test',
          } as PluginOptions,
        ],
      ],
    });
    console.log(code);
  });
});
