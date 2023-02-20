import { createRouterGuard } from '@/router/guard'
import { WHITE_ROUTE } from '@/router/routes'
import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

/**
 * 白名单
 */
export const WHITE_ROUTE_NAMES: string[] = []

function getWhiteRoutesName(array: RouteRecordRaw[]) {
  array.forEach(route => {
    route.name && WHITE_ROUTE_NAMES.push(route.name as string)
    if (route.children?.length) getWhiteRoutesName(route.children)
  })
}

getWhiteRoutesName(WHITE_ROUTE)

/**
 * 重置路由
 */
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name && !WHITE_ROUTE_NAMES.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const router = createRouter({
  history: createWebHistory(),
  routes: WHITE_ROUTE,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export async function setupRouter(app: App) {
  app.use(router)
  createRouterGuard(router)
  await router.isReady()
}
