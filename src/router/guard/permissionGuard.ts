import { WHITE_ROUTE_NAMES } from '@/router'
import { createDynamicRoute } from '@/router/guard/dynamic'
import { PageEnum } from '@/setting/pageEnum'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'
import { exeStrategyActions } from '@/utils/common/pattern'
import type { Router } from 'vue-router'

export type StrategyAction = [boolean, () => void]

export async function createPermissionGuard(router: Router) {
  const auth = useAuthStore()
  const user = useUserStore()

  router.beforeEach(async (to, form, next) => {
    const flag = await createDynamicRoute(to, form, next)
    if (!flag) return

    useTitle('⏳⏳⏳ 加载中...')

    const isLogin = Boolean(auth.token)
    const permissions = user.permissions
    const needLogin = !WHITE_ROUTE_NAMES.includes(to.name as string)
    const hasPermission = !permissions.length || permissions.includes(to.meta?.perms as string)
    const actions: StrategyAction[] = [
      // 已登录跳转登录页，跳转至首页
      [
        isLogin && to.name === PageEnum.LOGIN_NAME,
        () => {
          next({ path: '/' })
        }
      ],
      // 不需登录权限的页面
      [
        !needLogin,
        () => {
          next()
        }
      ],
      // 未登录进入需要登录权限的页面
      [
        !isLogin && needLogin,
        () => {
          const redirect = to.fullPath
          next({ path: `/login/pwd-login`, query: { redirect } })
        }
      ],
      // 有相关权限且已登录
      [
        isLogin && needLogin && hasPermission,
        () => {
          next()
        }
      ],
      // 无相关权限且已登录
      [
        isLogin && needLogin && !hasPermission,
        () => {
          next({ name: '403' })
        }
      ]
    ]
    exeStrategyActions(actions)
  })
}
