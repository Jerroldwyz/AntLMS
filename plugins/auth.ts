export default defineNuxtPlugin(() => {
  addRouteMiddleware('auth', (to, from) => {
    const { $firebaseAuth } = useNuxtApp()
    // console.log('Auth middleware:', $firebaseAuth)

    // if (!$firebaseAuth.currentUser?.uid) {
    //   return navigateTo('/login')
    // }
  })
})
