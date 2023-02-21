<template>
  <a-layout>
    <GlobalHeader />
    <a-layout :style="{ height: 'calc(100vh - 64px)' }">
      <GlobalSider />
      <a-layout-content class="wh-full">
        <GlobalContent />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import GlobalContent from '@/layouts/common/GlobalContent.vue'
import GlobalHeader from '@/layouts/common/GlobalHeader.vue'
import GlobalSider from '@/layouts/common/GlobalSider.vue'

defineOptions({ name: 'BasicLayout' })
</script>
