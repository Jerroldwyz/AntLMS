import { useAuthStore } from "~~/composables/useAuthStore"

export default defineNuxtRouteMiddleware((to, from) => {
  const allowedRoutes = ["/login", "/register"]
  // const user = useUser()
  const authStore = useAuthStore()
  const isValidRoute = checkPath(allowedRoutes, to.path)
  if (isValidRoute && authStore.user) return navigateTo("/")

  if (!isValidRoute && !authStore.user) return navigateTo("/auth/login")
})

const checkPath = (allowedRoutes: string[], target: string) => {
  for (const route of allowedRoutes) {
    if (target.includes(route)) {
      return true
    }
  }

  return false
}
