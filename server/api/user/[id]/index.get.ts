export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id")

  return await getUserById(userId as string)
})
