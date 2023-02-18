<template>
  <a-configprovider :locale="getAntdLocale">
    <router-view />
  </a-configprovider>
</template>

<script lang="ts" setup>
import { useLocaleStore } from '@/store/locale'

const { getAntdLocale } = useLocaleStore()
</script>
