import { getAuth } from "firebase-admin/auth"
import { useFirebaseAdmin } from "~/composables/useFirebaseAdmin.server"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const app = useFirebaseAdmin()!
  const auth = getAuth(app)
  try {
    const decodedToken = await auth.verifyIdToken(body.token)
    return decodedToken.uid
  } catch (error) {
    console.log(error)
  }
})
