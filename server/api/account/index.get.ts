import { getAccountById } from "~~/server/db/account"

export default defineEventHandler(async (event) => {
  const query = await getQuery(event)
  const { userId } = query

  return await getAccountById(userId as string)
})
