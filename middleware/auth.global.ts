export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser()
  if (to.path === "/auth/login" && user.value) return navigateTo("/")

  if (to.path !== "/auth/login" && !user.value) return navigateTo("/auth/login")
})
