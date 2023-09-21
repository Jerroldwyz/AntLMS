export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // if (!authStore.user) return navigateTo("/auth/login")
})
