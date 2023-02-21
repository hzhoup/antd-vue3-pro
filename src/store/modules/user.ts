import { useGet } from '@/hooks/request'
import { router } from '@/router'
import { RootRoute } from '@/router/routes'
import { BASIC_LAYOUT, BLANK_LAYOUT } from '@/router/routes/constant'
import { PageEnum } from '@/setting/pageEnum'
import { findFirstLeaves, listToTree } from '@/utils/common/tree'
import { cloneDeep } from 'lodash-es'

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
  // 头部菜单 key
  headerMenuKeys: string[]
}

export const useUserStore = defineStore('user-store', () => {
  const state = reactive<UserState>({
    isInitAuthRoute: false,
    menus: [],
    info: null,
    cacheRoutes: [],
    headerMenuKeys: []
  })

  function updateRootRedirect(menus) {
    const menusTree = listToTree(menus)
    const newRedirect = findFirstLeaves(menusTree[0]).url
    const rootRoute = { ...RootRoute, redirect: newRedirect }
    router.addRoute(rootRoute)
  }

  function handleAuthRoute(menus) {
    const map: Recordable = {}
    const rootRoute = {
      path: '/',
      name: PageEnum.ROOT_NAME,
      redirect: PageEnum.ROOT_REDIRECT,
      children: [] as any[]
    }
    const modules = import.meta.glob(['@/views/**/**.vue', '!**/components/**/**.vue'])

    for (const menu of menus) {
      map[menu.id] = {
        path: menu.url,
        name: menu.url.substring(menu.url.lastIndexOf('/') + 1),
        meta: { title: menu.name, icon: menu.icon, perms: menu.perms }
      }
      if (map[menu.parentId]) {
        if (menu.type === 0) {
          map[menu.id].component = BLANK_LAYOUT
        } else {
          map[menu.id].component = modules[`/src/views${menu.url}/index.vue`]
        }
        if (!map[menu.parentId].redirect) {
          map[menu.parentId].redirect = menu.url
          map[menu.parentId].children = []
        }
        map[menu.parentId].children.push(map[menu.id])
      } else {
        map[menu.id].component = BASIC_LAYOUT
        rootRoute.children.push(map[menu.id])
        if (!rootRoute.redirect) rootRoute.redirect = menu.url
      }
    }

    router.addRoute(rootRoute)
  }

  async function initDynamicRoute() {
    const { execute, data, error } = useGet<{ menus: GlobalMenu[]; user: GlobalUserInfo }>('/user/info')
    await execute()
    if (!error.value && data.value) {
      const { menus, user } = data.value
      state.menus = menus
      state.info = user
      state.isInitAuthRoute = true
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

  function changeHeaderMenuKeys(selectedKeys) {
    state.headerMenuKeys = selectedKeys
  }

  return { ...toRefs(state), permissions, initDynamicRoute, changeHeaderMenuKeys }
})
