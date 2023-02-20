<template>
  <div class="app-loading flex-col-center wh-full bg-[#f4f7f9]" dark="bg-[#2c344a] text-[rgb(255 255 255 / 85%)]">
    <div
      class="app-loading-wrap absolute top-1\/2 left-1\/2 flex-col-center .-translate-x-1\/2 .-translate-y-1\/2 .-translate-z-0">
      <SystemLogo class="w-90px h-90px" />
      <div class="w-48px h-48px my-12">
        <div class="relative h-full animate-spin">
          <div
            v-for="(item, index) in lodingClasses"
            :key="index"
            :class="item"
            class="absolute w-16px h-16px bg-[#0065cc] rounded-8px animate-pulse"></div>
        </div>
      </div>
      <div class="flex-center text-30px text-[rgb(0 0 0 / 85%)] font-bold">{{ title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const title = import.meta.env.APP_TITLE

const lodingClasses = [
  'left-0 top-0',
  'left-0 bottom-0 animate-delay-500',
  'right-0 top-0 animate-delay-1000',
  'right-0 bottom-0 animate-delay-1500'
]
</script>
