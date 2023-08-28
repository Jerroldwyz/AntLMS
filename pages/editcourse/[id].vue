<script setup lang="ts">
import CourseEditForm from "~~/components/forms/CourseEditForm"
const route = useRoute()

</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <CourseEditForm />
      </v-col>

      <v-col>
        <TopicList />
      </v-col>
    </v-row>
  </v-container>
</template>
