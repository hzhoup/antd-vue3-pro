import { useGet } from '@/hooks/request'

export type GlobalMenu = {
  id: number
  parentId: number
  name: string
  icon: string
  url: string
  perms: string
  seq: number
  level: number
  type: number
  status: boolean
}

export type GlobalUserInfo = {
  id: number
  avatar: string
  deptFullNames: string[]
  deptFullPaths: string[]
  deptIds: number[]
  enumber: string
  permDataMap: Recordable
  realName: string
  username: string
}

interface UserState {
  // 已加载权限路由
  isInitAuthRoute: boolean
  info: GlobalUserInfo | null
  menus: GlobalMenu[]
  // 缓存路由名称
  cacheRoutes: string[]
}

export const useUserStore = defineStore('user-store', () => {
  const state = reactive<UserState>({
    isInitAuthRoute: false,
    menus: [],
    info: null,
    cacheRoutes: []
  })

  async function initDynamicRoute() {
    const { execute, data, error } = useGet<{ menus: GlobalMenu[]; user: GlobalUserInfo }>('/user/info')
    await execute()
    if (!error.value && data.value) {
      console.log(data.value)
      const { menus, user } = data.value
      state.menus = menus
      state.info = user
    }
  }

  const permissions = computed(() => {
    if (state.info) {
      const { permDataMap } = state.info
      return Object.keys(permDataMap)
    }
    return []
  })

  return { ...toRefs(state), permissions, initDynamicRoute }
})
