export async function addTopic(courseId: number, title: string) {
  await $fetch("/api/topics", {
    method: "POST",
    body: {
      courseId,
      title,
    },
  })
}

export async function removeTopic(topicId: number) {
  await $fetch(`/api/topics/${topicId}`, {
    method: "DELETE",
  })
}
