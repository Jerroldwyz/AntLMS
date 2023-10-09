import { H3Event } from "h3"
import { ValidationError } from "yup"

export const validator = async (schema: any, event: H3Event) => {
  if (event.req.method === "GET") {
    return
  }
  const body = await readBody(event)

  try {
    schema.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    })
  } catch (e) {
    const error = e as ValidationError

    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage: JSON.stringify(error.errors),
      }),
    )
  }
}
