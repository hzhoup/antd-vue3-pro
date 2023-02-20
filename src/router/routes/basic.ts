import { BLANK_LAYOUT, EXCEPTION_PAGE, LOGIN_PAGE, REDIRECT_PAGE } from '@/router/routes/constant'
import { PageEnum } from '@/setting/pageEnum'
import { RouteRecordRaw } from 'vue-router'

export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  component: BLANK_LAYOUT,
  children: [
    {
      name: 'login',
      path: '/login/:module',
      props: route => {
        const moduleType = route.params?.module ?? 'pwd-login'
        return { module: moduleType }
      },
      component: LOGIN_PAGE
    }
  ]
}

export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: '/redirect',
  component: BLANK_LAYOUT,
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: REDIRECT_PAGE
    }
  ]
}

export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  component: BLANK_LAYOUT,
  children: [
    {
      name: PageEnum.PAGE_NOT_FOUND_NAME,
      path: '/:path(.*)*',
      component: EXCEPTION_PAGE
    }
  ]
}
