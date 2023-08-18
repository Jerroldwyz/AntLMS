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
    }
  ]
</script>

<template> 
  <v-card width="50%">
    <form>
    <v-card color="blue-darken-4" flat rounded="0">
      <v-container class="pa-2">
        <v-row>
          <v-col>
            <v-card-title> Create A New Course </v-card-title>
          </v-col>
          <v-col align="right">
            <v-btn 
              color="blue-darken-4" 
              icon="mdi-close" 
              flat 
              @click="$emit('close')"></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card-text>
      <v-text-field label="Title" :rules="titleRules"></v-text-field>
      <v-select
        label="Tag(s)"
        :items="tags"
        :rules="tagRules" 
        multiple 
        chips></v-select>
      <v-file-input label="Thumbnail"></v-file-input>
    </v-card-text>

    <v-card color="grey-lighten-2">
      <v-container>
        <v-row justify="end">
          <v-btn variant="text" @click="$emit('close')"> Cancel </v-btn>
          <v-btn color="blue-darken-2"> Create Course </v-btn>
        </v-row>
      </v-container>
    </v-card>
    </form>
  </v-card>
</template>

