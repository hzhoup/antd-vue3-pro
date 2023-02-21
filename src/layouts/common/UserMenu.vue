<template>
  <div class="flex-y-center justify-end">
    <HoverContainer mode="dark">
      <span class="text-gray-300">
        {{ user.info.realName }}
      </span>
    </HoverContainer>
    <HoverContainer mode="dark">
      <a-dropdown>
        <div class="flex-y-center gap-x-12px">
          <a-avatar :src="user.info.avatar" size="small" />
          <span class="text-gray-300">
            {{ user.info.realName }}
          </span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <template #icon>
                <IconAntDesignKeyOutlined />
              </template>
              修改密码
            </a-menu-item>
            <a-menu-item>
              <template #icon>
                <IconAntDesignLogoutOutlined />
              </template>
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </HoverContainer>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'

defineOptions({ name: 'UserMenu' })
const user = useUserStore()
</script>
