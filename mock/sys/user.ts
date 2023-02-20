import { resultError, resultSuccess } from 'mock/_utils'
import { MockMethod } from 'vite-plugin-mock'

export function createFakeUserList() {
  return [
    {
      userId: 1,
      username: 'admin',
      realName: '超级管理',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      password: '123456',
      token: 'fakeToken1',
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
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createFakeUserList().find(item => item.username === username && password === item.password)
      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }
      const { token } = checkUser
      return resultSuccess(token)
    }
  }
] as MockMethod[]
