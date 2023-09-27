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

function sortContentByTopicPosition(data: ICourse): ICourse {
  const sortedTopics = data.topics.map((topic) => ({
    ...topic,
    content: topic.content.sort((a, b) => a.topicPosition - b.topicPosition),
  }))

  return { ...data, topics: sortedTopics }
}

const courseId = 413970944
const dummyCourse: ICourse = await $fetch(`/api/courses/${courseId}`, {
  method: "GET",
})

const course = sortContentByTopicPosition(dummyCourse)
</script>

<style scoped></style>
