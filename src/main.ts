import { setupGlobDirectives } from '@/directives'
import { setupI18n } from '@/locales/setupI18n'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupAssets } from '@/styles/setupAssets'
import { createApp } from 'vue'
import App from './App.vue'
import AppLoad from './AppLoad.vue'

async function boostrap() {
  // 注册静态文件
  setupAssets()

  const appLoad = createApp(AppLoad)

  appLoad.mount('#app-load')

  const app = createApp(App)

  // 注册全局状态管理
  setupStore(app)

  // 配置国际化
  await setupI18n(app)

  // 注册路由
  await setupRouter(app)

  // 注册全局指令
  setupGlobDirectives(app)

  app.mount('#app')
}

await boostrap()
