import { setCourseEnabled } from "~/server/utils/db/mycourse"

export default defineEventHandler(async (event) => {
  // TODO add logic to ensure a user can only change their own course
  const body = await readBody(event)

  return await setCourseEnabled(
    parseInt(body.courseId as string),
    body.enabled as boolean,
  )
})
