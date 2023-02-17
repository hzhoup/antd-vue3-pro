import dayjs from 'dayjs'
import { resolve } from 'path'
import * as process from 'process'
import { defineConfig, loadEnv } from 'vite'
import { generateModifyVars } from './build/generate'
import { createVitePlugins } from './build/plugin'
import { createProxy } from './build/proxy'
import { wrapperEnv } from './build/utils'
import pkg from './package.json'

const resolvePath = (...paths: string[]) => resolve(__dirname, ...paths)

const {name, version, dependencies, devDependencies} = pkg
const __APP_INFO__ = {
  pkg: {name, version, dependencies, devDependencies},
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const root = process.cwd()

  const env = loadEnv(mode, root, ['VITE_', 'APP_'])
  const viteEnv = wrapperEnv(env)
  const {VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY} = viteEnv

  const isBuild = command === 'build'

  return {
    root,
    base: VITE_PUBLIC_PATH,
    envPrefix: ['VITE_', 'APP_'],
    resolve: {
      alias: [
        {find: '@/', replacement: resolvePath('src') + '/'},
        {find: '#/', replacement: resolvePath('types') + '/'}
      ]
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    build: {
      target: 'es2015',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true
        }
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  }
})
