<script setup lang="ts">
import useCourseStore from "~~/stores/useCourseStore"

const createCourseDialog = ref(false)

const courseStore = useCourseStore()

onMounted(courseStore.fetchMyCourses)
</script>

<template>
  <v-alert
    v-model="courseStore.isCreated"
    type="success"
    density="compact"
    title="Course Created"
    rounded="0"
    closable
    text="Click on the course you just created in order to add further information."
  ></v-alert>
  <v-alert
    v-model="courseStore.isError"
    type="error"
    density="compact"
    title="Course Not Created"
    rounded="0"
    closable
    text="Something went wrong. Please try again later."
  ></v-alert>

  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <CreateCourseBtn @click="createCourseDialog = true" />
      </v-col>
      <v-col
        cols="2"
        v-for="course in courseStore.courses"
      >
        <!-- For whatever reason, Pinia creates a union of true and the course which
             throws a type error, I have tried fixing it but I have no idea. It works perfectly fine.
         -->
        <Course
          :key="course.id"
          :id="course.id"
          :title="course.title"
          :thumbnail="course.thumbnail"
        />
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="createCourseDialog">
    <v-container fluid>
      <v-row justify="center">
        <FormCourseCreate @close="createCourseDialog = false" />
      </v-row>
    </v-container>
  </v-dialog>
</template>
