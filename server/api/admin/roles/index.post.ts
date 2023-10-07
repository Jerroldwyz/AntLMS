import { parseParams } from "~/server/utils/validation/validator"
import { createRole } from "~/server/utils/db/admin"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const name = body.name
  const permissionIds = body.permission_ids

  parseParams({
    requestBodyParams: [
      {
        name: "name",
        value: name,
        type: "string",
      },
      {
        name: "permission_ids",
        value: JSON.stringify(permissionIds),
        type: "string[]",
      },
    ],
  })

  try {
    return await createRole(name, permissionIds)
  } catch (e) {
    throw prismaErrorHandler(e)
  }
})
