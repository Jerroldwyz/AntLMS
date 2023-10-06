import { getRoles } from "~~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  try {
    const data = await getRoles()
    return data
  } catch (e) {
    console.log(e)
    return sendError(event, prismaErrorHandler(e))
  }
})
