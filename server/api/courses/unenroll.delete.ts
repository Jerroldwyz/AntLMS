import { unenrollUser } from "~~/server/db/enrollment"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await unenrollUser(parseInt(body.courseId), body.userId as string)
})
