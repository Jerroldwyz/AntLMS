import { getCourses } from '~~/server/db/courses'

export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  return await getCourses()
})
