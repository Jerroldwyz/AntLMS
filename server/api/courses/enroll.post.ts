import { error } from "console"
import { enrollUser } from "~~/server/db/enrollment"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await enrollUser(parseInt(body.courseId), body.userId as string)
  } catch (Exception) {
    throw createError({
      statusMessage: "The enrollment already exists",
    })
  }
})
