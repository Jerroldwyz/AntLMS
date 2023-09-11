<script setup lang="ts">
import useCourse from "~~/composables/useCourse"

const { fetchAllUserCourses } = useCourse()

const createCourseDialog = ref(false)
const alertSuccess = ref(false)
const alertError = ref(false)

const courses = await fetchAllUserCourses()

async function handleSubmit(status: boolean) {
  status ? (alertError.value = status) : (alertSuccess.value = status)
  courses.value = (await fetchAllUserCourses()).value
}
</script>

<template>
  <v-alert
    v-model="alertError"
    type="success"
    density="compact"
    title="Course Created"
    rounded="0"
    closable
    text="Click on the course you just created in order to add further information."
  ></v-alert>
  <v-alert
    v-model="alertSuccess"
    type="error"
    density="compact"
    title="Course Not Created"
    rounded="0"
    closable
    text="Something went wrong. Please try again later."
  ></v-alert>

  <v-container
    fluid
    class="d-flex flex-wrap"
    style="gap: 2em"
  >
    <CreateCourseBtn @click="createCourseDialog = true" />
    <Course
      v-for="course in courses"
      :key="course.id"
      :id="course.id"
      :title="course.title"
      :thumbnail="course.thumbnail"
    />
  </v-container>

  <v-dialog v-model="createCourseDialog">
    <v-container fluid>
      <v-row justify="center">
        <FormCourseCreate
          @submit="handleSubmit"
          @close="createCourseDialog = false"
        />
      </v-row>
    </v-container>
  </v-dialog>
</template>
