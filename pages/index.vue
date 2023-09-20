<script setup lang="ts">
// const courses = await fetchAllUserCourses()
//
</script>

<template>
  <v-row>
    <CourseTile />
    <CourseTile></CourseTile>
    <CourseTile></CourseTile>
    <CourseTile></CourseTile>
    <CourseTile></CourseTile>
  </v-row>
</template>

// v-for="course in courses" // :id="course.id" // :key="course.id" //
:title="course.title" // :thumbnail="course.thumbnail"
