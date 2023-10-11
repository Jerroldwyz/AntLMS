import { getRoles } from "~~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  try {
    return await getRoles()
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
