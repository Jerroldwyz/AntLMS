<template>
  <div>Only admin can access this content</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "02-admin",
})
</script>
