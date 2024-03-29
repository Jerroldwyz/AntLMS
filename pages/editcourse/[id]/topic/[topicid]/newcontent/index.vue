<script setup lang="ts">
const route = useRoute()

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

const contentTypeRules = [
  (value: string) => {
    if (value) return true
    return "You must select a content type!"
  },
]

const title = ref("")
const contentType = ref<"quiz" | "text" | "video" | undefined>()

async function handleQuiz() {
  const quiz: any = await $fetch("/api/quiz", {
    method: "POST",
    body: {
      title: title.value,
      topic_id: route.query.topicId,
      threshold: 50,
      topic_position: route.query.position,
    },
  })
  navigateTo({
    path: `newcontent/quiz/${quiz.id}`,
  })
}

async function addContent() {
  switch (contentType.value) {
    case "quiz":
      await handleQuiz()
      break
    case "text":
      navigateTo({
        path: `newcontent/text`,
        query: {
          title: title.value,
          position: route.query.position,
        },
      })
      break
    case "video":
      navigateTo({
        path: `newcontent/video`,
        query: {
          title: title.value,
          position: route.query.position,
        },
      })
      break
  }
}
</script>

<template>
  <v-dialog
    :model-value="true"
    persistent
  >
    <v-container
      class="d-flex justify-center align-center"
      fluid
    >
      <v-card width="25%">
        <v-form @submit.prevent="addContent">
          <v-row>
            <v-col>
              <v-card-title class="text-h5"> Add New Content </v-card-title>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn
                icon="mdi-close"
                variant="flat"
                @click="navigateTo(`/editcourse/${$route.params.id}`)"
              ></v-btn>
            </v-col>
          </v-row>
          <v-container>
            <v-text-field
              v-model="title"
              variant="outlined"
              label="Title"
              :rules="titleRules"
            ></v-text-field>
            <v-radio-group
              v-model="contentType"
              :rules="contentTypeRules"
            >
              <template #label>Content Type</template>
              <v-radio
                label="Quiz"
                value="quiz"
              ></v-radio>
              <v-radio
                label="Text"
                value="text"
              ></v-radio>
              <v-radio
                label="Video"
                value="video"
              ></v-radio>
            </v-radio-group>
          </v-container>
          <v-card class="d-flex justify-end bg-grey-lighten-3 pa-2">
            <v-btn
              class="text-capitalize"
              variant="text"
              @click="navigateTo(`/editcourse/${$route.params.id}`)"
            >
              Cancel
            </v-btn>
            <v-btn
              class="text-capitalize bg-primary"
              type="submit"
            >
              Next
            </v-btn>
          </v-card>
        </v-form>
      </v-card>
    </v-container>
  </v-dialog>
</template>
