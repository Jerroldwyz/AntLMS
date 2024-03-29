import { contentTransformer } from "./content"

export const topicsTransformer = (topic: any) => {
  const val = {
    id: topic.id,
    courseId: topic.course_id,
    title: topic.title,
    content: topic.content.map(contentTransformer),
    position: topic.position,
  }

  return val
}
