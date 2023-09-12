import { getCourses } from "~~/server/db/mycourse"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return await getCourses(query.userId as string)
})
