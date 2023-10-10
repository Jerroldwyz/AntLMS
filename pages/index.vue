<script setup lang="ts">
import { fetchAllEnrolledCourses } from "~/utils/course-helpers"

const courses = await fetchAllEnrolledCourses()
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
