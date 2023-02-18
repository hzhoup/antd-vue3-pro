import { genMessage } from '@/locales/helpers'
import antdLocale from 'ant-design-vue/es/locale/en_US'

const modules = import.meta.glob('./en/**/*.ts')

export default {
  message: {
    ...genMessage(modules, 'en'),
    antdLocale
  },
  dayjsLocale: null,
  dayjsLocaleName: 'en'
}
