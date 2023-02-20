<template>
  <div class="wh-full bg-[#f6f9f8] dark:bg-[#101014] transition duration-300 ease-in-out">
    <router-view v-slot="{ Component, route }">
      <transition appear mode="out-in" name="fade-slide">
        <keep-alive :include="[]">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'GlobalContent' })
</script>
