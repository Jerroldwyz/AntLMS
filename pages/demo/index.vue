<template>
  <v-btn @click="createCourseDialog = true">Create Quiz</v-btn>
  <v-dialog v-model="createCourseDialog">
    <v-container fluid>
      <v-row justify="center">
        <FormQuizCreate
          @submit="handleSubmit"
          @close="createCourseDialog = false"
        />
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script setup>
const createCourseDialog = ref(false)
</script>
