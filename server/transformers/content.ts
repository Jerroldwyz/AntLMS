export const contentTransformer = (content: any) => {
  return {
    title: content.title,
    type: content.type,
    content: content.content,
    topicPosition: content.topic_position,
  }
}
