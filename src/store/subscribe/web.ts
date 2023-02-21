import { DeviceTypeEnum } from '@/setting/pageEnum'
import { useSettingStore } from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'

export default function subscribeWebStore() {
  const breakpoints = useBreakpoints({
    tablet: 640,
    laptop: 1024,
    desktop: 1280
  })
  const setting = useSettingStore()
  const user = useUserStore()
  const route = useRoute()
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

    // 监听路由变化, 更新菜单key
    watch(
      () => route.matched,
      newValue => {
        let headerMenuKeys: string[]
        if (newValue.length >= 3) {
          headerMenuKeys = [newValue[newValue.length - 2].name as string]
        } else {
          headerMenuKeys = [newValue.pop()?.name as string]
        }
        user.changeHeaderMenuKeys(headerMenuKeys)
      },
      { immediate: true }
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })
}
