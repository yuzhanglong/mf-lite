import { IntlSources, LANGUAGE_MAP } from '@attachments/i18n';

export const I18nChunkMap: IntlSources = {
  [LANGUAGE_MAP.zh]: () => import(/* webpackChunkName: "i18n.zh-cn" */ './i18n/zh-cn.json'),
  [LANGUAGE_MAP.en]: () => import(/* webpackChunkName: "i18n.en-us" */ './i18n/en-us.json'),
};
