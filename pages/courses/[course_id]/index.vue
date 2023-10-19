<template>
  <div>
    <p class="text-h2">Welcome to</p>
    <p class="text-h4">{{ course.title }}</p>
    <div class="my-3">
      <v-chip
        v-for="(tag, index) in course.tags"
        :key="index"
        :value="tag"
        color="primary"
      >
        {{ tag }}
      </v-chip>
    </div>
    <p class="text-body-1">
      Published by
      <span class="text-green">
        {{ course.creator }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const course: any = await $fetch(`/api/courses/${route.params.course_id}`, {
  method: "GET",
})
</script>

<style scoped></style>
