export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  if (!userStore.user?.is_admin) {
    // return navigateTo("/")
  }
})
