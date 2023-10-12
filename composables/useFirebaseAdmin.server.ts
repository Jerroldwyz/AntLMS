import { App, cert, getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

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

const auth = getAuth(useFirebaseAdmin()!)
const adminUid = process.env.FIREBASE_ADMIN_UID as string
auth
  .getUser(adminUid)
  .then((userRecord) => {
    const isAdmin =
      userRecord.customClaims && userRecord.customClaims.admin === true

    if (!isAdmin) {
      // account: ant.lms.classbus@gmail.com
      // password: admin123
      auth
        .setCustomUserClaims(adminUid, { admin: true })
        .then(() => console.log(`User ${adminUid} is now an admin`))
        .catch((error) => {
          console.error("Error setting custom claims:", error)
        })
    }
  })
  .catch(() => {
    console.error("User does not exist:", adminUid)
  })
