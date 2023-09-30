<script setup lang="ts">
import { tags } from "~~/constants"
import type { Course } from "~~/types"

const emit = defineEmits<{
  (e: "close", value: void): void
  (e: "submit", status: boolean): void
}>()

const titleRules = [
  (value: string) => {
    if (value) return true

    return "You must enter a title"
  },
  (value: string) => {
    if (value.length > 5) return true

    return "Title must be 5 characters or more"
  },
]

const tagRules = [
  (value: string[]) => {
    if (value.length > 0) return true

    return "You must pick atleast one course topic"
  },
]

const loading = ref(false)
const valid = ref(false)

const file = ref<File[]>([])

const course = ref<Course>({
  title: "",
  thumbnail: "",
  tags: [],
  creatorId: "",
})

const uploadFile = async () => {
  if (file.value.length === 0) {
    // No file selected, handle this case as needed
    console.log("No file to upload")
    throw new Error("No file to upload")
  } else {
    course.value.thumbnail = await uploadImage(file.value[0])
  }
}

async function submitCourse() {
  if (valid.value === true) {
    loading.value = true
    try {
      await uploadFile()
      await createCourse(course.value)
      loading.value = false
      emit("close")
      emit("submit", true)
    } catch (e) {}
    emit("submit", false)
  }
}
</script>

<template>
  <v-card width="40%">
    <v-form
      v-model="valid"
      @submit.prevent="submitCourse"
    >
      <v-row>
        <v-col>
          <v-card-title class="text-h5"> Create A New Course </v-card-title>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn
            icon="mdi-close"
            variant="flat"
            @click="emit('close')"
          ></v-btn>
        </v-col>
      </v-row>
      <v-card-text>
        <v-text-field
          v-model="course.title"
          variant="outlined"
          label="Title"
          :rules="titleRules"
        ></v-text-field>
        <v-select
          v-model="course.tags"
          variant="outlined"
          label="Tag(s)"
          :items="tags"
          :rules="tagRules"
          multiple
          chips
        ></v-select>

        <v-file-input
          v-model="file"
          label="Thumbnail"
          accept="image/*"
        ></v-file-input>
      </v-card-text>

      <v-card class="d-flex justify-end bg-grey-lighten-3 pa-2">
        <v-btn
          class="text-capitalize"
          variant="text"
          @click="emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
          class="text-capitalize bg-primary"
          type="submit"
          :loading="loading"
        >
          Create Course
        </v-btn>
      </v-card>
    </v-form>
  </v-card>
</template>
