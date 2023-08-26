import { defineStore } from 'pinia'
import { IUser } from '~~/types'

const route = '/api/account'

export const useUserStore = defineStore('user-store', {
  state: () => ({ users: [] as IUser[] }),
  actions: {
    // get all users
    async getAll() {
      try {
        let data = await $fetch<IUser[]>(route)
        this.users = data
        return data as IUser[]
      } catch (error) {
        console.error(error)
      }
    },
    // create new user
    async create({ ...user }) {
      await $fetch(route, {
        method: 'POST',
        body: user,
      })
        .catch((error) => console.error(error))
        .then(() => {
          console.log('User created')
        })
    },
  },
})
