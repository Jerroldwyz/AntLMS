import { getPermissions } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  try {
    return await getPermissions()
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
