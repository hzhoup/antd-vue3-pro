import { i18n } from '@/locales/setupI18n'
import { localeSetting } from '@/setting/localeEnum'
import { pinia } from '@/store/index'

export const useLocaleStore = defineStore(
  'app_locale',
  () => {
    const state = reactive(localeSetting)

    const getAntdLocale = computed(() => {
      // @ts-ignore
      return i18n.global.getLocaleMessage(state.locale)?.antdLocale ?? {}
    })

    return { ...toRefs(state), getAntdLocale }
  },
  {
    persist: true
  }
)

export function useLocaleStoreWithOut() {
  return useLocaleStore(pinia)
}
