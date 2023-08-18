<script setup lang="ts">
  import  CourseCreationForm  from "~~/components/forms/CourseCreationForm"
  const createDialog = ref(false)
  const courses = ref([
    { 
      title: "Baking 101",
      img: "https://images.pexels.com/photos/9095/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    { 
      title: "Math 101",
      img: "https://media.istockphoto.com/id/1219382595/vector/math-equations-written-on-a-blackboard.webp?s=1024x1024&w=is&k=20&c=FuAlO8n7UyfykyqpZMhWpQD66wIJuIbgXG7ZQPRgoPk="
    }
  ])
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2" v-for="course in courses">
        <Course :title="course.title" :img="course.img" />
      </v-col>
      <v-col cols="2">
        <CreateCourseBtn @click="createDialog = true" />
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="createDialog">
    <v-container fluid>
      <v-row justify="center">
        <CourseCreationForm @close="createDialog = false" />
      </v-row>
    </v-container>
  </v-dialog>
</template>
