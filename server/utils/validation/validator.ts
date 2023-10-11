import { AnySchema, InferType, ValidationError } from "yup"

export const validateAndParse = async <T>(schemaObject: {
  schema: AnySchema
  value: any
  msgOnError: string
}): Promise<T> => {
  const { schema, value, msgOnError } = schemaObject
  try {
    const parsedData = await schema.validate(value, { abortEarly: false })
    return parsedData
  } catch (e) {
    const error = e as unknown as ValidationError
    throw createError({
      statusCode: 400,
      statusMessage: `${msgOnError}: ${JSON.stringify(error.errors)}`,
    })
  }
}
