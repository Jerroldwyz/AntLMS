export async function submitContent(
  title: string,
  type: string,
  content: string,
  topicId: string,
) {
  await $fetch("/api/content", {
    method: "POST",
    body: {
      title,
      type,
      content,
      topicId: parseInt(topicId),
    },
  })
}
