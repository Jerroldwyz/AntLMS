<script setup lang="ts">
import CourseCreationForm from "~~/components/forms/CourseCreationForm.vue"
const createCourseDialog = ref(false)
const courseCreatedAlert = ref(false)
const courseFailureAlert = ref(false)

function handleCourseOutcome(outcome: "success" | "failure") {
  if (outcome === "success") {
    createCourseDialog.value = false
    courseCreatedAlert.value = true
  }

  if (outcome === "failure") {
    createCourseDialog.value = false
    courseFailureAlert.value = true
  }
}

const courses = ref([
  {
    title: "Baking 101",
    img: "https://images.pexels.com/photos/9095/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Math 101",
    img: "https://media.istockphoto.com/id/1219382595/vector/math-equations-written-on-a-blackboard.webp?s=1024x1024&w=is&k=20&c=FuAlO8n7UyfykyqpZMhWpQD66wIJuIbgXG7ZQPRgoPk=",
  },
])
</script>

<template>
  <v-alert
    v-model="courseCreatedAlert"
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
      <v-col
        cols="2"
        v-for="course in courses"
      >
        <Course
          :title="course.title"
          :img="course.img"
        />
      </v-col>
      <v-col cols="2">
        <CreateCourseBtn @click="createCourseDialog = true" />
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="createCourseDialog">
    <v-container fluid>
      <v-row justify="center">
        <CourseCreationForm
          @course-outcome="handleCourseOutcome"
          @close="createCourseDialog = false"
        />
      </v-row>
    </v-container>
  </v-dialog>
</template>
