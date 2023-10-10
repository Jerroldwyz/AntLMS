import { content_type } from "@prisma/client"

type Content = {
  id: number
  title: string
  type: content_type
  content?: string
  topicPosition: number
}

export const contentTransformer = (content: any) => {
  const val: Content = {
    id: content.id,
    title: content.title,
    type: content.type,
    topicPosition: content.topic_position ?? 0,
  }

  if (content.content !== undefined) {
    val.content = content.content ?? 0
  }

  return val
}
