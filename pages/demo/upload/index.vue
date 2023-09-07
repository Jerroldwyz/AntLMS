<script setup lang="ts">
const pathToGet = ref<string>("")
const selectedVideoFile = ref<File[]>([])
const selectedImageFile = ref<File[]>([])
const urls = ref<string[]>([])

const uploadImageFile = () => {
  if (!selectedImageFile) {
    // No file selected, handle this case as needed
    console.log("No file to upload")
    throw new Error("No file to upload")
  } else {
    uploadFileToS3(selectedImageFile.value[0], "image")
  }
}

const uploadVideoFile = () => {
  if (!selectedVideoFile) {
    // No file selected, handle this case as needed
    console.log("No file to upload")
    throw new Error("No file to upload")
  } else {
    uploadFileToS3(selectedVideoFile.value[0], "video")
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
    label="Image Test input"
    accept="image/*"
    class="mt-4"
    v-model="selectedImageFile"
  ></v-file-input>
  <v-btn
    @click="uploadImageFile"
    block
    >Submit</v-btn
  >

  <v-file-input
    label="Video Test input"
    accept="video/*"
    class="mt-4"
    v-model="selectedVideoFile"
  ></v-file-input>
  <v-btn
    @click="uploadVideoFile"
    block
    >Submit</v-btn
  >

  <v-text-field
    label="Path of file to get test input"
    class="mt-4"
    v-model="pathToGet"
  ></v-text-field>
  <v-btn
    @click="getUrl"
    block
  >
    Submit
  </v-btn>
  <ul>
    <li v-for="url in urls">
      <a :href="url">{{ url }}</a>
    </li>
  </ul>
</template>
