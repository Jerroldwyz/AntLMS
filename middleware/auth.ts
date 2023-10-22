export default defineNuxtRouteMiddleware(async (to, from) => {
  const sessionCookie = useFirebaseToken()
  if (!sessionCookie.value) {
    return navigateTo("/auth/login")
  }

  const isAdmin = await $fetch("/api/auth/authorize", {
    method: "POST",
    body: {
      session_cookie: sessionCookie.value,
    },
  })

  if (isAdmin) {
    return navigateTo("/admin")
  }
})
