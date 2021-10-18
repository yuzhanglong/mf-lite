import { getMicroAppConfigManager } from '../src';

describe('test the micro application Config configuration library', () => {
  test('test getModuleFederationRemotes()', () => {
    const manager = getMicroAppConfigManager({
      name: 'my_app',
      url: 'www.base.com',
      remotes: [
        {
          name: 'app1',
          url: 'www.app1.com',
          sharedLibraries: [],
        },
        {
          name: 'app2',
          url: 'www.app2.com',
        },
      ],
      exposes: [],
    });

    expect(manager.getModuleFederationRemotes())
      .toStrictEqual({
        'app1': 'app1@www.app1.com/module-federation-entry.js',
        'app2': 'app2@www.app2.com/module-federation-entry.js',
      });
  });

  test('test getNormalModuleReplacementPluginCallBack()', () => {
    const manager = getMicroAppConfigManager({
      name: 'my_app',
      url: 'www.base.com',
      remotes: [
        {
          name: 'app1',
          url: 'www.app1.com',
          sharedLibraries: [
            'react',
          ],
        },
        {
          name: 'app2',
          url: 'www.app2.com',
          sharedLibraries: [
            'mobx',
            {
              name: 'global-store',
              type: 'module',
            },
            {
              name: 'foo',
              type: 'package',
            },
          ],
        },
      ],
      exposes: [],
    });

    const cb = manager.getNormalModuleReplacementPluginCallBack();

    const runCb = (name: string) => {
      const item = {
        request: name,
      };
      cb(item);
      return item.request;
    };

    expect(runCb('react')).toStrictEqual('app1/react');
    expect(runCb('react-dom')).toStrictEqual('react-dom');
    expect(runCb('foo')).toStrictEqual('app2/foo');
  });
});
