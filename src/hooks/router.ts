import { router as globalRouter } from '@/router'
import { LoginModuleKey } from '@/setting/pageEnum'
import type { RouteLocationRaw } from 'vue-router'

/**
 * 路由跳转
 * @param {boolean} inSetup 是否在 setup 调用，在 js 文件无法使用 useRouter & useRoute
 */
export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter
  const route = globalRouter.currentRoute

  /**
   * 路由跳转
   * @param {RouteLocationRaw} to 跳转的路由
   * @param {boolean} newTab 是否新 tab 打开
   */
  function routerPush(to: RouteLocationRaw, newTab = false) {
    if (newTab) {
      const routerData = router.resolve(to)
      window.open(routerData.href, '_blank')
      return Promise.resolve()
    }
    return router.push(to)
  }

  /**
   * 返回上一级路由
   */
  function routerBack() {
    router.go(-1)
  }

  /**
   * 登录页切换其他模块
   * @param {LoginModuleKey} module 切换的登录模块
   */
  async function toLoginModule(module: LoginModuleKey) {
    const { query } = route.value
    await routerPush({ path: `/login/${module}`, query })
  }

  return { routerPush, routerBack, toLoginModule }
}
