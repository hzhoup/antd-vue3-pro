<template>
  <div class="enter-y">
    <a-button block type="primary" @click="routerBack">返回</a-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouterPush } from '@/hooks/router'

defineOptions({ name: 'ResetPwd' })
const { routerBack } = useRouterPush()
</script>
