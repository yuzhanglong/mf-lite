/**
 * File: intl.spec.ts
 * Description: 国际化相关 package 单测
 * Created: 2021-07-29 00:08:55
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import {IntlExecutor, INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE} from "../intl-executor";
import {I18nChunkMap, LANGUAGE_MAP} from "../common";

describe('test intl packages', () => {
  const executor = new IntlExecutor({
    intlSources: I18nChunkMap
  });

  test('test load source data', async () => {
    expect(executor.intlSources).toEqual(I18nChunkMap);
    expect(executor.cachedIntlMessageMaps).toStrictEqual({});

    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh]);
    expect(executor.cachedIntlMessageMaps[LANGUAGE_MAP.zh]).toBeTruthy();
    expect(executor.cachedIntlMessageMaps[LANGUAGE_MAP.en]).toBeFalsy();

    // addition load chunk
    await executor.loadIntlSource([LANGUAGE_MAP.en]);
    expect(executor.cachedIntlMessageMaps[LANGUAGE_MAP.en]).toBeTruthy();
  });

  test('test get intl messages', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh, LANGUAGE_MAP.en]);
    executor.updateCurrentLocal(LANGUAGE_MAP.zh);

    const msg1 = executor.getMessage('App_Name', {
      name: 'yuzhanglong'
    });
    const msg2 = executor.getMessage('App_Age', {
      age: 20
    });

    expect(msg1).toStrictEqual('姓名: yuzhanglong');
    expect(msg2).toStrictEqual('年龄: 20');
  });


  test('test formatter cache', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh, LANGUAGE_MAP.en]);
    executor.updateCurrentLocal(LANGUAGE_MAP.zh);
    expect(executor.currentCachedFormatters).toStrictEqual({});

    executor.getMessage('App_Name', {
      name: 'yuzhanglong'
    });
    expect(executor.currentCachedFormatters.App_Name).toBeTruthy();
  });

  test('test local change', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh, LANGUAGE_MAP.en]);

    executor.updateCurrentLocal(LANGUAGE_MAP.zh);

    const msg1 = executor.getMessage('App_Name', {
      name: 'yuzhanglong'
    });

    expect(msg1).toStrictEqual('姓名: yuzhanglong');

    executor.updateCurrentLocal(LANGUAGE_MAP.en);

    const msg2 = executor.getMessage('App_Name', {
      name: 'yuzhanglong'
    });

    expect(msg2).toStrictEqual('name: yuzhanglong');
  });

  test('Call getMessage() but have not set current local, we should throw an error', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh]);

    try {
      executor.getMessage('App_Name', {
        name: 'yuzhanglong'
      });
    } catch (e) {
      console.log(e);
      expect(e.message).toStrictEqual('please set current local string!');
    }
  });

  test('get message but we set a non-existent key, we return default value', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh, LANGUAGE_MAP.en]);

    executor.updateCurrentLocal(LANGUAGE_MAP.zh);

    const msg = executor.getMessage('bad key', {
      name: 'yuzhanglong'
    });

    expect(msg).toStrictEqual(INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE);
  });

  test('update a new local, but we did not load target source file', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh]);

    try {
      executor.updateCurrentLocal(LANGUAGE_MAP.en);
    } catch (e) {
      expect(e.message).toStrictEqual('local string \'en-US\' was not loaded, did you forget to local intl source file?');
    }
  });

  test('target source fn throw internal error', async () => {
    const executor = new IntlExecutor({
      intlSources: {
        foo: async () => {
          throw new Error('bad intl source!');
        }
      }
    });

    try {
      await executor.loadIntlSource(['foo']);
    } catch (e) {
      expect(e.message).toStrictEqual('bad intl source!');
    }
  });

  test('call loadIntlSource() but intl key does not in the intlSources', async () => {
    try {
      await executor.loadIntlSource('key does not exist!');
    } catch (e) {
      expect(e.message).toStrictEqual('the local \'key does not exist!\' does not have any intl source!\'');
    }
  });
});
