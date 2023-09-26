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
      <v-divider class="my-2"></v-divider>
      <v-form>
        <v-text-field variant="outlined">{{ course.title }}</v-text-field>
        <v-select
          :model-value="course.tags"
          multiple
          :items="tags"
          variant="outlined"
          chips
        ></v-select>
        <v-file-input
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
