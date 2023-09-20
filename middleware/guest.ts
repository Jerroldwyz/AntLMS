export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (authStore.user) {
    if (process.server) return navigateTo("/")

    return abortNavigation()
  }
})
