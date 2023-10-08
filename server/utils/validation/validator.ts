import { Schema, ValidationError } from "yup"

export const validateAndParse = async (schemaObject: {
  schema: Schema
  value: any
  msgOnError: string
}) => {
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
