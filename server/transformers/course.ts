import { content_type } from "@prisma/client"

export const courseTransformer = (course: any, user_id: string) => {
  return {
    id: course.id,
    title: course.title,
    thumbnail: course.thumbnail ?? "",
    creator: course.creator.name ?? "",
    topics: course.topics.map((topic: any) => {
      return topicsTransformer(topic, user_id)
    }),
    tags: course.course_tags.map((tags: any) => {
      return tags.tag.name
    }),
  }
}

const topicsTransformer = (topic: any, user_id?: string) => {
  const val = {
    title: topic.title,
    content: topic.content.map((c: any) => {
      return user_id ? contentTransformer(c, user_id) : contentTransformer(c)
    }),
  }

  return val
}

type Content = {
  title: string
  type: content_type
  content?: string
  topicPosition: number
  complete?: boolean
}

export const contentTransformer = (content: any, user_id?: string) => {
  console.log(content)

  const val: Content = {
    title: content.title,
    type: content.type,
    topicPosition: content.topic_position ?? 0,
  }

  if (content.progress !== undefined) {
    val.complete = content.progress.some(
      (item: any) => item.user_id === user_id
    )
  }

  if (content.content !== undefined) {
    val.content = content.content ?? 0
  }

  return val
}
