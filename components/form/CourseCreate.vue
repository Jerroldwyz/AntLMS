<script setup lang="ts">
import { Course } from "~~/types"
import { tags } from "~~/constants"

const emit = defineEmits<{
  (e: "courseOutcome", status: "success" | "failure"): void
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

const user = useUser()

const course = ref<Course>({
  title: "",
  thumbnail: "",
  tags: [],
  creator_id: "",
})

if (user.value?.uid != undefined) {
  course.value.creator_id = user.value.uid
}

const loading = ref(false)
const valid = ref(false)

async function createCourse() {
  if (valid.value === true) {
    try {
      loading.value = true
      await $fetch("/api/mycourses", {
        method: "post",
        body: {
          course: course.value,
        },
      })
      loading.value = false
      emit("courseOutcome", "success")
    } catch (e) {
      emit("courseOutcome", "failure")
    }
  }
}
</script>

<template>
  <v-card class="w-50">
    <v-form
      v-model="valid"
      @submit.prevent="createCourse"
    >
      <v-row>
        <v-col>
          <v-card-title class="text-h5"> Create A New Course </v-card-title>
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            @click="$emit('close')"
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
              @click="$emit('close')"
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
