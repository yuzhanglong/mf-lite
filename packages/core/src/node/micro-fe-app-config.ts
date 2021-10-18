import webpack from 'webpack';

type SharedLibraryExpose = string | {
  name: string;
  path: string;
  type?: 'package' | 'module'
};

type SharedLibrary = string | {
  name: string;
  type?: 'package' | 'module'
};

export interface MicroAppConfig {
  name: string;
  url: string;
  remotes: {
    name: string;
    url: string;
    sharedLibraries?: SharedLibrary[]
  }[];
  exposes: SharedLibraryExpose[];
  webpackConfig?: Partial<webpack.Configuration>;
}

/**
 * 基于 micro app config 生成目录
 *
 * @author yuzhanglong
 * @date 2021-09-28 00:40:39
 * @return object 一个对象, key 表示远程应用的名称，value 表示其入口 url
 */
export const getModuleFederationRemotes = (microAppConfig: MicroAppConfig) => {
  const remotes: Record<string, string> = {};

  // example: 'base_app': `base_app@https://base-yzl.vercel.app/base_app_entry.js`,
  for (const remote of microAppConfig.remotes) {
    remotes[remote.name] = `${remote.name}@${remote.url.endsWith('/') ? remote.url : `${remote.url}/`}module-federation-entry.js`;
  }
  return remotes;
};

/**
 * 获取 share library 的导入替换回调函数
 *
 * 基座暴露一些公共库，我们称为 share library，我们通过 NormalModuleReplacementPlugin 将所有的公共依赖导向相应的 app
 *
 * @author yuzhanglong
 * @date 2021-09-28 00:47:33
 */
export const getNormalModuleReplacementPluginCallBack = (microAppConfig: MicroAppConfig) => {
  return (v: { request: string }) => {
    // 寻找相应的 request，例如我们要重定向 react，那么我们要从所有的 remotes 中找到第一个其 shareLibrary 中有 react 的远程模块
    const externalRemoteApp = microAppConfig.remotes
      .find(res => {
        if (!res.sharedLibraries) {
          return false;
        }

        return res.sharedLibraries
          .some(i => {
            // 如果直接是 string 类型表示是一个 package
            if (typeof i === 'string') {
              return i === v.request;
            }

            return i.type === 'package' && i.name === v.request;
          });
      });
    if (externalRemoteApp) {
      // eslint-disable-next-line no-param-reassign
      v.request = `${externalRemoteApp.name}/${v.request}`;
    }
  };
};

/**
 * 初始化全局 manager 方便调用
 *
 * @author yuzhanglong
 * @date 2021-09-28 00:53:32
 */
export const getMicroAppConfigManager = (microAppConfig: MicroAppConfig) => {
  return {
    getNormalModuleReplacementPluginCallBack: () => getNormalModuleReplacementPluginCallBack(microAppConfig),
    getModuleFederationRemotes: () => getModuleFederationRemotes(microAppConfig),
    config: microAppConfig,
  };
};


