export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId } = body

  return await deleteAccount(userId)
})
