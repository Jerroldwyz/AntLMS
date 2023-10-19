import { storeToRefs } from "pinia"

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useFirebaseToken()
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)

  // token exist
  if (token.value) {
    isAuthenticated.value = true
  }

  if (token.value && to?.name === "/auth/login") {
    return navigateTo("/")
  }

  if (!token.value && to.name !== "/auth/login") {
    abortNavigation()
    return navigateTo("/auth/login")
  }
})
