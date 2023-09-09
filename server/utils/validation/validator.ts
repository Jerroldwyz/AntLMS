import { H3Event } from "h3"
import { ValidationError } from "yup"

export const validator = async (schema: any, event: H3Event) => {
  const body = await readBody(event)
  const query = await getQuery(event)
  try {
    schema.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    })
    schema.validateSync(query, {
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
      })
    )
  }
}
