export default defineNuxtRouteMiddleware((to, from) => {
  const allowedRoutes = ["/login", "/register"]
  const user = useUser()
  const isValidRoute = checkPath(allowedRoutes, to.path)
  if (isValidRoute && user.value) return navigateTo("/")

  if (!isValidRoute && !user.value) return navigateTo("/auth/login")
})

const checkPath = (allowedRoutes: string[], target: string) => {
  for (const route of allowedRoutes) {
    if (target.includes(route)) {
      return true
    }
  }

  return false
}
