import { useGet } from '@/hooks/request'
import { router } from '@/router'
import { RootRoute } from '@/router/routes'
import { BASIC_LAYOUT } from '@/router/routes/constant'
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
    const menusTree = listToTree(menus)
    const modules = import.meta.glob(['@/views/**/**.vue', '!**/components/**/**.vue'])

    function fn(tree) {
      for (const node of tree) {
        let vueRoutes = {} as RouteRecordRaw
        const comPath = Object.keys(modules).find(key => key.includes(`${node.url}/index.vue`))
        const menuName = node.url.substring(node.url.lastIndexOf('/') + 1)
        if (node.type === 0) {
          vueRoutes = {
            path: node.url,
            name: menuName,
            redirect: node?.children[0].url || '/404',
            meta: {
              name: node.name,
              perms: node.perms,
              icon: node.icon
            }
          }
        } else if (node.type === 1 && comPath) {
          vueRoutes = {
            path: node.url,
            component: BASIC_LAYOUT,
            children: [
              {
                path: node.url,
                name: menuName,
                component: modules[comPath],
                meta: {
                  name: node.name,
                  perms: node.perms,
                  icon: node.icon
                }
              }
            ]
          }
          state.cacheRoutes.push(menuName)
        }
        vueRoutes && router.addRoute(vueRoutes)
        node.children?.length && fn(node.children)
      }
    }

    fn(menusTree)
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

  return { ...toRefs(state), permissions, initDynamicRoute }
})
