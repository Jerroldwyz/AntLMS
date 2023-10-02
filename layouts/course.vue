<template>
  <div class="w-full px-2 py-16 sm:px-0 flex flex-col space-y-5">
    <CourseSideBar :course="dummyCourse" />
    <slot />
  </div>
</template>

<script setup lang="ts">
const courseId = 1309934237
const dummyCourse = await $fetch(`/api/courses/${courseId}`, {
  method: "GET",
})
</script>

<style scoped></style>
