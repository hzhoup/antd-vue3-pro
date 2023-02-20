<template>
  <a-layout :class="['layout']">
    <GlobalContent />
  </a-layout>
</template>

<script lang="ts" setup>
import GlobalContent from '@/layouts/common/GlobalContent.vue'

defineOptions({ name: 'BasicLayout' })
</script>
