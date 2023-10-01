<script setup lang="ts">
const route = useRoute()
const emit = defineEmits<{
  (e: "toggleModal", value: boolean): void
}>()

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

function addContent() {
  switch (contentType.value) {
    case "quiz":
      navigateTo({
        path: `${route.params.id}/content/newquiz`,
        query: {
          title: title.value,
        },
      })
      break
    case "text":
      navigateTo({
        path: `${route.params.id}/content/newtext`,
        query: {
          title: title.value,
        },
      })
      break
    case "video":
      navigateTo({
        path: `${route.params.id}/content/newvideo`,
        query: {
          title: title.value,
        },
      })
      break
  }
}
</script>

<template>
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
              @click="$emit('toggleModal', false)"
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
            @click="$emit('toggleModal', false)"
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
</template>
