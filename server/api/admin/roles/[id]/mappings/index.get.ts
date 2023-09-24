export default defineEventHandler(async (event) => {
  const roleId = getRouterParam(event, "id")

  try {
    return await getRolePermissionMappings(parseInt(roleId as string))
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
