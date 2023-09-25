<script setup lang="ts">
import { Course } from "~/types"
import { tags } from "~~/constants"

// TODO: change any to real type
const props = defineProps<{
  course: Course
}>()

const valid = ref(false)
const loading = ref(false)

// TODO is this suppose to emit anything back to the parent??
const course = ref<Course>(props.course)
const file = ref<File[]>([])

const updateThumbnail = async () => {
  if (!file) {
    // No file selected, handle this case as needed
    console.log("No file to upload")
    throw new Error("No file to upload")
  } else {
    await deleteImage(course.value.thumbnail)
    course.value.thumbnail = await uploadImage(file.value[0], "image")
  }
}

async function submitCourse() {
  if (valid.value === true) {
    loading.value = true
    try {
      const route = useRoute()
      await updateThumbnail()
      await updateCourse(course.value, route.params.id)
      loading.value = false
    } catch (e) {}
  }
}
</script>

<template>
  <v-card
    class="w-50"
    height="fit-content"
  >
    <v-container>
      <v-row>
        <v-col class="d-flex justify-start align-center">
          <h4 class="text-h4">Details</h4>
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            class="mb-2"
            icon="mdi-dots-vertical"
            variant="flat"
          ></v-btn>
        </v-col>
      </v-row>
      <v-divider class="mb-2"></v-divider>
      <v-form @submit.prevent="submitCourse">
        <v-text-field variant="outlined">{{ course.title }}</v-text-field>
        <v-select
          v-model="course.tags"
          multiple
          :items="tags"
          variant="outlined"
          chips
        ></v-select>
        <v-file-input
          v-model="file"
          label="Thumbnail"
          variant="outlined"
          >{{ course.thumbnail }}</v-file-input
        >
      </v-form>
    </v-container>
  </v-card>
</template>
