export default defineNuxtRouteMiddleware((to, from) => {
  if (appConfig() === "development") {
  } else {
    const authStore = useAuthStore()
    if (authStore.user) {
      if (process.server) return navigateTo("/")

      return abortNavigation()
    }
  }
})
