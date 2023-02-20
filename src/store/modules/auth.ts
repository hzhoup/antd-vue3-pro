interface AuthStore {
  token?: string
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
