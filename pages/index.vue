<script setup lang="ts">
const selectedFile = ref([])
const uploadFile = () => {
  if (!selectedFile.value) {
    // No file selected, handle this case as needed
    console.log("no file??")
    return
  }
  const formData = new FormData()
  formData.append("file", selectedFile.value[0])

  const { data } = $fetch("/api/upload", {
    method: "POST",
    body: formData,
  })
  console.log(`Data: ${data}`)
  alert(data)
}
</script>

<template>
  <h1>Example index page</h1>
  <NuxtLink to="/mycourses"> View Courses </NuxtLink>

  <v-file-input
    label="File input"
    accept="image/*"
    v-model="selectedFile"
  ></v-file-input>
  <v-btn
    @click="uploadFile"
    block
    class="mt-2"
    >Submit</v-btn
  >
</template>
