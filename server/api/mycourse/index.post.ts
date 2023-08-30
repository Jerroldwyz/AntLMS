import { createCourse } from "~~/server/db/mycourse"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await createCourse(body as JSON)
})
