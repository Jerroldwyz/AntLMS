<template>
  <div>
    <CourseSideBar :course="course" />
    <pre>
            {{ dummyCourse }}
        </pre
    >
  </div>
</template>

<script setup lang="ts">
import { ICourse } from "~/interfaces"

function sortContentByTopicPosition({ ...data }) {
  const sortedTopics = data.topics.map(({ ...topic }) => ({
    ...topic,
    content: topic.content.sort(
      (a: { topicPosition: number }, b: { topicPosition: number }) =>
        a.topicPosition - b.topicPosition,
    ),
  }))

  return { ...data, topics: sortedTopics }
}

const courseId = 413970944
const dummyCourse = await $fetch(`/api/courses/${courseId}`, {
  method: "GET",
})

const course = sortContentByTopicPosition(dummyCourse)
</script>

<style scoped></style>
