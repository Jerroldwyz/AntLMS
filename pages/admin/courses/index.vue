<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
})
</script>

<template>
  <h1 class="mb-4">Admin Panel - Courses</h1>
  <div>
    <AdminCourseTable :courses="courses"></AdminCourseTable>
  </div>
</template>
