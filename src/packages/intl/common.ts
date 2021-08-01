/**
 * File: common.ts
 * Description: 用到的常量
 * Created: 2021-07-29 16:30:59
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import { IntlSources } from '@/packages/intl/types';

export enum LANGUAGE_MAP {
  en = 'en-US',
  zh = 'zh-CN'
}

export const I18nChunkMap: IntlSources = {
  [LANGUAGE_MAP.zh]: () => import(/* webpackChunkName: "i18n.zh-cn" */ '@/packages/intl/data/zh-cn.json'),
  [LANGUAGE_MAP.en]: () => import(/* webpackChunkName: "i18n.en-us" */ '@/packages/intl/data/en-us.json'),
};

export const INTL_KEY_NOT_EXIST_DEFAULT_MESSAGE = 'the message is empty...';
