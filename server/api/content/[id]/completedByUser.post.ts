import { InferType, object, string, number } from "yup"
import { completeContent } from "~/server/utils/db/progress"
import { userIdSchema } from "~/server/utils/userIdSchema"

export default defineEventHandler(async (event) => {
  // Body params
  const unvalidatedBody = await readBody(event)
  const requestBodySchema = object({
    enrollmentId: number().required().integer().min(1),
    contentId: number().required().integer().min(1),
    userId: userIdSchema(),
  })
  type requestBodyType = InferType<typeof requestBodySchema>
  const body = await validateAndParse<requestBodyType>({
    schema: requestBodySchema,
    value: unvalidatedBody,
    msgOnError: "Bad request body params",
  })

  try {
    const prismaProgressObj = {
      enrollment_id: body.enrollmentId,
      content_id: body.contentId,
      user_id: body.userId,
    }
    await completeContent(prismaProgressObj)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
