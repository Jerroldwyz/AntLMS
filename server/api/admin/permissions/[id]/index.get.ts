import { getPermissionById } from "~/server/utils/db/admin"
import { parseParams } from "~/server/utils/validation/validator"

export default defineEventHandler(async (event) => {
  const permissionId = getRouterParam(event, "id")

  parseParams({
    routeParams: [
      {
        name: "id",
        value: permissionId,
        type: "number",
      },
    ],
  })

  let data
  try {
    data = await getPermissionById(parseInt(permissionId as string))
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
