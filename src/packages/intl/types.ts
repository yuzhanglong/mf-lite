/**
 * File: types.ts
 * Description: intl package 类型定义
 * Created: 2021-07-29 16:29:55
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

export type IntlFn = (key: string, args?: Record<string, any>) => string

export type MessageMap = Record<string, string>

export type IntlSources = Record<string, (() => MessageMap) | (() => Promise<MessageMap>)>
