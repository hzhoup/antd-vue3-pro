interface AuthStore {
  token?: string
  permissions?: string[]
}

export const useAuthStore = defineStore(
  'auth-store',
  () => {
    const state = reactive<AuthStore>({})

    return { ...toRefs(state) }
  },
  {
    persist: true
  }
)
