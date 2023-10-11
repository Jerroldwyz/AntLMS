<script setup lang="ts">
import { fetchAllEnrolledCourses } from "~/utils/course-helpers"
definePageMeta({
  middleware: ["user"],
})

const courses = await fetchAllEnrolledCourses()
const handleOnClick = async (courseId: number) => {
  await navigateTo(`/courses/${courseId}`)
}
const userStore = useUserStore()

userStore.$subscribe((mutate, state) => {})
</script>

<template>
  <v-row>
    <CourseTile
      v-for="course in courses"
      :id="course.id"
      :key="course.id"
      :title="course.title"
      :thumbnail="course.thumbnail"
      @click="handleOnClick(course.id)"
    />
  </v-row>
</template>
