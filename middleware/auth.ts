export default defineNuxtRouteMiddleware(async (to, from) => {
  const sessionCookie = useFirebaseToken()

  const { authenticated, admin } = await $fetch("/api/auth/authorize", {
    method: "POST",
    body: {
      session_cookie: sessionCookie.value,
    },
  })

  if (!authenticated) {
    return navigateTo("/auth/login")
  }

  if (admin) {
    return navigateTo("/admin")
  }
})
