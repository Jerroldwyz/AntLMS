<script setup lang="ts">
import { Course } from "~/types"
import { tags } from "~~/constants"

// TODO: change any to real type
const props = defineProps<{
  course: Course
}>()

// TODO is this suppose to emit anything back to the parent??
const course = props.course
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
      <v-form>
        <v-text-field variant="outlined">{{ course.title }}</v-text-field>
        <v-select
          v-model="course.tags"
          multiple
          :items="tags"
          variant="outlined"
          chips
        ></v-select>
        <v-file-input
          label="Thumbnail"
          variant="outlined"
          >{{ course.thumbnail }}</v-file-input
        >
      </v-form>
    </v-container>
  </v-card>
</template>
