<template>
  <v-navigation-drawer
    color="surface"
    :width="300"
  >
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item
        :title="enrollment.course.title"
        :subtitle="enrollment.course.creator.name"
        :to="`/courses/${props.courseId}`"
      ></v-list-item>
      <template
        v-for="topic in enrollment.course.topics"
        :key="topic.id"
      >
        <v-divider class="border-opacity-100"></v-divider>
        <v-list-group :value="topic.title">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              class="pa-3"
              >{{ topic.title }}</v-list-item
            >
          </template>

          <div
            v-for="content in combineList(topic)"
            :key="content.topic_position"
          >
            <v-divider class="border-opacity-25"></v-divider>
            <v-list-item
              color="primary"
              :value="content.title"
              :to="contentPath(content.type, topic.id, content.id)"
              :append-icon="setContentIcon(content)"
            >
              <v-icon
                v-if="onContentComplete(content.type, content.id)"
                start
                icon="mdi-check"
                color="green"
              ></v-icon>
              <v-icon
                v-else
                start
                icon="mdi-circle-outline"
              ></v-icon>
              {{ content.title }}
            </v-list-item>
          </div>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const props = defineProps(["courseId"])

const courseProgressStore = useCourseProgressStore()

courseProgressStore.updateContentProgress(props.courseId)
courseProgressStore.updateQuizProgress(props.courseId)

courseProgressStore.$subscribe((mutation, state) => {
  console.log(state)
})

const enrollment = await fetchEnrolledCourse(props.courseId)

const onContentComplete = (type, contentId) => {
  let completed = false
  if (type === "TEXT") {
    completed =
      courseProgressStore.progress.findIndex(
        (content) => content.content_id === contentId,
      ) !== -1
  } else if (type === "VIDEO") {
  } else {
    completed =
      courseProgressStore.quizProgress.findIndex(
        (quiz) => quiz.quiz_id === contentId,
      ) !== -1
  }

  return completed
}

const contentPath = (type, topicId, contentId) => {
  let path = `/courses/${props.courseId}/topics/${topicId}/content/${contentId}`
  if (type !== "TEXT") {
    path = `/courses/${props.courseId}/topics/${topicId}/quizzes/${contentId}`
  }
  return path
}

function setContentIcon(content) {
  switch (content.type) {
    case "TEXT":
      return "mdi-text-box-outline"
    case "VIDEO":
      return "mdi-video-box"
    default:
      return "mdi-pencil-circle"
  }
}

const combineList = (topic) => {
  return topic.content.concat(topic.quizzes)
}
</script>

<style scoped></style>
