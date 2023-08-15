<script setup lang="ts">
  import { topicItems } from "~~/constants"

  const course = ref({
    title: "",
    topic: [],
    creator_id: 0
  })

  const loading = ref(false);
  const valid = ref<boolean | null | undefined>(null);

  const pages = ref(["Basic Info"])

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

  function prevPage() {
    pages.value.pop();
  }

  function nextPage() {
    pages.value.push("Content")
  }

</script>

<template> 
  <v-sheet class="w-50 pa-8" :elevation="2" border rounded="lg">
  <h4 class="text-h4"> Create A New Course </h4>
  <v-breadcrumbs class="pb-8" :items="pages"></v-breadcrumbs>
  <v-form v-model="valid" @submit.prevent="createCourse">
    <v-sheet class="pa-8" :elevation="2">
        <div>
          <div>
            <v-text-field
              v-model="course.title"
              :rules="titleRules"
              label="Title"
              variant="underlined"
            ></v-text-field>

            <v-select
                v-model="course.topic"
                :rules="topicRules"
                label="Topic (at least one)"
                :items="topicItems"
                variant="underlined"
                multiple
                chips
            ></v-select>
          </div>

          
        </div>
      </v-sheet>

      <div class="d-flex mt-8">
        <div v-if="pages.length > 1">
          <v-btn @click="prevPage"> Prev </v-btn>
        </div>

        <div justify="end">
          <v-btn @click="nextPage"> Next </v-btn>
        </div>
      </div>
      </v-form>
  </v-sheet>
</template>

