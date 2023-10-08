import { getAllUsers } from "../utils/db/users"

export default defineEventHandler(async (event) => {
  try {
    const allUser = await getAllUsers()
    return await allUser[0]
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
