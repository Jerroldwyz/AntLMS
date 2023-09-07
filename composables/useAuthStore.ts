import { JsonObject } from "@prisma/client/runtime/library"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { defineStore } from "pinia"
import { User } from "~~/types"

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    fullName: (state) => state.user?.name,
    email: (state) => state.user?.email,
    initials: (state) => {
      const nameParts = state.user?.name.split(" ")
      const initials = nameParts
        ?.map((part) => part.charAt(0).toUpperCase())
        .join("")
      return initials
    },
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const { $firebaseAuth } = useNuxtApp()
        await signInWithEmailAndPassword($firebaseAuth, email, password)
      } catch (error) {
        throw error
      }
    },
    async logout() {
      try {
        const { $firebaseAuth } = useNuxtApp()
        await signOut($firebaseAuth)
      } catch (error) {
        throw error
      }
    },
  },
})
