<template>
  <div class="w-full flex flex-col">
    <CourseSideBar :course="enrollment.course" />
    <slot />
    <v-row v-if="route.params.topic_id">
      <v-btn @click="goToPrevious">Previous</v-btn>
      <v-btn
        color="secondary"
        @click="goToNext"
        >Next</v-btn
      >
    </v-row>
    <v-row v-else>
      <v-btn> Start </v-btn>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { topic } from "firebase-functions/v1/pubsub"

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

const courseContent = enrollment.course.topics

const currentContentId = ref<number>(parseInt(content_id as string))
const currentTopicId = ref<number>(parseInt(topic_id as string))

watch([() => route.params.content_id, () => route.params.topic_id], () => {
  currentContentId.value = parseInt(route.params.content_id as string)
  currentTopicId.value = parseInt(route.params.topic_id as string)
})

// Function to navigate to the previous content
const goToPrevious = () => {
  const topicIndex = courseContent.findIndex(
    (topic) => topic.id === currentTopicId.value,
  )
  console.log(topicIndex)
  const currentContentIndex = courseContent.findIndex(
    (content) => route.params.topic_id as unknown as number,
  )
  if (currentContentIndex > 0) {
    const previousContentId = courseContent[currentContentIndex - 1].id
    // router.push(`/courses/${route.params.course_id}/topics/${route.params.topic_id}/content/${previousContentId}`);
  }
}

// Function to navigate to the next content
const goToNext = () => {
  const topicIndex = courseContent.findIndex(
    (topic) => topic.id === currentTopicId.value,
  )
  if (topicIndex > 0) {
    const contents = courseContent[topicIndex].content
    const contentIndex = contents.findIndex(
      (content) => content.id === currentContentId.value,
    )
    if (contentIndex < contents.length - 1) {
      const nextContentId =
        courseContent[topicIndex].content[contentIndex + 1].id
      router.push(
        `/courses/${route.params.course_id}/topics/${route.params.topic_id}/content/${nextContentId}`,
      )
    }
  }
}

// Determine if there is a previous and next content
const hasPrevious = computed(() => {
  const currentContentIndex = courseContent.findIndex(
    (content) => route.params.topic_id as unknown as number,
  )
  return currentContentIndex > 0
})

const hasNext = computed(() => {
  const currentContentIndex = courseContent.findIndex(
    (content) => route.params.topic_id as unknown as number,
  )
  return currentContentIndex < courseContent.length - 1
})
</script>

<style scoped></style>
