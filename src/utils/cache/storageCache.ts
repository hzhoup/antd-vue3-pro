import { getStorageShortName } from '@/utils/env'
import dayjs from 'dayjs'
import { isNil } from 'lodash-es'

class WebStorage {
  private storage: Storage
  private readonly encryption: boolean

  constructor(storage: Storage, encryption = true) {
    this.storage = storage
    this.encryption = encryption
  }

  /**
   * set cache
   * @param key 缓存键
   * @param value 缓存值
   * @param expire 缓存过期时间 分钟
   */
  set(key: string, value: unknown, expire: number | null = null) {
    let dataStr = JSON.stringify({
      value,
      time: dayjs().valueOf(),
      expire: isNil(expire) ? null : dayjs().valueOf() + expire * 1000 * 60
    })
    if (this.encryption) {
      dataStr = window.btoa(encodeURIComponent(dataStr))
    }
    this.storage.setItem(this.getKey(key), dataStr)
  }

  /**
   * get cache
   * @param key 缓存键
   * @param initValue 默认值
   */
  get(key: string, initValue: unknown = null) {
    const valueStr = this.storage.getItem(this.getKey(key))
    if (!valueStr) return initValue

    try {
      const _valueStr = this.encryption ? decodeURIComponent(window.atob(valueStr)) : valueStr
      const data = JSON.parse(_valueStr)
      const { value, expire } = data
      if (isNil(expire) || expire >= dayjs().valueOf()) return value
      this.remove(key)
      return initValue
    } catch {
      return initValue
    }
  }

  /**
   * delete cache
   * @param key 缓存键
   */
  remove(key: string) {
    this.storage.removeItem(this.getKey(key))
  }

  /**
   * delete all cache of this instance
   */
  clear(): void {
    this.storage.clear()
  }

  private getKey(key: string) {
    return `__${getStorageShortName()}_${key}__`.toUpperCase()
  }
}

export const getStorage = ({ storage = localStorage, encryption = true }) => {
  return new WebStorage(storage, encryption)
}
