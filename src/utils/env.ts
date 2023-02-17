import pkg from '../../package.json'

/**
 * 获取缓存前缀
 */
export function getStorageShortName() {
  return `${import.meta.env.APP_SHORT_NAME}_${pkg.version}`.toUpperCase()
}

/**
 * 获取当前环境
 */
export function getEnv(): string {
  return import.meta.env.MODE
}

/**
 * 是否开发模式
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * 是否生产模式
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}
