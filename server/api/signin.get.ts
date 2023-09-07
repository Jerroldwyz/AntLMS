import { getAccountById } from "../db/account"

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "GET") {
    throw new Error("the request method must be get")
  }

  const query = await getQuery(event)
  const { userId } = query

  return await getAccountById(userId as string)
})
