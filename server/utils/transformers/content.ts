export const contentTransformer = (content: any) => {
  console.log(content)

  const val: any = {
    id: content.id,
    topicId: content.topic_id,
    title: content.title,
    type: content.type,
    topicPosition: content.topic_position ?? NaN,
  }

  if (content.content !== undefined) {
    val.content = content.content ?? 0
  }

  return val
}
