const allowedRoutes = ['/auth/register', '/login']

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser()

  console.log(
    `[Auth global] direct to ${to.path} with user ${user.value?.email}`
  )

  if (!user.value && !allowedRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
})
