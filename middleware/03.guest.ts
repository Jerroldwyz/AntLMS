export default defineNuxtRouteMiddleware((to, from) => {
  const token = useFirebaseToken()
  // if (token.value) {
  //   return navigateTo("/")
  // }
})
