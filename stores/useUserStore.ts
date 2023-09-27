import { JsonObject } from "@prisma/client/runtime/library"
import { defineStore } from "pinia"
import { User } from "~~/types"

// store for user on client side
export const useUserStore = defineStore("current-user-store", {
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
    thumbnailUrl: (state) => {
      const currentThumbnail = state.user?.thumbnail
      let thumbnailUrl
      if (currentThumbnail) {
        getImage(currentThumbnail).then((url) => {
          thumbnailUrl = url
        })
      }

      return currentThumbnail
    },
    async register({ ...user }) {
      await $fetch("/api/signup", {
        method: "POST",
        body: user,
      })
        .catch((error) => console.error(error))
        .then(() => console.log("You have register"))
    },
  },
})
