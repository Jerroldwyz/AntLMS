export default defineNuxtRouteMiddleware((to, from) => {
  const token = useFirebaseToken()

  if (token.value) {
    if (process.server) return navigateTo("/")
    return abortNavigation()
  }
})
