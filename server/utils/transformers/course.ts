import { content_type } from "@prisma/client"

export const courseTransformer = (course: any, user_id?: string) => {
  return {
    id: course.id,
    title: course.title,
    enabled: course.enabled,
    thumbnail: course.thumbnail ?? "",
    creatorId: course.creator_id,
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
    quizzes: topic.quizzes.map((q: any) => {
      return user_id ? quizTransformer(q, user_id) : quizTransformer(q)
    }),
  }

  return val
}

const quizTransformer = (quiz: any, user_id?: string) => {
  const val: any = {
    title: quiz.title,
    topicPosition: quiz.topic_position ?? 0,
  }

  if (quiz.progress !== undefined) {
    val.complete = quiz.progress.some((item: any) => item.user_id === user_id)
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

const contentTransformer = (content: any, user_id?: string) => {
  const val: Content = {
    title: content.title,
    type: content.type,
    topicPosition: content.topic_position ?? 0,
  }

  if (content.progress !== undefined) {
    val.complete = content.progress.some(
      (item: any) => item.user_id === user_id,
    )
  }

  if (content.content !== undefined) {
    val.content = content.content ?? 0
  }

  return val
}
