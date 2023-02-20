import { DeviceTypeEnum } from '@/setting/pageEnum'

interface SettingStore {
  device: `${DeviceTypeEnum}`
}

export const useSettingStore = defineStore(
  'setting-store',
  () => {
    const state = reactive<SettingStore>({
      device: 'desktop'
    })

    return { ...toRefs(state) }
  },
  { persist: true }
)
