import { getCourses } from "~~/server/db/mycourse"
import { mycourseTransformer } from "~~/server/transformers/mycourse"

export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  return await getCourses(query.userId as string)
})
