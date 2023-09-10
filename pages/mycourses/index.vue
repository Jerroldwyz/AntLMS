<script setup lang="ts">
import useCourse from "~~/composables/useCourse"

const { fetchAllUserCourses } = useCourse()

const createCourseDialog = ref(false)
const alertSuccess = ref(false)
const alertError = ref(false)

const courses = await fetchAllUserCourses()

async function handleAlert(status: boolean) {
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

  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <CreateCourseBtn @click="createCourseDialog = true" />
      </v-col>
      <v-col
        cols="2"
        v-for="course in courses"
        :key="course.id"
      >
        <Course
          :id="course.id"
          :title="course.title"
          :thumbnail="course.thumbnail"
        />
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="createCourseDialog">
    <v-container fluid>
      <v-row justify="center">
        <FormCourseCreate
          @success="handleAlert"
          @close="createCourseDialog = false"
        />
      </v-row>
    </v-container>
  </v-dialog>
</template>
