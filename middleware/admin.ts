export default defineNuxtRouteMiddleware((to, from) => {
  if (appConfig() === "development") {
  } else {
    const authStore = useAuthStore()
    if (!authStore.isAdmin) {
      return navigateTo("/auth/login")
    }
  }
})
