/**
 * File: intl.spec.ts
 * Description: 国际化相关 package 单测
 * Created: 2021-07-29 00:08:55
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import { IntlExecutor } from '../intl-executor';
import { I18nChunkMap, INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE, LANGUAGE_MAP } from '../common';

describe('test intl packages', () => {
  let executor = null;
  beforeEach(() => {
    executor = new IntlExecutor({
      intlSources: I18nChunkMap,
    });
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
    await executor.updateCurrentLocal(LANGUAGE_MAP.zh);

    const msg1 = executor.getMessage('App_Name', {
      name: 'yuzhanglong',
    });
    const msg2 = executor.getMessage('App_Age', {
      age: 20,
    });

    expect(msg1).toStrictEqual('姓名: yuzhanglong');
    expect(msg2).toStrictEqual('年龄: 20');
  });


  test('test formatter cache', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh, LANGUAGE_MAP.en]);
    await executor.updateCurrentLocal(LANGUAGE_MAP.zh);
    expect(executor.currentCachedFormatters).toStrictEqual({});

    executor.getMessage('App_Name', {
      name: 'yuzhanglong',
    });
    expect(executor.currentCachedFormatters.App_Name).toBeTruthy();
  });

  test('test local change', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh, LANGUAGE_MAP.en]);

    await executor.updateCurrentLocal(LANGUAGE_MAP.zh);

    const msg1 = executor.getMessage('App_Name', {
      name: 'yuzhanglong',
    });

    expect(msg1).toStrictEqual('姓名: yuzhanglong');

    await executor.updateCurrentLocal(LANGUAGE_MAP.en);

    const msg2 = executor.getMessage('App_Name', {
      name: 'yuzhanglong',
    });

    expect(msg2).toStrictEqual('name: yuzhanglong');
  });

  test('call getMessage() but have not set current local, we should throw an error', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh]);

    try {
      executor.getMessage('App_Name', {
        name: 'yuzhanglong',
      });
    } catch (e) {
      expect(e.message).toStrictEqual('please set current local string by calling updateCurrentLocal()!');
    }
  });

  test('get message but we set a non-existent key, we return default value', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh, LANGUAGE_MAP.en]);

    await executor.updateCurrentLocal(LANGUAGE_MAP.zh);

    const msg = executor.getMessage('bad key', {
      name: 'yuzhanglong',
    });

    expect(msg).toStrictEqual(INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE);
  });

  test('update a new local, but we did not load target source file', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh]);

    try {
      await executor.updateCurrentLocal(LANGUAGE_MAP.en);
    } catch (e) {
      expect(e.message).toStrictEqual('local string \'en-US\' was not loaded, did you forget to local intl source file?');
    }
  });

  test('target source fn throw internal error', async () => {
    const executor = new IntlExecutor({
      intlSources: {
        foo: async () => {
          throw new Error('bad intl source!');
        },
      },
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

  test('test updateIntlSources()', async () => {
    // not override
    executor.updateIntlSources({
      [LANGUAGE_MAP.zh]: () => import(/* webpackChunkName: "i18n.zh-cn" */ "@/packages/intl/data/zh-cn.json"),
    }, false);
    expect(Object.keys(executor.intlSources).length).toStrictEqual(2);

    // override
    executor.updateIntlSources({
      [LANGUAGE_MAP.en]: () => import(/* webpackChunkName: "i18n.en-us" */ "@/packages/intl/data/en-us.json")
    }, true);
    expect(Object.keys(executor.intlSources).length).toStrictEqual(1);
  });

  test('call updateCurrentLocal(), the new local is same as currentLocal, we will not do anything', async () => {
    // load chunks
    await executor.loadIntlSource([LANGUAGE_MAP.zh]);
    await executor.updateCurrentLocal(LANGUAGE_MAP.zh);

    const oldFormatter = executor.currentCachedFormatters;
    await executor.updateCurrentLocal(LANGUAGE_MAP.zh);
    const newFormatter = executor.currentCachedFormatters;

    // 如果新旧 formatter 相同，说明他们是同一个实例，也就是说 updateCurrentLocal 并没用重复初始化 formatter
    expect(oldFormatter === newFormatter).toBeTruthy();
  });

  test('call updateCurrentLocal(), and set loadWhenNotFound tobe truthy', async () => {
    // load chunks
    await executor.updateCurrentLocal(LANGUAGE_MAP.zh, true);
    expect(executor.cachedIntlMessageMaps[LANGUAGE_MAP.zh]).toBeTruthy();
  });
});
