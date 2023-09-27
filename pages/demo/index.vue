<template>
  <!-- User Quiz Pop Up like this -->
  <!-- <v-btn @click="createCourseDialog = true">Create Quiz</v-btn>
  <v-dialog v-model="createCourseDialog">
    <v-container fluid>
      <v-row justify="center">
        <FormQuizCreate :topicId="169652537" :topicPosition="12" @submit="handleSubmit"
          @close="createCourseDialog = false" />
      </v-row>                                
    </v-container>
  </v-dialog> -->
  <!-- User Question form component like this for creation and pass id as props for updating<FormQuestion/> -->
  <Quiz :id="702097645" />
</template>

<script setup></script>
