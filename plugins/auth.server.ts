import { getAuth } from "firebase-admin/auth"

import { initializeApp, cert } from "firebase-admin/app"

const serviceCredentials = process.env.FIREBASE_ADMIN_CREDENTIALS || ""

export const firebaseApp = initializeApp({
  credential: cert(JSON.parse(serviceCredentials)),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
})

// server side runtime
export default defineNuxtPlugin(async (nuxtApp) => {
  const token = useFirebaseToken()
  const auth = getAuth(firebaseApp)
  const authStore = useAuthStore()

  if (!token.value) return

  try {
    const result = await auth.verifyIdToken(token.value)
    authStore.user = await formatUser(result)
  } catch (error) {
    console.error("Not authenticated or invalid token")
  }
})
