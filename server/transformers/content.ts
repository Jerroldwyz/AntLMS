import { content_type } from "@prisma/client"

type Content = {
  title: string
  type: content_type
  content?: string
  topicPosition: number
}

export const contentTransformer = (content: any) => {
  console.log(content)

  const val: Content = {
    title: content.title,
    type: content.type,
    topicPosition: content.topic_position ?? 0,
  }

  if (content.content !== undefined) {
    val.content = content.content ?? 0
  }

  return val
}
