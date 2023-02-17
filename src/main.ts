import { setupAssets } from '@/styles/setupAssets'
import { createApp } from 'vue'
import App from './App.vue'
import AppLoad from './AppLoad.vue'

async function boostrap() {
  setupAssets()

  const appLoad = createApp(AppLoad)

  appLoad.mount('#app-load')

  const app = createApp(App)

  app.mount('#app')
}

await boostrap()
