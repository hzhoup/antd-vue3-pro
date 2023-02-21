<template>
  <div v-if="showTooltip">
    <a-tooltip :placement="placement" trigger="hover">
      <template #title>
        {{ tooltipContent }}
      </template>
      <div :class="contentCls" class="flex-center cursor-pointer px-12px">
        <slot></slot>
      </div>
    </a-tooltip>
  </div>
  <div v-else :class="contentCls" class="flex-center cursor-pointer px-12px">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { TooltipPlacement } from 'ant-design-vue/es/tooltip'

interface Props {
  mode?: 'light' | 'dark'
  tooltipContent?: string
  placement?: TooltipPlacement
}

defineOptions({ name: 'HoverContainer' })
const props = withDefaults(defineProps<Props>(), {
  mode: 'light',
  tooltipContent: '',
  placement: 'bottom'
})

const showTooltip = computed(() => {
  return Boolean(props.tooltipContent)
})

const contentCls = computed(() => {
  return props.mode === 'light' ? 'hover:bg-primary_hover' : 'hover:bg-primary_outline'
})
</script>
