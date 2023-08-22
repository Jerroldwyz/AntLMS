const protectedRoutes = ['/', '/dashboard', '/protected', '/newcourse']

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser()

  console.log(
    `[Auth global] direct to ${to.path} with user ${user.value?.email}`
  )

  // if (user.value) {
  //   return navigateTo(to.path)
  // }

  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})
