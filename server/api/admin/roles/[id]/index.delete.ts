import { deleteRoleById } from "~/server/utils/db/admin"
import { parseParams } from "~/server/utils/validation/validator"

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
    return await deleteRoleById(parseInt(roleId as string))
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
