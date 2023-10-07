import { parseParams } from "~/server/utils/validation/validator"
import { getRolePermissionMappings } from "~/server/utils/db/admin"

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

  try {
    return await getRolePermissionMappings(parseInt(roleId as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
