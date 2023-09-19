<script setup lang="ts">
definePageMeta({
  middleware: ["user"],
})
</script>

<template>
  <h1>Example test page</h1>
  <NuxtLink to="/mycourses"> View Courses </NuxtLink>
</template>
