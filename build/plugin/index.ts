import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueMacros from 'unplugin-vue-macros'
import type { PluginOption } from 'vite'
import eslint from 'vite-plugin-eslint'
import windiCSS from 'vite-plugin-windicss'
import { configStyleImportPlugin } from './styleImport'
import { configUnplugins } from './unplugins'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_LEGACY } = viteEnv

  const plugins: PluginOption[] = [vue(), vueJsx(), vueMacros.vite({}), eslint()]

  // vite-plugin-windicss
  plugins.push(windiCSS())

  // @vitejs/plugin-legacy
  VITE_LEGACY && plugins.push(legacy())

  // vite-plugin-style-import
  plugins.push(configStyleImportPlugin(isBuild))

  // unplugin-auto-import unplugin-icons unplugin-vue-components
  plugins.push(configUnplugins())

  return plugins
}
