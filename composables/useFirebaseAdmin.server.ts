import { App, cert, getApps, initializeApp } from "firebase-admin/app"

let firebaseAdminApp: App | null = null

export const useFirebaseAdmin = (): App => {
  if (firebaseAdminApp) return firebaseAdminApp

  const apps = getApps()

  if (apps.length) {
    firebaseAdminApp = apps[0]
    return firebaseAdminApp
  }

  const serviceCredentials = process.env.FIREBASE_ADMIN_CREDENTIALS || ""

  if (!serviceCredentials) {
    throw new Error("Missing firebase admin credentials")
  }

  firebaseAdminApp = initializeApp({
    credential: cert(JSON.parse(serviceCredentials)),
  })

  return firebaseAdminApp
}
