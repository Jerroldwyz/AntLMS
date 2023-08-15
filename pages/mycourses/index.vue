<script setup lang="ts">
  import CourseCreationForm from "~~/components/forms/CourseCreationForm"

  const createDialog = ref(false)
</script>

<template>
  <v-btn @click="createDialog = true">Create Course</v-btn>
  <v-dialog v-model="createDialog">
    <div class="d-flex justify-center align-center">
      <CourseCreationForm />
    </div>
  </v-dialog>
</template>
