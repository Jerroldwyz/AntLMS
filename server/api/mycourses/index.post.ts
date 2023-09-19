import { Course } from "~~/types"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const course: Course = body

  try {
    return await createCourse(course)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
