<template>
  <div>
    <a-divider>其他登录方式</a-divider>
    <div class="flex-center gap-x-24px">
      <a-button shape="circle">
        <template #icon>
          <IconParkOutlineWechat />
        </template>
      </a-button>
      <a-button shape="circle">
        <template #icon>
          <IconParkOutlineAlipay />
        </template>
      </a-button>
      <a-button shape="circle">
        <template #icon>
          <IconParkOutlineTencentQq />
        </template>
      </a-button>
      <a-button shape="circle">
        <template #icon>
          <IconParkOutlineWeibo />
        </template>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'OtherLogin' })
</script>
