<script setup lang="ts">
import { fetchAllEnrolledCourses } from "~/utils/course-helpers"
definePageMeta({
  middleware: "01-user",
})
const isLoading = ref(true)
const courses = ref()

onMounted(async () => {
  isLoading.value = true
  try {
    courses.value = await fetchAllEnrolledCourses()
  } finally {
    isLoading.value = false
  }
})

const handleOnClick = async (courseId: number) => {
  await navigateTo(`/courses/${courseId}`)
}
</script>

<template>
  <div>
    <v-progress-linear
      v-if="isLoading"
      color="primary"
      indeterminate
      :height="12"
    ></v-progress-linear>
    <v-row v-else>
      <CourseTile
        v-for="course in courses"
        :id="course.id"
        :key="course.id"
        :title="course.title"
        :thumbnail="course.thumbnail"
        @click="handleOnClick(course.id)"
      />
    </v-row>
  </div>
</template>
