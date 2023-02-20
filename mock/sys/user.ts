import { resultError, resultSuccess } from 'mock/_utils'
import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

export function createFakeUserList() {
  return [
    {
      userId: 1,
      username: 'admin',
      realName: '超级管理',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      password: '123456',
      token: Random.string(12),
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super'
        }
      ]
    }
  ]
}

export default [
  {
    url: '/api/login',
    timeout: Random.integer(500, 2000),
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createFakeUserList().find(item => item.username === username && password === item.password)
      if (!checkUser) {
        return resultError('未找到用户，请检查账号密码!')
      }
      const { token } = checkUser
      return resultSuccess(token)
    }
  }
] as MockMethod[]
