export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  if (process.server) {
    return
  }

  userStore.$subscribe((_, state) => {
    if (!state.isAdmin) {
      console.log("Admin middleware:", userStore.isAdmin)
      return navigateTo("/")
    }
  })
})
