<script setup>
definePageMeta({
  layout: "admin",
  middleware: "02-admin",
})
</script>

<template>
  <h1 class="mb-4">Admin Panel - Courses</h1>
  <div>
    <AdminCourseTable></AdminCourseTable>
  </div>
</template>
