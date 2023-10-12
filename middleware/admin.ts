export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  if (!userStore.isAdmin) {
    return navigateTo("/")
  }
})
