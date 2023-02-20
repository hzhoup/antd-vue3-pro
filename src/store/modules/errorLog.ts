import { ErrorTypeEnum } from '@/setting/exception'
import { pinia } from '@/store'
import dayjs from 'dayjs'

export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum
  // Error file
  file: string
  // Error name
  name?: string
  // Error message
  message: string
  // Error stack
  stack?: string
  // Error detail
  detail: string
  // Error url
  url: string
  // Error time
  time?: string
}

export const useErrorLogStore = defineStore('app_error_log', () => {
  const errLogInfo = ref<Nullable<ErrorLogInfo[]>>(null)
  const errLogCount = ref<number>(0)

  function addErrorLogInfo(info: any) {
    const item = { ...info, time: dayjs().format('YYYY-MM-DD HH:mm:ss') }
    errLogInfo.value = [item, ...(errLogInfo.value ?? [])]
    errLogCount.value += 1
  }

  function addAjaxErrorInfo(error) {
    const errInfo: Partial<ErrorLogInfo> = {
      message: error.message,
      type: ErrorTypeEnum.AJAX
    }
    if (error.response) {
      const { config: { url = '', data: params = '', method = 'get', headers = {} } = {}, data = {} } = error.response
      errInfo.url = url
      errInfo.name = 'Ajax Error!'
      errInfo.file = '-'
      errInfo.stack = JSON.stringify(data)
      errInfo.detail = JSON.stringify({ params, method, headers })
    }
    addErrorLogInfo(errInfo as ErrorLogInfo)
  }

  return { errLogInfo, errLogCount, addErrorLogInfo, addAjaxErrorInfo }
})

export function useErrorLogStoreWithOut() {
  return useErrorLogStore(pinia)
}
