import { enrollUser } from "~~/server/db/enrollment"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await enrollUser(parseInt(body.courseId), body.userId as string)
})
