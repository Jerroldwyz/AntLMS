import { ValidationError, number } from "yup"
import { getPermissionById } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  const unvalidatedPermissionId = getRouterParam(event, "id")
  const permissionIdType = number().required().min(1)
  let permissionId

  try {
    permissionId = await permissionIdType.validate(unvalidatedPermissionId)
  } catch (e) {
    const error = e as unknown as ValidationError
    throw createError({
      statusCode: 400,
      statusMessage: `Bad Request router params: ${JSON.stringify(
        error.errors,
      )}`,
    })
  }

  let data
  try {
    data = await getPermissionById(permissionId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
  if (data === null) {
    throw createError({
      statusCode: 404,
      statusMessage: "Permission ID does not exist",
    })
  }

  return data
})
