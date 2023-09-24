export default defineNuxtRouteMiddleware((to, from) => {
  const token = useFirebaseToken()
  if (process.server) {
    if (!token.value) {
      return navigateTo("/auth/login")
    }
  }
})
