<template>
  <NuxtLayout name="course">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "user",
})
</script>

<style scoped></style>
