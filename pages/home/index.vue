<script setup lang="ts">
definePageMeta({
  middleware: "01-user",
})
</script>

<template>
  <NuxtLink to="/demo"> Quiz </NuxtLink>
  <h1>Example test page</h1>
  <NuxtLink to="/mycourses"> View Courses </NuxtLink>
</template>
