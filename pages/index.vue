<script setup lang="ts">
const courses = await fetchAllUserCourses()
const userStore = useUserStore()
const enrollments = await fetchUserEnrollment(userStore.user?.uid)
console.log(enrollments)
const onClickCourse = (courseId: number) => {
  navigateTo(`/courses/${courseId}`)
}
</script>

<template>
  <v-row>
    <CourseTile
      v-for="course in enrollments"
      :id="course.id"
      :key="course.id"
      :title="course.title"
      :thumbnail="course.thumbnail"
      @click="onClickCourse(course.id)"
    />
  </v-row>
</template>
