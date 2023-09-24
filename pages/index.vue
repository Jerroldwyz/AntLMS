<script setup lang="ts">
const courses = await fetchAllCourses()
// const { id } = courses.value
console.log()
</script>

<template>
  <v-row>
    <CourseTile
      v-for="course in courses"
      :id="course.id"
      :key="course.id"
      :title="course.title"
      :thumbnail="course.thumbnail"
    />
  </v-row>
</template>
