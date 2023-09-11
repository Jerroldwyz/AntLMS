<script setup lang="ts">
const pathToGet = ref<string>("")
const urls = ref<string[]>([])

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
  <v-text-field
    label="Path of file to get test input"
    class="mt-4"
    v-model="pathToGet"
  ></v-text-field>
  <v-btn
    @click="getUrl"
    block
  >
    Get Presigned URLs
  </v-btn>
  <ul>
    <li v-for="url in urls">
      <a :href="url">{{ url }}</a>
    </li>
  </ul>
</template>
