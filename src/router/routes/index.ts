import { LOGIN_ROUTE, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic'
import { PageEnum } from '@/setting/pageEnum'
import { RouteRecordRaw } from 'vue-router'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: PageEnum.ROOT_NAME,
  redirect: PageEnum.ROOT_REDIRECT
}

export const WHITE_ROUTE = [RootRoute, LOGIN_ROUTE, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE]
