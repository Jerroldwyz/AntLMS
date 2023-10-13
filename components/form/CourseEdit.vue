<script setup lang="ts">
import { Course } from "~/types"
import { tags } from "~~/constants"

// TODO: change any to real type
const props = defineProps<{
  course: Course
  file: File[]
}>()

const emit = defineEmits<{
  (e: "update:course", course: Course): void
  (e: "update:file", file: File[]): void
  (e: "changed"): void
}>()

function formatThumbnail(thumbnail: string) {
  if (props.file[0]) {
    return props.file[0].name
  }

  const split = thumbnail.split(".")
  split.shift()
  return split.join(".")
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
          <h4 class="text-h5 font-weight-bold">Details</h4>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-form class="mt-4">
        <v-text-field
          :model-value="course.title"
          variant="outlined"
          @update:model-value="
            (title) => $emit('update:course', { ...course, title })
          "
        ></v-text-field>
        <v-select
          :model-value="course.courseTags"
          multiple
          :items="tags"
          variant="outlined"
          chips
          @update:model-value="
            (tags) =>
              $emit('update:course', { ...course, courseTags: [...tags] })
          "
        ></v-select>
        <v-file-input
          class="overflow-hidden"
          :model-value="file"
          :label="formatThumbnail(course.thumbnail)"
          variant="outlined"
          @update:model-value="(file) => $emit('update:file', file)"
          @click:clear="$emit('update:file', [])"
          >{{ course.thumbnail }}</v-file-input
        >
      </v-form>
    </v-container>
  </v-card>
</template>
