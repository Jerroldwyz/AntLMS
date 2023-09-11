components/form/ImageInput.vue
<script setup lang="ts">
const selectedImageFile = ref<File[]>([])

const uploadImageFile = () => {
  if (!selectedImageFile) {
    // No file selected, handle this case as needed
    console.log("No file to upload")
    throw new Error("No file to upload")
  } else {
    uploadFileToS3(selectedImageFile.value[0], "image")
  }
}
</script>

<template>
  <v-file-input
    label="Image Test input"
    accept="image/*"
    class="mt-4"
    v-model="selectedImageFile"
  ></v-file-input>
  <v-btn
    @click="uploadImageFile"
    block
    >Upload Image File</v-btn
  >
</template>
