<script setup lang="ts">
definePageMeta({
  middleware: "01-user",
})

const courses = ref()
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  try {
    courses.value = await fetchAllUserCreatedCourses()
  } finally {
    isLoading.value = false
  }
})

const createCourseDialog = ref(false)
const alertSuccess = ref(false)
const alertError = ref(false)

async function handleSubmit(status: boolean) {
  status ? (alertError.value = status) : (alertSuccess.value = status)
  courses.value = await fetchAllUserCreatedCourses()
}
</script>

<template>
  <v-progress-linear
    v-if="isLoading"
    color="primary"
    indeterminate
    :height="12"
  ></v-progress-linear>
  <div v-else>
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

    <v-container
      fluid
      class="d-flex flex-wrap"
      style="gap: 2em"
    >
      <CreateCourseBtn @click="createCourseDialog = true" />
      <Course
        v-for="course in courses"
        :id="course.id"
        :key="course.id"
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
  </div>
</template>
