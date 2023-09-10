<script setup lang="ts">
import { tags } from "~~/constants"
import type { Course } from "~~/types"

const emit = defineEmits<{
  (e: "close", value: void): void
  (e: "submitted", value: boolean): void
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

const { createCourse } = useCourse()

const loading = ref(false)
const valid = ref(false)

const course = ref<Course>({
  title: "",
  thumbnail: "",
  tags: [],
  creatorId: "",
})

async function submitCourse() {
  if (valid.value === true) {
    loading.value = true
    try {
      await createCourse(course.value)
      loading.value = false
      emit("close")
      emit("submitted", true)
    } catch (e) {}
    emit("submitted", false)
  }
}
</script>

<template>
  <v-card class="w-50">
    <v-form
      v-model="valid"
      @submit.prevent="submitCourse()"
    >
      <v-row>
        <v-col>
          <v-card-title class="text-h5"> Create A New Course </v-card-title>
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            @click="emit('close')"
            icon="mdi-close"
            flat
          ></v-btn>
        </v-col>
      </v-row>
      <v-card-text>
        <v-text-field
          v-model="course.title"
          label="Title"
          :rules="titleRules"
        ></v-text-field>
        <v-select
          v-model="course.tags"
          label="Tag(s)"
          :items="tags"
          :rules="tagRules"
          multiple
          chips
        ></v-select>
        <v-file-input
          v-model="course.thumbnail"
          label="Thumbnail"
        ></v-file-input>
      </v-card-text>

      <v-card color="grey-lighten-3">
        <v-container>
          <v-row justify="end">
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
          </v-row>
        </v-container>
      </v-card>
    </v-form>
  </v-card>
</template>
