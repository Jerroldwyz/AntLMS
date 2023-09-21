export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  console.log("isAdmin: ", authStore.isAdmin)

  if (process.env.NODE_ENV === "development") {
  } else if (!authStore.isAdmin) {
    return navigateTo("/auth/login")
  }
})
