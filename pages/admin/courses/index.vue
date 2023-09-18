<script setup>
definePageMeta({
  layout: "admin",
})

const courses = await fetchAllCourses()
</script>

<template>
  <h1 class="mb-4">Admin Panel - Courses</h1>
  <v-text-field
    clearable
    label="Search"
    type="text"
    variant="outlined"
  >
  </v-text-field>

  <div>
    <AdminCourseTable :courses="courses"></AdminCourseTable>
  </div>
</template>
