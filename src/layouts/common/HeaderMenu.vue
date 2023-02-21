<template>
  <a-menu :selected-keys="user.headerMenuKeys" mode="horizontal" theme="dark" @select="user.changeHeaderMenuKeys">
    <a-menu-item v-for="menu in menus" :key="menu.url.substring(menu.url.lastIndexOf('/') + 1)">
      <span>{{ menu.name }}</span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'

defineOptions({ name: 'HeaderMenu' })
const user = useUserStore()
const menus = computed(() => {
  return user.menus.filter(menu => menu.level === 0)
})
</script>
