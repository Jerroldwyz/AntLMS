import { getCourses } from '~~/server/db/mycourse'

export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  return await getCourses(query.courseId as string)
})
