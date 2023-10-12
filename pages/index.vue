<script setup lang="ts">
import { fetchAllEnrolledCourses } from "~/utils/course-helpers"
definePageMeta({
  middleware: "01-user",
})

const courses = ref(await fetchAllEnrolledCourses())
const userStore = useUserStore()

userStore.$subscribe(async (_, state) => {
  if (state.user) {
    courses.value = await fetchAllEnrolledCourses()
  }
})

const handleOnClick = async (courseId: number) => {
  await navigateTo(`/courses/${courseId}`)
}
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
