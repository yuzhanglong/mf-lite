/**
 * File: types.ts
 * Description: intl package 类型定义
 * Created: 2021-07-29 16:29:55
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

export type MessageMap = Record<string, string>

export type IntlSources = Record<string, (() => MessageMap) | (() => Promise<MessageMap>)>

export interface IIntlGroupExecutor {
  // 修改当前语言
  setLocal: (local: string) => Promise<void>;

  // 激活某个文案组
  activate: (name: string) => void;

  // 取消激活某个文案组
  deactivate: (name: string) => void;

  // 注册一个 intl group
  register: (name: string, sources: IntlSources) => IIntlGroupExecutor;

  // 移除一个 intl group
  unregister: (name: string) => IIntlGroupExecutor;
}

export type GlobalIntl = IIntlGroupExecutor & {
  (key: string, args: any): string;
}
