import { content_type } from "@prisma/client"
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prismaData = {
    title: body.title as string,
    type: body.type as content_type,
    content: body.content as string,
    topic_id: body.topicId as number,
    topic_position: body.topicPosition as number,
  }

  try {
    return await createContent(prismaData)
  } catch (e) {
    return sendError(event, primsaErrorHandler(e))
  }
})
