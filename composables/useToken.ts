import { Unsubscribe, User } from 'firebase/auth'

export default () => {
  const { $firebaseAuth } = useNuxtApp()

  const token = useCookie('token')

  const firebaseUser = useUser()

  let unsubscribe: Unsubscribe

  onMounted(() => {
    // unsubscribe = $firebaseAuth.onIdTokenChanged(async (user: User) => {
    //   if (user) {
    //     token.value = await user.getIdToken()
    //     firebaseUser.value = formatUser(user)
    //   } else {
    //     token.value = null
    //     firebaseUser.value = null
    //   }
    // })
  })

  onUnmounted(() => {
    unsubscribe?.()
  })
}
