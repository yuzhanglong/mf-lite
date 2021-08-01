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

    expect(executor.getMessage('Yzl_test_Name', {
      name: 'yuzhanglong'
    })).toStrictEqual('姓名: yuzhanglong');

    await executor.setLocal(LANGUAGE_MAP.en);

    expect(executor.getMessage('Yzl_test_Name', {
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

    expect(executor.getMessage('Yzl_test_Name', {
      name: 'yuzhanglong'
    })).toStrictEqual('姓名: yuzhanglong');

    expect(executor.getMessage('Yzl_test_Hobby', {
      hobby: 'coding'
    })).toStrictEqual('爱好: coding');

    // 改变语言
    await executor.setLocal(LANGUAGE_MAP.en);
    expect(executor.getMessage('Yzl_test_Name', {
      name: 'yuzhanglong'
    })).toStrictEqual('name: yuzhanglong');

    expect(executor.getMessage('Yzl_test_Hobby', {
      hobby: 'coding'
    })).toStrictEqual('hobby: coding');
  });

  test('test deactivate a group that has registered', async () => {
    const executor = new IntlPoolExecutor();

    await executor.setLocal(LANGUAGE_MAP.zh);

    await executor
      .register('group 1', {
        [LANGUAGE_MAP.zh]: () => import('@/packages/intl/data/zh-cn.json')

      })
      .activate('group 1');

    await executor.register('group 2', {
      [LANGUAGE_MAP.zh]: () => import('@/packages/intl/data/zh-cn-part-2.json')
    }).activate('group 2');

    expect(executor.getMessage('Yzl_test_Name', {
      name: 'yuzhanglong'
    })).toStrictEqual('姓名: yuzhanglong');

    expect(executor.getMessage('Yzl_test_Hobby', {
      hobby: 'coding'
    })).toStrictEqual('爱好: coding');

    // 销毁 group 1， 我们接下来无法通过 Yzl_test_Name 这个key 获取文案
    executor.deactivate('group 1');

    expect(() => {
      executor.getMessage('Yzl_test_Name', {
        name: 'yuzhanglong'
      });
    }).toThrowError('the key \'Yzl_test_Name\' was not found!');

    // deactivate 不是将文案组从文案池中移除
    expect(executor.intlGroups.length).toStrictEqual(2);
  });

  test('test unregister group that not exist, we should log warning', () => {
    console.warn = jest.fn();
    const executor = new IntlPoolExecutor();
    executor.unregister('not exist!');
    expect(console.warn).toBeCalledWith('intl group \'not exist!\' not found!');
  });

  test('test deactivate group that not exist, we should log warning', () => {
    console.warn = jest.fn();
    const executor = new IntlPoolExecutor();
    executor.deactivate('not exist!');
    expect(console.warn).toBeCalledWith('intl group \'not exist!\' not found!');
  });

  test('test activate group that not exist, we should log warning', async () => {
    console.warn = jest.fn();
    const executor = new IntlPoolExecutor();
    await executor.activate('not exist!');
    expect(console.warn).toBeCalledWith('intl group \'not exist!\' not found!');
  });

  test('test register the same group', async () => {
    console.warn = jest.fn();
    const executor = new IntlPoolExecutor();
    await executor.register('aaa', {});
    await executor.register('aaa', {});
    expect(console.warn).toBeCalledWith('message group \'aaa\' has been registered!');
  });

  test('test getMessage, but we did not set current local', () => {
    const executor = new IntlPoolExecutor();
    expect(() => {
      executor.getMessage('test', {});
    }).toThrowError('your should set local string at first!');
  });


  test('test setLocal will not update unactivated intl group', async () => {
    const executor = new IntlPoolExecutor();

    await executor.setLocal(LANGUAGE_MAP.zh);

    await executor
      .register('group 1', {
        [LANGUAGE_MAP.zh]: () => import('@/packages/intl/data/zh-cn.json'),
        [LANGUAGE_MAP.en]: () => import('@/packages/intl/data/en-us.json')
      })
      .activate('group 1');

    expect(executor.getMessage('Yzl_test_Name', {
      name: 'yzl'
    })).toStrictEqual('姓名: yzl');

    executor.deactivate('group 1');

    await executor.setLocal(LANGUAGE_MAP.en);
    // 未激活的其内部 local 不会更新
    expect(executor.intlGroups[0].intlGroup.currentLocal).toStrictEqual(LANGUAGE_MAP.zh);
  });
});

