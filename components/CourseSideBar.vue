<template>
  <v-navigation-drawer
    color="grey-lighten-2"
    :width="300"
  >
    <v-divider></v-divider>
    <v-list-item
      :title="props.course.title"
      :subtitle="props.course.creator"
      class="text-h3"
    ></v-list-item>
    <v-list nav>
      <template
        v-for="topic in props.course.topics"
        :key="topic.title"
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
            v-for="(content, i) in topic.content"
            :key="i"
          >
            <v-divider class="border-opacity-25"></v-divider>
            <v-list-item
              :value="content.title"
              :prepend-icon="onContentComplete(content.complete)"
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

console.log(props.course)

const onContentComplete = (complete: boolean) => {
  return complete ? "mdi-check" : "mdi-circle-outline"
}

const contentPath = (topicId: number, contentId: number) => {
  return `/demo/topics/${topicId}/content/${contentId}`
}
</script>

<style scoped></style>
