import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import { createApp } from 'vue'
import App from './App.vue'

async function boostrap() {
  const app = createApp(App)

  app.mount('#app')
}

await boostrap()
