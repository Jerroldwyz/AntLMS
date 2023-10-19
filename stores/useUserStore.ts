import { JsonObject } from "@prisma/client/runtime/library"
import { defineStore } from "pinia"
import { User } from "~~/types"

// store for user on client side
export const useUserStore = defineStore("current-user-store", {
  state: () => ({
    uid: null as string | null,
    user: null as User | null,
    isAdmin: false,
  }),
  getters: {
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
    async updateThumbnail(thumbnailPath: string | null) {
      const userToUpdate = {
        name: this.user?.name,
        email: this.user?.email,
        thumbnail: thumbnailPath,
        contact_details: this.user?.contact_details,
      }

      const updatedUser: any = await updateAccount(this.user?.uid, userToUpdate)

      this.user = {
        is_admin: updatedUser.is_admin,
        uid: updatedUser.uid,
        email: updatedUser.email,
        name: updatedUser.name,
        thumbnail: updatedUser.thumbnail,
        contact_details: updatedUser.contact_details as JsonObject,
      }

      return {
        success: true,
      }
    },
    async updateDetails({ ...userData }) {
      const userToUpdate = {
        name: userData.name,
        email: userData.email,
        thumbnail: this.user?.thumbnail,
        contact_details: userData.contact_details,
      }

      const updatedUser: any = await updateAccount(this.user?.uid, userToUpdate)

      this.user = {
        is_admin: updatedUser.is_admin,
        uid: updatedUser.uid,
        email: updatedUser.email,
        name: updatedUser.name,
        thumbnail: updatedUser.thumbnail,
        contact_details: updatedUser.contact_details as JsonObject,
      }

      return {
        success: true,
      }
    },
  },
})
