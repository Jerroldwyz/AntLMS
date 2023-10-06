export default defineEventHandler(async (event) => {
  const roleId = getRouterParam(event, "id")
  const body = await readBody(event)
  const permissionIds = body.permission_ids

  try {
    return await updateRolePermissionMappings(
      parseInt(roleId as string),
      permissionIds,
    )
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
