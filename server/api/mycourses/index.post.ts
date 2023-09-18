import Course from "~~/types/Course"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const course: Course = body

  return await createCourse(course)
})
