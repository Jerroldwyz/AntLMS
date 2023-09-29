export default defineEventHandler(async (event) => {
  const managerId = getRouterParam(event, "uid")
  const body = await readBody(event)
  const roleId = body.roleId

  // try {
  return await createManagerRoleMapping(managerId as string, roleId)
  //   return
  // } catch (e) {
  //   return sendError(event, prismaErrorHandler(e))
  // }
})
