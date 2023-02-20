<template>
  <div class="relative flex-center wh-full">
    <a-card class="rounded-20px shadow-sm">
      <div class="w-300px laptop:w-360px desktop:w-420px">
        <header class="flex-y-center justify-between">
          <SystemLogo class="w-64px h-64px" />
          <a-typography-text class="text-24px desktop:text-28px" strong>Antd Vue3 Pro</a-typography-text>
        </header>
        <main class="pt-24px">
          <h3 class="text-18px font-medium">{{ activeModule.label }}</h3>
          <div class="pt-24px">
            <transition appear mode="out-in" name="fade-slide">
              <component :is="activeModule.component" />
            </transition>
          </div>
        </main>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { LoginModuleEnum, LoginModuleKey } from '@/setting/pageEnum'
import type { Component } from 'vue'
import { CodeLogin, PwdLogin, Register, ResetPwd } from './components'

interface Props {
  module: LoginModuleKey
}

interface LoginModule {
  key: LoginModuleKey
  label: LoginModuleEnum
  component: Component
}

defineOptions({ name: 'Login' })
const props = defineProps<Props>()

const modules: LoginModule[] = [
  { key: 'pwd-login', label: LoginModuleEnum['pwd-login'], component: PwdLogin },
  { key: 'code-login', label: LoginModuleEnum['code-login'], component: CodeLogin },
  { key: 'register', label: LoginModuleEnum.register, component: Register },
  { key: 'reset-pwd', label: LoginModuleEnum['reset-pwd'], component: ResetPwd }
]

const activeModule = computed(() => {
  const active: LoginModule = { ...modules[0] }
  const findItem = modules.find(item => item.key === props.module)
  if (findItem) Object.assign(active, findItem)
  return active
})
</script>
