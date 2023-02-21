<template>
  <a-layout-header class="!p-0 flex-y-center h-full">
    <div class="w-160px flex-center">
      <SystemLogo class="ml-24px w-46px h-46px" />
    </div>
    <div class="flex-1-hidden">
      <HeaderMenu />
    </div>
    <div class="w-320px">
      <UserMenu />
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import UserMenu from '@/layouts/common/UserMenu.vue'
import HeaderMenu from './HeaderMenu.vue'

defineOptions({ name: 'GlobalHeader' })
</script>
