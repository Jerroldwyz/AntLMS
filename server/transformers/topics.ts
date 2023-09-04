import { contentTransformer } from "./content"

export const topicsTransformer = (topic: any) => {
  const val = {
    title: topic.title,
    content: topic.content.map(contentTransformer),
  }

  return val
}
