<template>
  <!-- User Quiz Pop Up like this -->
  <!-- <v-btn @click="createCourseDialog = true">Create Quiz</v-btn>
  <v-dialog v-model="createCourseDialog">
    <v-container fluid>
      <v-row justify="center">
        <FormQuizCreate :topicId="1" :topicPosition="11" @submit="handleSubmit" @close="createCourseDialog = false" />
      </v-row>
    </v-container>
  </v-dialog> -->
  <!-- User Question form component like this for creation and pass id as props for updating<FormQuestion/> -->
  <!-- <Quiz :id="1" enrollmentId="1" userId="1" /> -->
  <FormQuestion
    id="11"
    quiz-id="1"
  />
</template>

<script setup>
const createCourseDialog = ref(false)
</script>
