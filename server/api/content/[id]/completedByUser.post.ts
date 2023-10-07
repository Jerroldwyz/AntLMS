import { camelCaseToUnderscore } from "~/server/utils/camelCaseToUnderscore"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // const prismaData = {
  //   enrollment_id: parseInt(body.enrollmentId),
  //   content_id: parseInt(body.contentId),
  //   user_id: body.userId,
  // }

  const prismaData = camelCaseToUnderscore(body)
  try {
    return await completeContent(prismaData)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
