import { useRouterPush } from '@/hooks/router'
import { useMessage } from '@/hooks/useMessage'
import { useAuthStore } from '@/store/modules/auth'
import { appError, appLog } from '@/utils/common/appLog'
import { isDevMode } from '@/utils/common/env'
import { MaybeRef, UseFetchReturn } from '@vueuse/core'
import { isObject } from 'lodash-es'
import { LocationQueryRaw, stringifyQuery } from 'vue-router'

const useRequest = createFetch({
  baseUrl: import.meta.env.APP_BASE_URL,
  options: {
    immediate: false,
    timeout: 30000,
    beforeFetch({ options }) {
      const auth = useAuthStore()
      console.log(auth.token)
      options.headers = Object.assign(options.headers || {}, {
        'Access-Token': auth.token
      })

      return { options }
    },
    afterFetch({ data, response }) {
      const { toLoginModule } = useRouterPush(false)
      const { createMessage } = useMessage()

      isDevMode() && appLog(JSON.stringify(data))

      if (data.success && !data.errorCode) {
        data = data.data || {}
      } else if (!data.success && data.errorCode === '401') {
        createMessage.warning(data.errorMessage || '登录已过期')
        setTimeout(() => {
          toLoginModule('pwd-login')
        }, 1500)
        data = null
      } else {
        createMessage.warning(data.errorMessage || '未知错误,请联系管理员')
        data = null
      }

      return { data, response }
    },
    onFetchError({ data, error }) {
      isDevMode() && appError(error)
      data = null
      return { data, error }
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

/**
 * 封装 get 请求
 * @param url 请求地址
 * @param query 请求参数
 */
export function useGet<T = unknown>(url: MaybeRef<string>, query?: MaybeRef<unknown>): UseFetchReturn<T> {
  const _url = computed(() => {
    const _url = unref(url)
    const _query = unref(query)
    const queryString = isObject(_query) ? stringifyQuery(_query as LocationQueryRaw) : _query || ''
    return `${_url}${queryString ? '?' : ''}${queryString}`
  })

  return useRequest<T>(_url).json()
}

/**
 * 封装 post 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
export function usePost<T = unknown>(url: MaybeRef<string>, payload?: MaybeRef<unknown>): UseFetchReturn<T> {
  return useRequest<T>(url).post(payload).json()
}

/**
 * 封装 put 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
export function usePut<T = unknown>(url: MaybeRef<string>, payload?: MaybeRef<unknown>): UseFetchReturn<T> {
  return useRequest<T>(url).put(payload).json()
}

/**
 * 封装 delete 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
export function useDelete<T = unknown>(url: MaybeRef<string>, payload?: MaybeRef<unknown>): UseFetchReturn<T> {
  return useRequest<T>(url).delete(payload).json()
}

/**
 * 封装获取Blob进行下载
 * @param url 请求地址
 */
export function useBlob(url: MaybeRef<string>): UseFetchReturn<Blob> {
  return useRequest(url).blob()
}
