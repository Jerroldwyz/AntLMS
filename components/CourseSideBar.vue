<template>
  <v-navigation-drawer
    color="surface"
    :width="300"
  >
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item
        :title="props.course.title"
        :subtitle="props.course.creator.name"
        :to="`/courses/${props.course.id}`"
      ></v-list-item>
      <template
        v-for="topic in props.course.topics"
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
              :prepend-icon="onContentComplete(false)"
              :append-icon="setContentIcon(content)"
              :to="contentPath(content.type, topic.id, content.id)"
              >{{ content.title }}</v-list-item
            >
          </div>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const props = defineProps(["course"])

const onContentComplete = (complete: boolean) => {
  return complete ? "mdi-check" : "mdi-circle-outline"
}

const contentPath = (type: string, topicId: number, contentId: number) => {
  let path = `/courses/${props.course.id}/topics/${topicId}/content/${contentId}`
  if (type !== "TEXT") {
    path = `/courses/${props.course.id}/topics/${topicId}/quizzes/${contentId}`
  }
  return path
}

function setContentIcon(content: any): string {
  switch (content.type) {
    case "TEXT":
      return "mdi-text-box-outline"
    case "VIDEO":
      return "mdi-video-box"
    default:
      return "mdi-pencil-circle"
  }
}

const combineList = (topic: any) => {
  return topic.content.concat(topic.quizzes)
}
</script>

<style scoped></style>
