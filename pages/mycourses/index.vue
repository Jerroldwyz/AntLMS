<script setup lang="ts">
definePageMeta({
  middleware: ["user"],
})

const courses = ref(await fetchAllUserCreatedCourses())

const createCourseDialog = ref(false)
const alertSuccess = ref(false)
const alertError = ref(false)

async function refreshCourses() {
  courses.value = await fetchAllUserCreatedCourses()
}

async function handleSubmit(status: boolean) {
  status ? (alertSuccess.value = status) : (alertError.value = status)
  await refreshCourses()
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
    <v-col class="d-flex align-center">
      <h1 class="mb-2 text-h4 font-weight-medium">My Courses</h1>
    </v-col>
  </v-row>
  <v-divider class="mb-4"></v-divider>
  <v-row>
    <CreateCourseBtn @click="createCourseDialog = true" />
    <Course
      v-for="course in courses"
      :id="course.id"
      :key="course.id"
      :title="course.title"
      :thumbnail="course.thumbnail"
      @delete="refreshCourses"
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
