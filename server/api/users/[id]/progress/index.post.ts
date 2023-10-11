import { createEnrollmentProgress } from "~/server/utils/db/enrollment"

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id") as string
  const body = await readBody(event)
  const enrollmentId = parseInt(body.enrollmentId as string)
  const contentId = parseInt(body.contentId as string)

  try {
    return await createEnrollmentProgress(enrollmentId, contentId, userId)
  } catch (error) {
    return sendError(event, prismaErrorHandler(error))
  }
})
