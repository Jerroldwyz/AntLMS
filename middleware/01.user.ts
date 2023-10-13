export default defineNuxtRouteMiddleware((to, from) => {
  const token = useFirebaseToken()
  const userStore = useUserStore()

  // if(process.server) return

  if (!userStore.user) {
    return navigateTo("/auth/login")
  }
})
