import { DeviceTypeEnum } from '@/setting/pageEnum'
import { useSettingStore } from '@/store/settingStore'

export default function subscribeWebStore() {
  const breakpoints = useBreakpoints({
    tablet: 640,
    laptop: 1024,
    desktop: 1280
  })
  const setting = useSettingStore()
  const scope = effectScope()

  scope.run(() => {
    // 监听屏幕断点
    watch(
      () => breakpoints,
      newValue => {
        if (newValue.isSmaller('laptop')) setting.device = DeviceTypeEnum.TABLET
        else if (newValue.isSmaller('desktop')) setting.device = DeviceTypeEnum.LAPTOP
        else setting.device = DeviceTypeEnum.DESKTOP
      },
      { immediate: true, deep: true }
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })
}
