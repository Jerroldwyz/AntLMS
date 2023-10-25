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

export async function handleContentDone(contentId: number, courseId: number) {
  const userStore = useUserStore()
  const courseProgressStore = useCourseProgressStore()
  try {
    const result = await $fetch(`/api/users/${userStore.user?.uid}/progress`, {
      method: "POST",
      body: {
        enrollmentId: courseProgressStore.enrollmentId,
        contentId,
        userId: userStore.user?.uid,
      },
    })

    if (result) {
      courseProgressStore.updateContentProgress(courseId)
    }
  } catch (error) {
    alert(error)
  }
}
