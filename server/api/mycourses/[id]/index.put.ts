import { updateCourse } from "~/server/utils/db/mycourse"

export default defineEventHandler(async (event) => {
  const courseId = getRouterParam(event, "id")
  const body = await readBody(event)

  const course = camelCaseToUnderscore(body)
  try {
    return await updateCourse(parseInt(courseId as string), course)
  } catch (e) {
    console.log(e)

    return sendError(event, prismaErrorHandler(e))
  }
})
