import { getManagers } from "~~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  try {
    return await getManagers()
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
