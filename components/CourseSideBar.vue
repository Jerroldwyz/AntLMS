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

          <template
            v-for="content in topic.content"
            :key="content.topic_position"
          >
            <v-divider class="border-opacity-25"></v-divider>
            <v-list-item
              active-color="primary"
              :value="content.title"
              :prepend-icon="onContentComplete(false)"
              :to="contentPath(topic.id, content.id)"
            >
              {{ content.title }}</v-list-item
            >
          </template>
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

const contentPath = (topicId: number, contentId: number) => {
  return `/courses/${props.course.id}/topics/${topicId}/content/${contentId}`
}
</script>

<style scoped></style>
