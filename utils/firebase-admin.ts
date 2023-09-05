import { initializeApp, applicationDefault, cert } from "firebase-admin/app"

const serviceCredentials = process.env.FIREBASE_ADMIN_CREDENTIALS || ""

const app = initializeApp({
  credential: cert(JSON.parse(serviceCredentials)),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
})

export default app
