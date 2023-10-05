export default defineEventHandler(async (event) => {
  const managerId = getRouterParam(event, "uid")
  const body = await readBody(event)
  const roleId = body.roleId

  // try {
  return await updateManagerRoleMapping(managerId as string, roleId)
  // } catch (e) {
  //   return sendError(event, prismaErrorHandler(e))
  // }
})
