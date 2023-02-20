import { getRequestToken, requestParams, resultError, resultSuccess } from 'mock/_utils'
import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

export function createFakeUserList() {
  return [
    {
      id: 1,
      username: 'admin',
      realName: '超级管理员',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      password: '123456',
      token: 'abcdefghijklnmopqrstuvwxyz1234567890!@#$%^&*()_+',
      enumber: '000134',
      deptFullNames: ['集团优赛/信息中心/IT部'],
      deptFullPaths: ['1/55843305/105377508/480641289/'],
      deptIds: [480641289],
      permDataMap: {
        'dashboard:workplace': true,
        'dashboard:workplace:search': true,
        'dashboard:workplace:add': true,
        'dashboard:workplace:find': true,
        'dashboard:workplace:log': true
      },
      menus: [
        {
          id: 1,
          parentId: -1,
          name: '仪表板',
          icon: 'dashboard',
          url: '/dashboard',
          perms: 'dashboard',
          seq: 1,
          level: 0,
          type: 0,
          status: true
        },
        {
          id: 2,
          parentId: 1,
          name: '工作台',
          icon: 'workplace',
          url: '/dashboard/workplace',
          perms: 'customer:workplace',
          seq: 1,
          level: 1,
          type: 1,
          status: true
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
  },
  {
    url: '/api/user/info',
    timeout: Random.integer(500, 2000),
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('请先登录', { errorCode: 401 })
      const checkUser = createFakeUserList().find(item => item.token === token)
      if (!checkUser) return resultError('登录已过期，请重新登录', { errorCode: 401 })
      const { menus, avatar, deptFullNames, deptFullPaths, deptIds, enumber, id, realName, username, permDataMap } =
        checkUser
      return resultSuccess({
        menus,
        user: { avatar, deptFullNames, deptFullPaths, deptIds, enumber, id, realName, username, permDataMap }
      })
    }
  }
] as MockMethod[]
