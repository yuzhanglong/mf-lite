/**
 * File: common.ts
 * Description: 用到的常量
 * Created: 2021-07-29 16:30:59
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

export enum LANGUAGE_MAP {
  en = 'en-US',
  zh = 'zh-CN'
}

export const I18nChunkMap = {
  [LANGUAGE_MAP.zh]: () => import(/* webpackChunkName: "i18n.zh-cn" */ "@/packages/intl/data/zh-cn.json"),
  [LANGUAGE_MAP.en]: () => import(/* webpackChunkName: "i18n.en-us" */ "@/packages/intl/data/en-us.json")
};
