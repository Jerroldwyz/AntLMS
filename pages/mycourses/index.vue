<script setup lang="ts">
import { courses } from "@prisma/client"

const createCourseDialog = ref(false)
const courseSuccessAlert = ref(false)
const courseFailureAlert = ref(false)

function handleCourseOutcome(value: "success" | "failure") {
  createCourseDialog.value = false
  if (value === "success") {
    courseSuccessAlert.value = true
    fetchCourses()
  }

  if (value === "failure") {
    courseFailureAlert.value = true
  }
}

const courses = ref<courses[] | null>(null)

const user = useUser()

async function fetchCourses() {
  const allCourses = await $fetch("/api/mycourses/all", {
    method: "get",
    query: { userId: user.value?.uid },
  })

  if (allCourses != null) {
    courses.value = allCourses
  }
}

fetchCourses()
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

  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <CreateCourseBtn @click="createCourseDialog = true" />
      </v-col>
      <v-col
        cols="2"
        v-for="course in courses"
      >
        <Course
          :key="course.id"
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
          @course-outcome="handleCourseOutcome"
          @close="createCourseDialog = false"
        />
      </v-row>
    </v-container>
  </v-dialog>
</template>
