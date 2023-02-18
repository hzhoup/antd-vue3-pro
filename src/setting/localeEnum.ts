enum localeEnum {
  ZH_CN = 'zh_CN',
  EN_US = 'en'
}

export const localeSetting = {
  locale: localeEnum.ZH_CN,
  fallback: localeEnum.ZH_CN,
  availableLocales: [localeEnum.ZH_CN, localeEnum.EN_US]
}
