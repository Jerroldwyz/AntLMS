import { deleteTopic } from "~~/server/db/topic"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await deleteTopic(parseInt(body.topicId as string))
})
