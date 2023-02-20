<template>
  <a-config-provider :locale="getAntdLocale" :space="{ size: 'middle' }" component-size="middle">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { useLocaleStore } from '@/store/modules/locale'
import subscribeStore from '@/store/subscribe'

const { getAntdLocale } = useLocaleStore()

subscribeStore()
</script>
