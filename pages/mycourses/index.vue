<script setup lang="ts">
  import CourseCreationForm from "~~/components/forms/CourseCreationForm"

  const createDialog = ref(false)
</script>

<template>
  <v-dialog v-model="createDialog">
    <CourseCreationForm />
  </v-dialog>
  <v-btn @click="createDialog = true">Create Course</v-btn>
</template>
