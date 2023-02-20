import { Random } from 'mockjs'

export function resultSuccess<T = Recordable>(data: T) {
  return {
    data,
    errorCode: '',
    errorMessage: '',
    serviceTime: Random.date('T'),
    success: true
  }
}

export function resultPageSuccess<T = any>(pageNo: number, pageSize: number, list: T[]) {
  const pageData = pagination(pageNo, pageSize, list)

  return {
    ...resultSuccess({
      data: pageData,
      pageNo,
      pageSize,
      totalCount: list.length,
      totalPage: Math.ceil(list.length / pageSize)
    })
  }
}

export function resultError(errorMessage = 'Request failed', { errorCode = -1, data = null } = {}) {
  return {
    data,
    errorCode,
    errorMessage,
    serviceTime: Random.date('T'),
    success: false
  }
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize))
}

export interface requestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.['access-token']
}
