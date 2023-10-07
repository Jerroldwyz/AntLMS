import { parseParams } from "~/server/utils/validation/validator"
import { updateRolePermissionMappings } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  const roleId = getRouterParam(event, "id")
  const body = await readBody(event)
  const permissionIds = body.permission_ids

  parseParams({
    routeParams: [
      {
        name: "id",
        value: roleId,
        type: "number",
      },
    ],
    requestBodyParams: [
      {
        name: "permission_ids",
        value: JSON.stringify(permissionIds),
        type: "string[]",
      },
    ],
  })

  try {
    return await updateRolePermissionMappings(
      parseInt(roleId as string),
      permissionIds,
    )
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
