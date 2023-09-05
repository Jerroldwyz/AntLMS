<script setup lang="ts">
const createCourseDialog = ref(false)
const courseSuccessAlert = ref(false)
const courseFailureAlert = ref(false)

function handleCourseCreated(value: "success" | "failure") {
  createCourseDialog.value = false
  if (value === "success") {
    courseSuccessAlert.value = true
  }

  if (value === "failure") {
    courseFailureAlert.value = true
  }
}
</script>

<template>
  <v-alert
    v-model="courseSuccessAlert"
    type="success"
    density="compact"
    title="Course Created"
    rounded="0"
    closable
    text="Click on the course you just created in order to add further information."
  ></v-alert>
  <v-alert
    v-model="courseFailureAlert"
    type="error"
    density="compact"
    title="Course Not Created"
    rounded="0"
    closable
    text="Something went wrong. Please try again later."
  ></v-alert>

  <CourseGrid />

  <v-dialog v-model="createCourseDialog">
    <v-container fluid>
      <v-row justify="center">
        <FormCreateCourse
          @course-created="handleCourseCreated"
          @close="createCourseDialog = false"
        />
      </v-row>
    </v-container>
  </v-dialog>
</template>
