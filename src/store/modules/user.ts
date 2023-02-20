interface UserState {
  // 已加载权限路由
  isInitAuthRoute?: boolean
}

export const useUserStore = defineStore('user-store', () => {
  const state = reactive<UserState>({})

  return { ...toRefs(state) }
})
