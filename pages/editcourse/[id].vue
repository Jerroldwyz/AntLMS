<script setup lang="ts">
import { Course } from "~/types"

definePageMeta({
  middleware: ["user"],
})

const loading = ref(false)
const alertSuccess = ref(false)
const alertError = ref(false)

const route = useRoute()

const { data: course } = useFetch<Course>(
  () => `/api/mycourses/${route.params.id}`,
)

async function refreshCourse() {
  course.value = await $fetch(`/api/mycourses/${route.params.id}`)
}

const file = ref<File[]>([])

async function submitCourse() {
  if (course.value !== null) {
    try {
      loading.value = true
      if (file.value.length > 0) {
        const newThumbnail = await uploadImage(file.value[0])
        await deleteImage(course.value.thumbnail)
        course.value.thumbnail = newThumbnail
      }
      await updateCourse(course.value, route.params.id)
      alertSuccess.value = true
    } catch (e) {
      alertError.value = true
    } finally {
      loading.value = false
    }
  }
}

function validRoute() {
  return (
    route.name !== "editcourse-id-topic-topicid-newcontent-text" &&
    route.name !== "editcourse-id-topic-topicid-newcontent-quiz-id"
  )
}
</script>
<template>
  <template v-if="validRoute()">
    <v-alert
      v-model="alertSuccess"
      type="success"
      density="compact"
      title="Course Updated"
      rounded="0"
      closable
    ></v-alert>
    <v-alert
      v-model="alertError"
      type="error"
      density="compact"
      title="Course Not Updated"
      rounded="0"
      closable
      text="Something went wrong. Please try again later."
    ></v-alert>

    <h1 class="mb-2 text-h4 font-weight-medium">Edit Course</h1>
    <v-divider></v-divider>
    <v-container fluid>
      <v-container
        class="d-flex"
        style="gap: 2em"
        fluid
      >
        <template v-if="course !== null">
          <FormCourseEdit
            v-model:course="course"
            v-model:file="file"
          />
          <ContentList
            v-model:course="course"
            @delete="refreshCourse"
          />
        </template>
      </v-container>
      <v-container
        class="d-flex align-end"
        fluid
      >
        <v-container
          class="d-flex justify-end bg-grey-lighten-3 pa-2"
          fluid
        >
          <v-btn
            class="text-capitalize"
            variant="text"
            @click="navigateTo('/mycourses')"
          >
            Cancel
          </v-btn>
          <v-btn
            class="text-capitalize bg-primary"
            :loading="loading"
            @click="submitCourse"
          >
            Save Changes
          </v-btn>
        </v-container>
      </v-container>
    </v-container>
  </template>

  <NuxtPage />
</template>
