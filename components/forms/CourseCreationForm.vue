<script setup lang="ts">
import { tags } from "~~/constants"

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
</script>

<template>
  <v-card width="40%">
    <form>
      <v-row>
        <v-col>
          <v-card-title class="text-h5"> Create A New Course </v-card-title>
        </v-col>
        <v-col align="right">
          <v-btn
            @click="$emit('close')"
            icon="mdi-close"
            flat
          ></v-btn>
        </v-col>
      </v-row>
      <v-card-text>
        <v-text-field
          label="Title"
          :rules="titleRules"
        ></v-text-field>
        <v-select
          label="Tag(s)"
          :items="tags"
          :rules="tagRules"
          multiple
          chips
        ></v-select>
        <v-file-input label="Thumbnail"></v-file-input>
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
              class="text-capitalize"
              color="blue-darken-2"
              @click="
                $emit('course-success')
                $emit('close')
              "
            >
              Create Course
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </form>
  </v-card>
</template>
