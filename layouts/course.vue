<template>
  <div class="w-full flex flex-col">
    <CourseSideBar :course="enrollment.course" />
    <div class="mx-16">
      <slot />
    </div>
    <div class="ma-10">
      <v-row
        v-if="route.params.topic_id"
        class="d-flex flex-row justify-space-around"
      >
        <v-btn
          color="primary"
          class="text-none"
          variant="outlined"
          size="x-large"
          prepend-icon="mdi-arrow-left"
          :disabled="isStart"
          @click="goPrevious"
          >Previous</v-btn
        >
        <v-btn
          class="text-none"
          color="primary"
          size="x-large"
          append-icon="mdi-arrow-right"
          :disabled="isEnd"
          @click="goNext"
          >Next</v-btn
        >
      </v-row>
      <v-row v-else>
        <v-btn color="primary"> Start </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tuple } from "yup"

const route = useRoute()
const router = useRouter()
const { course_id, topic_id, content_id } = route.params
const userStore = useUserStore()
const enrollment = await $fetch(
  `/api/users/${userStore.user?.uid}/enrollments/${course_id}`,
  {
    method: "GET",
  },
)

const topics = enrollment.course.topics
const totalTopics = topics.length

const currentTopic = () => {
  const topicId = parseInt(route.params.topic_id as string)
  return topics.filter((topic) => topic.id === topicId)[0]
}

const currentContent = () => {
  const topic = currentTopic()
  const contentIdParams = route.params.content_id
  if (!contentIdParams) {
    const quizId = parseInt(route.params.quiz_id as string)
    return topic.quizzes.filter((quiz) => quiz.id === quizId)[0]
  }
  const contentId = parseInt(route.params.content_id as string)
  return topic.content.filter((content) => content.id === contentId)[0]
}

const currentIndices = () => {
  const topicId = currentTopic().id
  const contentId = currentContent().id
  const topicIndex = topics.findIndex((topic) => topic.id === topicId)
  const contentIndex = topics[topicIndex].content.findIndex(
    (content) => content.id === contentId,
  )
  return {
    currentTopicIndex: topicIndex,
    currentContentIndex: contentIndex,
  }
}

const goNext = () => {
  const { currentTopicIndex, currentContentIndex } = currentIndices()
  const nextContentIndex =
    currentContentIndex === -1 ? 0 : currentContentIndex + 1
  const nextTopicIndex =
    currentContentIndex === -1 ? currentTopicIndex + 1 : currentTopicIndex
  const nextTopicId = topics[nextTopicIndex].id
  const totalContents = currentTopic().content.length
  if (nextContentIndex === totalContents) {
    const nextQuizId =
      topics[nextTopicIndex].quizzes[nextContentIndex - totalContents].id
    router.push(
      `/courses/${course_id}/topics/${nextTopicId}/quizzes/${nextQuizId}`,
    )
  } else {
    const nextContentId = topics[nextTopicIndex].content[nextContentIndex].id
    router.push(
      `/courses/${course_id}/topics/${nextTopicId}/content/${nextContentId}`,
    )
  }
}

const goPrevious = () => {
  const { currentTopicIndex, currentContentIndex } = currentIndices()
  const totalContents = currentTopic().content.length
  let previousContentIndex =
    currentContentIndex === 0 ? -1 : currentContentIndex - 1
  previousContentIndex =
    currentContentIndex === -1 ? totalContents - 1 : previousContentIndex
  const previousTopicIndex =
    currentContentIndex === 0 ? currentTopicIndex - 1 : currentTopicIndex
  const previousTopicId = topics[previousTopicIndex].id
  if (previousContentIndex === -1) {
    const previousQuizId =
      topics[previousTopicIndex].quizzes[previousContentIndex + 1].id
    router.push(
      `/courses/${course_id}/topics/${previousTopicId}/quizzes/${previousQuizId}`,
    )
  } else {
    const previousContentId =
      topics[previousTopicIndex].content[previousContentIndex].id
    router.push(
      `/courses/${course_id}/topics/${previousTopicId}/content/${previousContentId}`,
    )
  }
}

const isEnd = computed((): boolean => {
  const { currentTopicIndex, currentContentIndex } = currentIndices()
  return currentTopicIndex === totalTopics - 1 && currentContentIndex === -1
})

const isStart = computed((): boolean => {
  const { currentTopicIndex, currentContentIndex } = currentIndices()
  return currentTopicIndex === 0 && currentContentIndex === 0
})
</script>

<style scoped></style>
