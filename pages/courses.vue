<template>
  <NuxtLayout name="course">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "01-user",
})
</script>

<style scoped></style>
