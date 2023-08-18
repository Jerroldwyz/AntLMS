export default defineNuxtPlugin(() => {
  addRouteMiddleware('auth', () => {
    const { $firebaseAuth } = useNuxtApp()
    console.log('Auth middleware:', $firebaseAuth?.currentUser)

    if (!$firebaseAuth?.currentUser?.uid) {
      return navigateTo('/login')
    }
  })
})
