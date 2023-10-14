export default defineNuxtRouteMiddleware((to, from) => {
  if (appConfig() === "development") {
  } else {
    const token = useFirebaseToken()
    if (!token.value) {
      if (process.server) return navigateTo("/auth/login")
    }
  }
})
