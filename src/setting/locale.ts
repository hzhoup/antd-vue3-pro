enum LOCALE {
  ZH_CN = 'zh_CN',
  EN_US = 'en'
}

export const localeSetting = {
  locale: LOCALE.ZH_CN,
  fallback: LOCALE.ZH_CN,
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US]
}
