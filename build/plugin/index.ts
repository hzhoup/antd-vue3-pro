import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueMacros from 'unplugin-vue-macros'
import eslint from 'vite-plugin-eslint'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  console.log(isBuild)
  const {} = viteEnv

  const plugins = [vue(), vueJsx(), vueMacros.vite({}), eslint()]

  return plugins
}
