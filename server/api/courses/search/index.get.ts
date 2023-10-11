import { getCourseByTagId } from "~/server/utils/db/courses"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    const tag_ids = await getTags(query.tag_name as string)
    return await getCourseByTagId(tag_ids as number[])
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
