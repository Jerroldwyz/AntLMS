import { defineStore } from 'pinia'
import { IUser } from '~~/types'

export const useUserStore = defineStore('user-store', {
  state: () => ({ users: [] as IUser[] }),
  actions: {
    // get all users
    async getAll() {
      try {
        let data = await $fetch<IUser[]>('/api/users')
        this.users = data
        return data as IUser[]
      } catch (error) {
        console.error(error)
      }
    },
    // create new user
    async create(uid: string, email: string) {
      await $fetch('/api/users/create', {
        method: 'POST',
        body: { uid, email },
      })
        .catch((error) => console.error(error))
        .then(() => {
          console.log('User created')
        })
    },
  },
})
