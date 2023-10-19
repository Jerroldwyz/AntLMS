import { storeToRefs } from "pinia"

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useFirebaseToken()

  if (token.value && to?.name === "/auth/login") {
    return navigateTo("/")
  }

  if (!token.value && to.name !== "/auth/login") {
    abortNavigation()
    return navigateTo("/auth/login")
  }
})
