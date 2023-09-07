<script setup lang="ts">
const pathToGet = ref<string>("")
const selectedFile = ref<File[]>([])
const urls = ref<string[]>([])

const uploadFile = () => {
  if (!selectedFile) {
    // No file selected, handle this case as needed
    console.log("No file to upload")
    throw new Error("No file to upload")
  } else {
    uploadFileToS3(selectedFile.value[0], "image")
  }
}

const getUrl = async () => {
  if (pathToGet.value == "") {
    // No file selected, handle this case as needed
    console.log("No path to get")
    throw new Error("No path to get")
  } else {
    urls.value.push(await getFileUrlFromS3(pathToGet.value))
  }
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

  <v-text-field
    label="Path"
    v-model="pathToGet"
  ></v-text-field>
  <v-btn
    @click="getUrl"
    block
    class="mt-2"
  >
    Submit
  </v-btn>
  <ul>
    <li v-for="url in urls">
      <a :href="url">{{ url }}</a>
    </li>
  </ul>
</template>
