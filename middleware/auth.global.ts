export default defineNuxtRouteMiddleware((to, from) => {
  const allowedRoutes = ["/login", "/register"]
  const user = useUser()
  const isValidRoute = checkPath(allowedRoutes, to.path)
  if (isValidRoute) {
  } else if (!user.value) {
    return navigateTo("/auth/login")
  }
})

const checkPath = (allowedRoutes: string[], target: string) => {
  return allowedRoutes.includes(target)
}
