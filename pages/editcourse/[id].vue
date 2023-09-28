<script setup lang="ts">
import { Course } from "~/types"

definePageMeta({
  middleware: ["user"],
})

const contentTypeRules = [
  (value: string) => {
    if (value) return true
    return "You must select a content type!"
  },
]

const loading = ref(false)
const alertSuccess = ref(false)
const alertError = ref(false)

const showModal = ref(false)

const route = useRoute()
const course = ref<Course>(await fetchUserCourse(route.params.id))
const file = ref<File[]>([])

async function submitCourse() {
  try {
    loading.value = true
    if (file.value[0]) {
      const newThumbnail = await uploadImage(file.value[0], "image")
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
      <ContentList
        :course="course"
        @show-modal="showModal = true"
      />
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
  <v-dialog v-model="showModal">
    <v-container
      class="d-flex justify-center align-center"
      fluid
    >
      <v-card width="25%">
        <v-form @submit.prevent="">
          <v-row>
            <v-col>
              <v-card-title class="text-h5"> Add New Content </v-card-title>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn
                icon="mdi-close"
                variant="flat"
                @click="showModal = false"
              ></v-btn>
            </v-col>
          </v-row>
          <v-container>
            <v-radio-group :rules="contentTypeRules">
              <v-radio
                label="Quiz"
                value="quiz"
              ></v-radio>
              <v-radio
                label="Image"
                value="image"
              ></v-radio>
              <v-radio
                label="Video"
                value="video"
              ></v-radio>
            </v-radio-group>
          </v-container>
          <v-card class="d-flex justify-end bg-grey-lighten-3 pa-2">
            <v-btn
              class="text-capitalize"
              variant="text"
              @click="showModal = false"
            >
              Cancel
            </v-btn>
            <v-btn
              class="text-capitalize bg-primary"
              type="submit"
              :loading="loading"
            >
              Next
            </v-btn>
          </v-card>
        </v-form>
      </v-card>
    </v-container>
  </v-dialog>
</template>
