/**
 * File: intl-pool-executor.spec.ts
 * Description: intl-pool-executor.spec.ts 单测
 * Created: 2021-07-31 11:06:42
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import { IntlPoolExecutor } from '@/packages/intl/intl-pool-executor';
import { LANGUAGE_MAP } from '@/packages/intl/common';

describe('test intl-pool-executor', () => {
  test('test init', () => {
    const executor = new IntlPoolExecutor();
    expect(executor.intlGroups).toStrictEqual([]);
    expect(executor.currentLocal).toStrictEqual('');
  });

  test('test register intl source', () => {
    const executor = new IntlPoolExecutor();
    expect(executor.intlGroups.length).toStrictEqual(0);

    executor.register('group 1', {
      [LANGUAGE_MAP.zh]: () => import('@/packages/intl/data/zh-cn.json')
    });
    expect(executor.intlGroups.length).toStrictEqual(1);

    // 注册的文案组并没有激活，需要手动处理
    expect(executor.intlGroups[0].isActive).toBeFalsy();
  });

  test('test unregister intl source', () => {
    const executor = new IntlPoolExecutor();
    executor.register('group 1', {
      [LANGUAGE_MAP.zh]: () => import('@/packages/intl/data/zh-cn.json')
    });
    expect(executor.intlGroups.length).toStrictEqual(1);

    executor.unregister('group 1');
    expect(executor.intlGroups.length).toStrictEqual(0);
  });

  test('test getMessage() and try to change local', async () => {
    const executor = new IntlPoolExecutor();

    await executor.setLocal(LANGUAGE_MAP.zh);

    await executor
      .register('group 1', {
        [LANGUAGE_MAP.zh]: () => import('@/packages/intl/data/zh-cn.json'),
        [LANGUAGE_MAP.en]: () => import('@/packages/intl/data/en-us.json')

      })
      .activate('group 1');

    expect(executor.getMessage('App_Name', {
      name: 'yuzhanglong'
    })).toStrictEqual('姓名: yuzhanglong');

    await executor.setLocal(LANGUAGE_MAP.en);

    expect(executor.getMessage('App_Name', {
      name: 'yuzhanglong'
    })).toStrictEqual('name: yuzhanglong');
  });

  test('test register intl group that more than one', async () => {
    const executor = new IntlPoolExecutor();

    await executor.setLocal(LANGUAGE_MAP.zh);

    await executor
      .register('group 1', {
        [LANGUAGE_MAP.zh]: () => import('@/packages/intl/data/zh-cn.json'),
        [LANGUAGE_MAP.en]: () => import('@/packages/intl/data/en-us.json')

      })
      .activate('group 1');

    await executor.register('group 2', {
      [LANGUAGE_MAP.zh]: () => import('@/packages/intl/data/zh-cn-part-2.json'),
      [LANGUAGE_MAP.en]: () => import('@/packages/intl/data/en-us-part-2.json')
    }).activate('group 2');

    expect(executor.getMessage('App_Name', {
      name: 'yuzhanglong'
    })).toStrictEqual('姓名: yuzhanglong');

    expect(executor.getMessage('Your_Hobby', {
      hobby: 'coding'
    })).toStrictEqual('爱好: coding');

    // 改变语言
    await executor.setLocal(LANGUAGE_MAP.en);
    expect(executor.getMessage('App_Name', {
      name: 'yuzhanglong'
    })).toStrictEqual('name: yuzhanglong');

    expect(executor.getMessage('Your_Hobby', {
      hobby: 'coding'
    })).toStrictEqual('hobby: coding');
  });

  test('test deactivate a group that has registered', async () => {
    const executor = new IntlPoolExecutor();

    await executor.setLocal(LANGUAGE_MAP.zh);

    await executor
      .register('group 1', {
        [LANGUAGE_MAP.zh]: () => import('@/packages/intl/data/zh-cn.json'),

      })
      .activate('group 1');

    await executor.register('group 2', {
      [LANGUAGE_MAP.zh]: () => import('@/packages/intl/data/zh-cn-part-2.json'),
    }).activate('group 2');

    expect(executor.getMessage('App_Name', {
      name: 'yuzhanglong'
    })).toStrictEqual('姓名: yuzhanglong');

    expect(executor.getMessage('Your_Hobby', {
      hobby: 'coding'
    })).toStrictEqual('爱好: coding');

    // 销毁 group 1， 我们接下来无法通过 App_Name 这个key 获取文案
    executor.deactivate('group 1');

    expect(() => {
      executor.getMessage('App_Name', {
        name: 'yuzhanglong'
      });
    }).toThrowError('the key \'App_Name\' was not found!');

    // deactivate 不是将文案组从文案池中移除
    expect(executor.intlGroups.length).toStrictEqual(2);
  });
});

