export default defineEventHandler(async (event) => {
  const permissionId = getRouterParam(event, "id")

  try {
    return await getPermissionById(parseInt(permissionId as string))
  } catch (e) {
    return sendError(event, prismaErrorHandler(e))
  }
})
