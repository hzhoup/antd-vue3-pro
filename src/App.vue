<template>
  <a-config-provider :locale="getAntdLocale" component-size="middle" space="middle">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { useLocaleStore } from '@/store/locale'

const { getAntdLocale } = useLocaleStore()
</script>
