export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (process.env.NODE_ENV !== "development") {
    if (authStore.user) {
      if (process.server) return navigateTo("/")

      return abortNavigation()
    }
  }
})
