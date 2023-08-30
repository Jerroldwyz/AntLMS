const allowedRoutes = ["/auth/register", "/auth/login"]

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser()

  // if (!user.value && !allowedRoutes.includes(to.path)) {
  //   return navigateTo('/auth/login')
  // }

  if (user.value) {
    if (allowedRoutes.includes(to.path)) {
      return navigateTo("/")
    }
  } else {
    if (!allowedRoutes.includes(to.path)) {
      return navigateTo("/auth/login")
    }
  }
})
