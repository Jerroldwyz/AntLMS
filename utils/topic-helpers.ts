export async function addTopic(
  courseId: number,
  title: string,
  position: number,
) {
  await $fetch("/api/topics", {
    method: "POST",
    body: {
      courseId,
      title,
      position,
    },
  })
}

export async function removeTopic(topicId: number) {
  await $fetch(`/api/topics/${topicId}`, {
    method: "DELETE",
  })
}
