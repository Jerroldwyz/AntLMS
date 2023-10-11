import { getCourseByName, getCourseByTagId } from "~/server/utils/db/courses"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    const tag_ids = await getTags(query.searchQuery as string)
    const courseById = await getCourseByTagId(tag_ids as number[])
    const courseByName = await getCourseByName(query.searchQuery as string)

    const result = [...courseById, ...courseByName]

    return result
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
