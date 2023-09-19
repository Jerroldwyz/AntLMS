export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  console.log("isAdmin: ", authStore.isAdmin)

  if (!authStore.isAdmin) {
    return navigateTo("/auth/login")
  }
})
