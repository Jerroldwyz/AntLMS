import { getTags } from "~/server/utils/db/tags"

export default defineEventHandler(async (event) => {
  try {
    return await getTags()
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
