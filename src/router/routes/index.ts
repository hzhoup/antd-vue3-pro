import { LOGIN_ROUTE, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic'
import { Page } from '@/setting/page'
import { RouteRecordRaw } from 'vue-router'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: Page.ROOT_REDIRECT
}

export const WHITE_ROUTE = [RootRoute, LOGIN_ROUTE, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE]
