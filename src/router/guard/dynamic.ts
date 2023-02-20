import { WHITE_ROUTE_NAMES } from '@/router'
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
      if (WHITE_ROUTE_NAMES.includes(toName)) next()
      else {
        const redirect = to.fullPath
        next({ path: '/login/pwd-login', query: { redirect } })
      }
      return false
    }
  }

  return true
}
