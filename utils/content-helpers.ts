export async function submitContent(
  title: string,
  type: string,
  content: string,
  topicId: string,
  position: string,
) {
  await $fetch("/api/content", {
    method: "POST",
    body: {
      title,
      type,
      content,
      topicId: parseInt(topicId),
      topicPosition: parseInt(position),
    },
  })
}

export async function deleteContent(contentId: number) {
  await $fetch(`/api/content/${contentId}`, {
    method: "DELETE",
  })
}
