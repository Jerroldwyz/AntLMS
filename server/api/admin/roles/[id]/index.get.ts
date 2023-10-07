import { parseParams } from "~/server/utils/validation/validator"
import { getRoleById } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  const roleId = getRouterParam(event, "id")

  parseParams({
    routeParams: [
      {
        name: "id",
        value: roleId,
        type: "number",
      },
    ],
  })

  let data
  try {
    data = await getRoleById(parseInt(roleId as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
  if (data === null) {
    throw createError({
      statusCode: 404,
      statusMessage: "Role ID does not exist",
    })
  }

  return data
})
