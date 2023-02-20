import { WHITE_ROUTE_NAMES } from '@/router'
import { PageEnum } from '@/setting/pageEnum'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

/**
 * 动态路由
 */
export async function createDynamicRoute(
  to: RouteLocationNormalized,
  _form: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const auth = useAuthStore()
  const user = useUserStore()
  const isLogin = Boolean(auth.token)

  // 初始化权限路由
  if (!user.isInitAuthRoute) {
    // 未登录情况下到登录页
    if (!isLogin) {
      const toName = to.name as string
      if (WHITE_ROUTE_NAMES.includes(toName) && toName !== PageEnum.PAGE_NOT_FOUND_NAME) next()
      else {
        const redirect = to.fullPath
        next({ path: '/login/pwd-login', query: { redirect } })
      }
      return false
    }

    await user.initDynamicRoute()

    if (to.name === PageEnum.PAGE_NOT_FOUND_NAME) {
      const path = to.redirectedFrom?.name === PageEnum.ROOT_NAME ? '/' : to.fullPath
      next({ path, replace: true, query: to.query, hash: to.hash })
      return false
    }
  }

  if (to.name === PageEnum.PAGE_NOT_FOUND_NAME) {
    next({ name: '404', replace: true })
    return false
  }

  return true
}
