import { createCourse } from "~~/server/db/mycourse"
import { Course } from "~~/types"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const course: Course = body.course

  return await createCourse(course)
})
