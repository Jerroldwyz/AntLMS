import { getAuth } from "firebase-admin/auth"

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const currentUser = authStore.user?.uid || ""
  console.log(currentUser)
  let isAdmin
  getAuth()
    .getUser(currentUser)
    .then((userRecord) => {
      isAdmin =
        userRecord.customClaims && userRecord.customClaims.admin === true
    })

  if (!isAdmin) {
    return navigateTo("/auth/login")
  }
})
