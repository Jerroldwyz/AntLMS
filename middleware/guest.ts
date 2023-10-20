export default defineNuxtRouteMiddleware((to, from) => {
  const sessionCookie = useFirebaseToken()
  if (sessionCookie.value) {
    return navigateTo("/")
  }
})
