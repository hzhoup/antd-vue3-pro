import { useGet } from '@/hooks/request'
import { router } from '@/router'
import { RootRoute } from '@/router/routes'
import { findFirstLeaves, listToTree } from '@/utils/common/tree'
import { cloneDeep } from 'lodash-es'
import { RouteRecordRaw } from 'vue-router'

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

  function updateRootRedirect(menus) {
    const menusTree = listToTree(menus)
    const newRedirect = findFirstLeaves(menusTree[0]).url
    const routRoute = { ...RootRoute, redirect: newRedirect }
    router.addRoute(routRoute)
  }

  function handleAuthRoute(menus) {
    const modules = import.meta.glob(['@/views/**/**.vue', '!**/components/**/**.vue'])
    for (const menu of menus) {
      const comPath = Object.keys(modules).find(key => key.includes(`${menu.url}/index.vue`))
      if (comPath) {
        const vueRoutes: RouteRecordRaw = {
          path: menu.url,
          name: menu.url.substring(menu.url.lastIndexOf('/')),
          component: modules[comPath],
          meta: {
            name: menu.name,
            perms: menu.perms,
            icon: menu.icon
          }
        }
        router.addRoute(vueRoutes)
        state.cacheRoutes.push(vueRoutes.name as string)
      }
    }
  }

  async function initDynamicRoute() {
    const { execute, data, error } = useGet<{ menus: GlobalMenu[]; user: GlobalUserInfo }>('/user/info')
    await execute()
    if (!error.value && data.value) {
      const { menus, user } = data.value
      state.menus = menus
      state.info = user
      updateRootRedirect(cloneDeep(menus))
      handleAuthRoute(cloneDeep(menus))
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
