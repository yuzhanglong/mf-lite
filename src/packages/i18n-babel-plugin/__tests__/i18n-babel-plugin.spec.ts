/**
 * File: i18n-babel-plugin.spec.ts
 * Description: babel 插件单侧
 * Created: 2021-08-01 17:31:50
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import I18nBabelPlugin, { PluginOptions } from '@/packages/i18n-babel-plugin';
import { transformSync } from '@babel/core';

const getParsedCode = (code: string) => {
  return transformSync(code, {
    filename: 'index.js',
    plugins: [
      [
        '@babel/plugin-transform-typescript',
      ],
      [
        I18nBabelPlugin,
        {
          intlKeyPrefix: 'Yzl_Test',
        } as PluginOptions,
      ],
    ],
  }).code;
};

describe('test i18n-babel-plugin', () => {
  test('intl 方法 + 字符串直接调用，在其中没有字符串拼接和模板字符串，形如 intl(\'my-str\', {})', () => {
    const example = `intl('Yzl_Test_Name', {})`;
    expect(getParsedCode(example)).toStrictEqual(`"use strict";

intl(
/*{ "oldKey": "Yzl_Test_Name", "newKey": "$1" }*/
'$1', {});`);
  });

  test('顺着作用域链查找到的不是 window 上的 intl 方法, 不应该进行处理', () => {
    const example1 = `
    const intl = () => {}
    intl('Yzl_Test_Ok', {})
    `;

    expect(getParsedCode(example1)).toStrictEqual(`"use strict";

var intl = function intl() {};

intl('Yzl_Test_Ok', {});`);
  });


  test('兼容输出的 var 声明提升, 不应该进行处理', () => {
    const example = `
    intl('Yzl_Test_Ok', {})
    const intl = () => {}
    `;

    expect(getParsedCode(example)).toStrictEqual(`"use strict";

intl('Yzl_Test_Ok', {});

var intl = function intl() {};`);
  });

  test('处理三元表达式', () => {
    const example = `
    intl(isOk ? 'Yzl_Test_Ok' : 'Yzl_Test_No', {});
    `;

    expect(getParsedCode(example)).toStrictEqual(`"use strict";

intl(isOk ?
/*{ "oldKey": "Yzl_Test_Ok", "newKey": "$1" }*/
'$1' :
/*{ "oldKey": "Yzl_Test_No", "newKey": "$2" }*/
'$2', {});`);

    const example2 = `
    const result = isOk ? intl('Yzl_Test_Ok') :  intl('Yzl_Test_No');
    `;
    expect(getParsedCode(example2)).toStrictEqual(`"use strict";

var result = isOk ? intl(
/*{ "oldKey": "Yzl_Test_Ok", "newKey": "$1" }*/
'$1') : intl(
/*{ "oldKey": "Yzl_Test_No", "newKey": "$2" }*/
'$2');`);
  });

  test('测试 intl 中的常量应用', () => {
    const code = `
    const OK = 'Yzl_Test_Ok'
    intl(OK, {})
    `;

    expect(getParsedCode(code)).toStrictEqual(`"use strict";

var OK =
/*{ "oldKey": "Yzl_Test_Ok", "newKey": "Yzl_Test_Ok" }*/
'Yzl_Test_Ok';
intl(OK, {});`);
  });
});
