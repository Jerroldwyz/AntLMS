import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

const serviceCredentials = process.env.FIREBASE_ADMIN_CREDENTIALS || ""

export const getFirebaseAdmin = () => {
  if (getApps().length) {
    return getApps()[0]
  }

  return initializeApp({
    credential: cert(JSON.parse(serviceCredentials)),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })
}

// config admin privilage
const auth = getAuth(getFirebaseAdmin())

const uid = "1RGmKw2HwGe0qcwNOSFpylWUBg22"

auth
  .getUser(uid)
  .then((userRecord) => {
    const isAdmin =
      userRecord.customClaims && userRecord.customClaims.admin === true

    if (!isAdmin) {
      // account: joe.admin@gmail.com
      // password: 123456
      auth
        .setCustomUserClaims(uid, { admin: true })
        .then(() => console.log(`User ${uid} is now an admin`))
        .catch((error) => {
          console.error("Error setting custom claims:", error)
        })
    }
  })
  .catch(() => {
    console.error("User does not exist:", uid)
  })
