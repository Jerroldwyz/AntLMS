import { defineStore } from "pinia"
import { User } from "~~/types"

// store for user on client side
export const useCurrentUserStore = defineStore("current-user-store", {
  state: () => ({
    user: null as User | null,
  }),
  actions: {},
})
