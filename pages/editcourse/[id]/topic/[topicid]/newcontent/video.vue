<script setup lang="ts">
const route = useRoute()
const video = ref<File[]>([])

async function submitVideo() {
  if (
    typeof video !== "undefined" &&
    typeof route.query.title === "string" &&
    typeof route.params.topicid === "string" &&
    typeof route.query.position === "string"
  ) {
    const videoLink = await uploadVideo(video.value[0])
    submitContent(
      route.query.title,
      "VIDEO",
      videoLink,
      route.params.topicid,
      route.query.position,
    )
    navigateTo(`/editcourse/${route.params.id}`)
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
        <v-form @submit.prevent="submitVideo">
          <v-row>
            <v-col>
              <v-card-title class="text-h5"> Add New Video </v-card-title>
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
            <v-file-input
              v-model="video"
              variant="outlined"
              label="Video"
            ></v-file-input>
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
              Create
            </v-btn>
          </v-card>
        </v-form>
      </v-card>
    </v-container>
  </v-dialog>
</template>
