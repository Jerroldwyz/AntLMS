<script setup lang="ts">
  import { topicItems } from "~~/constants.ts"

  const course: Course = ref({
    title: "",
    topic: "",
    other_topic: ""
  })

  const loading = ref(false);
  const valid = ref("");

  const titleRules = [
    value => {
      if (value) return true

      return "You must enter a title"
    },
    value => {
        if (value.length > 5) return true

        return "Title must be 5 characters or more"
    },
  ]

  const topicRules = [
    value => {
      if (value) return true

      return "You must pick a course topic"
    }
  ]

  const otherRules = [
    value => {
      if (value) return true

      return "You must specify other"
    }
  ]

  function createCourse() {
    if (valid.value) {
      let { data, pending } = useFetch("/api/newcourse", {
          method: "post",
          body: {
            course
          }
      })

      loading.value = pending
      navigateTo("/")
    }
  }

</script>

<template>
  <v-sheet :height="400" :width="400" border rounded>
    <v-form v-model="valid" @submit.prevent="createCourse">
      <v-text-field
        v-model="course.title"
        :rules="titleRules"
        label="Title"
      ></v-text-field>
      
      <v-select
          v-model="course.topic"
          :rules="topicRules"
          label="Topic"
          :items="topicItems"
      ></v-select>

      <div v-if="course.topic == 'Other'">
        <v-text-field
            v-model="course.other_topic"
            :rules="otherRules"
            label="Other (Please specify)"
        ></v-text-field>
      </div>

      <v-btn type="submit" :loading="loading.value"> Create Course </v-btn>
    </v-form>
  </v-sheet>
</template>

