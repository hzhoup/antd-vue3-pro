import { Modal, notification } from 'ant-design-vue'
import NProgress from 'nprogress'
import { Router } from 'vue-router'

export function createRouterGuard(router: Router) {
  createPageGuard(router)
  destroyMessageGuard(router)
  createNProgressGuard(router)
}

/**
 * 页面在首次加载后 后续再次加载会很快 因此记录下是否已加载过
 */
export function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async to => {
    to.meta.loaded = !!loadedPageMap.get(to.path)
    return true
  })

  router.afterEach(to => {
    loadedPageMap.set(to.path, true)
  })
}

/**
 * 路由跳转关闭所有 modal notification
 */
export function destroyMessageGuard(router: Router) {
  router.beforeEach(async () => {
    try {
      Modal.destroyAll()
      notification.destroy()
    } catch (e) {
      console.warn('message guard error: ' + e)
    }
    return true
  })
}

/**
 * 路由首次加载出现顶部进度条
 */
export function createNProgressGuard(router: Router) {
  router.beforeEach(async to => {
    if (to.meta?.loaded) return true
    NProgress.start()
    return true
  })

  router.afterEach(async () => {
    NProgress.done()
    return true
  })
}
