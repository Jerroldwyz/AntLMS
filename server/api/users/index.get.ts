import { getAllUsers } from "~/server/utils/db/users"

export default defineEventHandler(async (event) => {
  try {
    const users = await getAllUsers()
    return users
  } catch (error) {
    return sendError(event, prismaErrorHandler(error))
  }
})
