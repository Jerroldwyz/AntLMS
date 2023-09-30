<script setup lang="ts">
import { Course } from "~/types"

definePageMeta({
  middleware: ["user"],
})

const loading = ref(false)
const alertSuccess = ref(false)
const alertError = ref(false)

const route = useRoute()
const course = ref<Course>(await fetchUserCourse(route.params.id))
const file = ref<File[]>([])

async function submitCourse() {
  try {
    loading.value = true
    if (file.value[0]) {
      const newThumbnail = await uploadImage(file.value[0])
      await deleteImage(course.value.thumbnail)
      course.value.thumbnail = newThumbnail
    }
    console.log(course.value)
    await updateCourse(course.value, route.params.id)
    loading.value = false
    alertSuccess.value = true
  } catch (e) {
    alertError.value = true
  }
}
</script>
<template>
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
  <v-container fluid>
    <v-container
      class="d-flex"
      style="gap: 2em"
      fluid
    >
      <FormCourseEdit
        v-model:course="course"
        v-model:file="file"
      />
      <ContentList :course="course" />
    </v-container>
    <v-container
      class="d-flex align-end"
      fluid
    >
      <v-card class="d-flex justify-end bg-grey-lighten-3 w-100 pa-2">
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
      </v-card>
    </v-container>
  </v-container>
</template>
