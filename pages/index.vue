<script setup lang="ts">
const courses = await fetchAllEnrolledCourses()
const handleOnClick = async (courseId: number) => {
  await navigateTo(`/courses/${courseId}`)
}
</script>

<template>
  <div class="text-h4 font-weight-medium">Dashboard</div>
  <br />
  <v-row>
    <CourseTile
      v-for="course in courses"
      :id="course.id"
      :key="course.id"
      :title="course.title"
      :thumbnail="course.thumbnail"
      :home="true"
      @clicked="handleOnClick(course.id)"
    />
  </v-row>
</template>
