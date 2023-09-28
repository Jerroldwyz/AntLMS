<script setup lang="ts">
const emit = defineEmits<{
  (e: "toggleModal", value: boolean): void
}>()

const contentTypeRules = [
  (value: string) => {
    if (value) return true
    return "You must select a content type!"
  },
]

const contentType = ref<"quiz" | "text" | "video" | undefined>()
function addContent() {
  switch (contentType.value) {
    case "quiz":
      navigateTo("newquiz")
      break
    case "text":
      navigateTo("newtext")
      break
    case "video":
      navigateTo("newvideo")
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
          <v-radio-group
            v-model="contentType"
            :rules="contentTypeRules"
          >
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
