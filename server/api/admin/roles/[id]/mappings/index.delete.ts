export default defineEventHandler(async (event) => {
  const roleId = getRouterParam(event, "id")
  const body = await readBody(event)

  const permission_id = body.permission_id

  try {
    return await deleteRolePermissionMapping(
      parseInt(roleId as string),
      permission_id,
    )
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
