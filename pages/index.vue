<script setup lang="ts">
const courses = await fetchAllUserCourses()
// temp for testing
// const courses = await fetchAllCourses()
console.log(courses)
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
