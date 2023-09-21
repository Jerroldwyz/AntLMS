export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (process.env.NODE_ENV !== "development") {
    if (!authStore.user) return navigateTo("/auth/login")
  }
})
