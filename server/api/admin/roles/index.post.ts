export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = getRouterParam(event, "id")

  const name = body.name
  const permissionIds = body.permission_ids

  try {
    return await createRole(name, permissionIds)
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
