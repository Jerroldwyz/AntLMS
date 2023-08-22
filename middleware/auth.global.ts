export default defineNuxtRouteMiddleware((to, from) => {
  const protectedRoutes = ['/', '/dashboard', '/protected', '/newcourse']
  const user = useFirebaseUser()
  console.log('Auth middleware: ', to.path)
  console.log('Current user: ', user.value)
})
