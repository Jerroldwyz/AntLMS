export default defineNuxtRouteMiddleware((to, from) => {
  const token = useFirebaseToken()
  if (process.server) {
    return
  }

  if (!token.value) {
    // return navigateTo("/auth/login")
  }
})
