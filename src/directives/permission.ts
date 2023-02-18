/**
 * 全局细粒度权限控制指令
 * @example v-auth="RoleEnum.ADD"
 */
import type { App, Directive, DirectiveBinding } from 'vue'

function isAuth(el: Element, binding: DirectiveBinding) {
  const value = binding.value
  if (!value) return
  // TODO 判断 value 是否包含在权限组中
  if (true) {
    el.parentNode?.removeChild(el)
  }
}

const mounted = (el: Element, binding: DirectiveBinding) => {
  isAuth(el, binding)
}

const authDirective: Directive = {
  mounted
}

export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective)
}

export default authDirective
