<script setup lang="ts">
definePageMeta({
  middleware: ["user"],
})

const courses = ref(await fetchAllUserCreatedCourses())

const createCourseDialog = ref(false)
const alertSuccess = ref(false)
const alertError = ref(false)

async function handleSubmit(status: boolean) {
  status ? (alertError.value = status) : (alertSuccess.value = status)
  courses.value = await fetchAllUserCreatedCourses()
}
</script>

<template>
  <v-alert
    v-model="alertSuccess"
    type="success"
    density="compact"
    title="Course Created"
    rounded="0"
    closable
    text="Click on the course you just created in order to add further information."
  ></v-alert>
  <v-alert
    v-model="alertError"
    type="error"
    density="compact"
    title="Course Not Created"
    rounded="0"
    closable
    text="Something went wrong. Please try again later."
  ></v-alert>

  <v-row>
    <v-col>
      <h1 class="mb-4">My Courses</h1>
    </v-col>
    <v-col class="d-flex justify-end">
      <v-btn
        class="mb-2 bg-primary"
        icon="mdi-plus"
      ></v-btn>
    </v-col>
  </v-row>
  <v-divider class="mb-2"></v-divider>
  <v-row>
    <Course
      v-for="course in courses"
      :id="course.id"
      :key="course.id"
      :title="course.title"
      :thumbnail="course.thumbnail"
    />
  </v-row>

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
