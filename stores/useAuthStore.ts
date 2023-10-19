import { defineStore, storeToRefs } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser(idToken: string) {
      const { data, pending }: any = await useFetch(`/api/auth/signin`, {
        method: "POST",
        body: {
          token: idToken,
        },
      })

      this.loading = pending

      if (data.value) {
        const { user } = storeToRefs(useUserStore())
        $fetch(`/api/auth/me/${data.value}`, {
          method: "GET",
        }).then((result: any) => {
          user.value = result
          this.isAuthenticated = true
        })
      }
    },
  },
})
