import { getAuth } from "firebase-admin/auth"

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id")

  try {
    const result = await deleteUser(userId as string)
    const app = useFirebaseAdmin()!
    const auth = getAuth(app)
    await auth.deleteUser(userId as string)
    return result
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
