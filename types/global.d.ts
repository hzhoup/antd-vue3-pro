import type { ComponentPublicInstance, FunctionalComponent, PropType as VuePropType, VNodeChild } from 'vue'

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }

  // vue
  declare type PropType<T> = VuePropType<T>
  declare type VueNode = VNodeChild | JSX.Element

  declare type Nullable<T> = T | null
  declare type NonNullable<T> = T extends null | undefined ? never : T
  declare type Recordable<T = any> = Record<string, T>
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }

  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }

  declare interface ViteEnv {
    // 开发端口
    VITE_PORT?: number
    // base 路径
    VITE_PUBLIC_PATH?: string
    // 代理对
    VITE_PROXY?: [string, string][]
    // 是否开启 polyfills
    VITE_LEGACY?: boolean
    // 是否启用压缩
    VITE_BUILD_COMPRESS?: 'gzip' | 'brotli' | 'none'
    // 启用压缩是否删除源文件
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE?: boolean
    // 是否启用 mock 数据
    VITE_MOCK: string

    // 应用名称
    APP_TITLE: string
    // 应用前缀
    APP_SHORT_NAME: string
    // 请求基本路径
    APP_BASE_URL: string
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}

declare module 'vue-router' {
  interface RouteMeta {
    name?: string
    perms?: string
    icon?: string
  }
}
