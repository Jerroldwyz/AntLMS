import { createEnrollmentProgress } from "~/server/utils/db/enrollment"
import { contentCompleted } from "~/server/utils/db/progress"

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id") as string
  const body = await readBody(event)
  const enrollmentId = parseInt(body.enrollmentId as string)
  const contentId = parseInt(body.contentId as string)

  try {
    const hasCompleted = await contentCompleted(enrollmentId, contentId)
    if (!hasCompleted) {
      return await createEnrollmentProgress(enrollmentId, contentId, userId)
    } else {
      return null
    }
  } catch (error) {
    return sendError(event, prismaErrorHandler(error))
  }
})
