<script setup lang="ts">
  import { topicItems } from "~~/constants"

  const course = ref({
    title: "",
    topic: [],
    creator_id: 0
  })

  const loading = ref(false);
  const valid = ref<boolean | null | undefined>(null);

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

  const topicRules = [
    (value: string[]) => {
      if (value.length > 0) return true

      return "You must pick atleast one course topic"
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

      loading.value = pending.value
      navigateTo("/")
    }
  }

</script>

<template>
  <v-sheet :height="400" :width="400" border rounded>
    <v-form class="h-100 pa-6" v-model="valid" @submit.prevent="createCourse">
      <div class="h-100 d-flex flex-column">
        <div class="h-100">
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
              multiple
              chips
          ></v-select>
        </div>

        <div class="d-flex justify-center align-start">
          <v-btn type="submit" :loading="loading"> Create Course </v-btn>
        </div>
      </div>
    </v-form>
  </v-sheet>
</template>

