export enum LANGUAGE_MAP {
  en = 'en-US',
  zh = 'zh-CN'
}

export const I18nChunkMap = {
  [LANGUAGE_MAP.zh]: () => import(/* webpackChunkName: "i18n.zh-cn" */ "@/packages/intl/data/zh-cn.json"),
  [LANGUAGE_MAP.en]: () => import(/* webpackChunkName: "i18n.en-us" */ "@/packages/intl/data/en-us.json")
}
