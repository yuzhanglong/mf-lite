/**
 * File: intl.spec.ts
 * Description: 国际化相关 package 单测
 * Created: 2021-07-29 00:08:55
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import {IntlExecutor} from "../intl-executor";
import {I18nChunkMap, LANGUAGE_MAP} from "../utils";

describe('test intl packages', () => {
  test('test load source data', async () => {
    const executor = new IntlExecutor({
      intlSources: I18nChunkMap
    })

    expect(executor.intlSources).toEqual(I18nChunkMap)
    expect(executor.cachedIntlMessageMaps).toStrictEqual({})

    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh])
    expect(executor.cachedIntlMessageMaps[LANGUAGE_MAP.zh]).toBeTruthy()
    expect(executor.cachedIntlMessageMaps[LANGUAGE_MAP.en]).toBeFalsy()

    // addition load chunk
    await executor.loadIntlSource([LANGUAGE_MAP.en])
    expect(executor.cachedIntlMessageMaps[LANGUAGE_MAP.en]).toBeTruthy()
  })

  test('test get intl messages', async () => {
    const executor = new IntlExecutor({
      intlSources: I18nChunkMap
    })

    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh, LANGUAGE_MAP.en])
    executor.updateCurrentLocal(LANGUAGE_MAP.zh)

    const msg1 = executor.getMessage('App_Name', {
      name: 'yuzhanglong'
    })
    const msg2 = executor.getMessage('App_Age', {
      age: 20
    })

    expect(msg1).toStrictEqual('姓名: yuzhanglong')
    expect(msg2).toStrictEqual('年龄: 20')
  })
});
