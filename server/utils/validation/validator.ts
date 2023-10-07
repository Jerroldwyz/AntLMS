import { ValidationError } from "yup"

export const validateAndParse = async (
  schema: any,
  value: any,
  msgOnError: string,
) => {
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
