import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { defineStore } from "pinia"
import { User } from "~~/types"

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null as User | null,
    isAdmin: false,
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
    async register({ ...userData }) {
      const { $firebaseAuth } = useNuxtApp()
      const firebaseUser = await (
        await createUserWithEmailAndPassword(
          $firebaseAuth,
          userData.email,
          userData.password,
        )
      ).user
      const userProps = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: `${userData.firstName} ${userData.lastName}`,
        contact_details: {
          phone_number: userData.phone_number,
        },
      }
      await $fetch("/api/signup", {
        method: "POST",
        body: userProps,
      })
        .catch((error) => console.error(error))
        .then(() => console.log("You have register"))
    },
    async login(email: string, password: string) {
      const { $firebaseAuth } = useNuxtApp()
      await signInWithEmailAndPassword($firebaseAuth, email, password).catch(
        (error) => {
          throw error
        },
      )
    },
    async logout() {
      const { $firebaseAuth } = useNuxtApp()
      await signOut($firebaseAuth).catch((error) => {
        throw error
      })
    },
  },
})
