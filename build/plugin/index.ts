import vue from '@vitejs/plugin-vue'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {} = viteEnv

  const plugins = [vue()]

  return plugins
}