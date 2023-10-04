export async function addTopic(courseId: string, title: string) {
  await $fetch("/api/topics", {
    method: "POST",
    body: {
      courseId,
      title,
    },
  })
}

export async function removeTopic(topicId: string) {
  await $fetch(`/api/topics/${topicId}`, {
    method: "DELETE",
  })
}
