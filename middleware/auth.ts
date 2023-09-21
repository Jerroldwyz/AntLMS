export default defineNuxtRouteMiddleware((to, from) => {
  const allowedRoutes = ["/auth/login", "/auth/register", "/admin/login"]
  const isAllowedRoute = checkPath(allowedRoutes, to.path)

  if (isAllowedRoute) {
    return
  }

  const authStore = useAuthStore()
  const token = useFirebaseToken()

  // if (!authStore.user && !token) {
  //   return navigateTo("/auth/login")
  // }
})

const checkPath = (allowedRoutes: string[], target: string) => {
  return allowedRoutes.includes(target)
}
