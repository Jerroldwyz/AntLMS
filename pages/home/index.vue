<template>
  <h1>Example test page</h1>
  <v-file-input
    label="File input"
    accept="image/*"
    v-model="imageFile"
  ></v-file-input>
  <v-btn
    @click="uploadFile"
    block
    class="mt-2"
    >Submit</v-btn
  >
</template>

<script setup lang="ts">
const selectedFile = ref(null)
const uploadFile = () => {
  if (!selectedFile.value) {
    // No file selected, handle this case as needed
    return
  }
  const formData = new FormData()
  formData.append("file", selectedFile.value)

  $fetch("/api/upload", {
    method: "POST",
    body: formData,
  })
}
</script>
