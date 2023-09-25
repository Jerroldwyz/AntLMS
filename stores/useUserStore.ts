import { defineStore } from "pinia"
import { User } from "~~/types"

// store for user on client side
export const useUserStore = defineStore("current-user-store", {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    fullName: (state) => state.user?.name,
    email: (state) => state.user?.email,
    initials: (state) => {
      const userName = state.user?.name || ""
      const nameParts = userName.split(" ")
      const initials = nameParts
        ?.map((part) => part.charAt(0).toUpperCase())
        .join("")
      return initials
    },
  },
  actions: {
    setUser(user: User | null) {
      this.user = user
    },
    async fetchUser() {},
  },
})
