<script setup lang="ts">
const selectedVideoFile = ref<File[]>([])

const uploadVideoFile = () => {
  if (!selectedVideoFile) {
    // No file selected, handle this case as needed
    console.log("No file to upload")
    throw new Error("No file to upload")
  } else {
    uploadFileToS3(selectedVideoFile.value[0], "video")
  }
}
</script>

<template>
  <v-file-input
    label="Video Test input"
    accept="video/*"
    class="mt-4"
    v-model="selectedVideoFile"
  ></v-file-input>
  <v-btn
    @click="uploadVideoFile"
    block
    >Upload Video File</v-btn
  >
</template>
