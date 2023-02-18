import { BLANK_LAYOUT, EXCEPTION_PAGE, LOGIN_PAGE, REDIRECT_PAGE } from '@/router/routes/constant'
import { RouteRecordRaw } from 'vue-router'

export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  component: BLANK_LAYOUT,
  name: 'Login',
  children: [
    {
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
  name: 'Redirect',
  children: [
    {
      path: '/redirect/:path(.*)',
      component: REDIRECT_PAGE
    }
  ]
}

export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: BLANK_LAYOUT,
  children: [
    {
      path: '/:path(.*)*',
      component: EXCEPTION_PAGE
    }
  ]
}
