export enum PageEnum {
  ROOT_NAME = 'home',
  ROOT_REDIRECT = '/dashboard/workplace',
  LOGIN_NAME = 'login',
  REDIRECT_NAME = 'Redirect',
  PAGE_NOT_FOUND_NAME = 'PageNotFound'
}

export enum DeviceTypeEnum {
  TABLET = 'tablet', // 平板
  LAPTOP = 'laptop', // 笔记本
  DESKTOP = 'desktop' // 台式
}

export enum LoginModuleEnum {
  'pwd-login' = '账密登录',
  'code-login' = '扫码登录',
  register = '注册',
  'reset-pwd' = '重置密码'
}

export type LoginModuleKey = keyof typeof LoginModuleEnum
