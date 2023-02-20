import { useAuthStore } from '@/store/modules/auth'
import { exeStrategyActions } from '@/utils/common/pattern'
import type { Router } from 'vue-router'

export type StrategyAction = [boolean, () => void]

export function createPermissionGuard(router: Router) {
  const auth = useAuthStore()

  const isLogin = Boolean(auth.token)

  router.beforeEach(async (to, _from, next) => {
    useTitle('⏳⏳⏳ 加载中...')

    const permissions = auth.permissions || []
    const needLogin = to.name !== 'login'
    const hasPermission = !permissions.length

    const actions: StrategyAction[] = [
      // 已登录跳转登录页，跳转至首页
      [
        isLogin && to.name === 'login',
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
          next({ path: 'login/pwd-login', query: { redirect } })
        }
      ],
      // 有相关权限且已登录
      [
        isLogin && needLogin && hasPermission && false,
        () => {
          next()
        }
      ],
      // 无相关权限且已登录
      [
        isLogin && needLogin && !hasPermission && false,
        () => {
          next({ name: '403' })
        }
      ]
    ]
    exeStrategyActions(actions)
  })
}
