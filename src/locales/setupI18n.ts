import { setHtmlLang } from '@/locales/helpers'
import { localeSetting } from '@/setting/localeEnum'
import { getStorageShortName } from '@/utils/common/env'
import type { App } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

export let i18n: ReturnType<typeof createI18n>

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStorage = useStorage(`__${getStorageShortName()}_locale__`.toUpperCase(), localeSetting)
  const locale = localeStorage.value.locale
  const fallbackLocale = localeStorage.value.fallback
  const availableLocales = localeStorage.value.availableLocales

  const defaultLocale = await import(`./lang/${locale}.ts`)
  const message = defaultLocale.default?.message ?? {}

  setHtmlLang(locale)

  return {
    legacy: false,
    locale,
    fallbackLocale,
    messages: {
      [locale]: message
    },
    availableLocales,
    silentFallbackWarn: true,
    missingWarn: false,
    silentTranslationWarn: true
  }
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}
