export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id")

  return await deleteUser(userId as string)
})
