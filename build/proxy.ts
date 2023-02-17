import type { ProxyOptions } from 'vite'

type ProxyItem = [string, string]

type ProxyList = ProxyItem[]

type ProxyTargetList = Record<string, ProxyOptions>

/**
 * Generate proxy
 * @param list
 */
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {}

  for (const [prefix, target] of list) {
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), '')
    }
  }

  return ret
}