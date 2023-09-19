import { getAuth } from "firebase-admin/auth"
import { auth } from "firebase-functions"
export default defineNuxtPlugin((nuxtApp) => {
  const firebaseApp = getFirebaseAdmin()
  const auth = getAuth(firebaseApp)
  auth.listUsers()
})
