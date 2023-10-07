import { deleteRolePermissionMapping } from "~/server/utils/db/admin"
import { parseParams } from "~/server/utils/validation/validator"

export default defineEventHandler(async (event) => {
  const roleId = getRouterParam(event, "id")
  const body = await readBody(event)
  const permissionId = body.permission_id

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
        name: "permission_id",
        value: permissionId,
        type: "number",
      },
    ],
  })

  try {
    return await deleteRolePermissionMapping(
      parseInt(roleId as string),
      permissionId,
    )
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
