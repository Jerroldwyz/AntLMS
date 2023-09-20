<script setup lang="ts">
const pathToGet = ref<string>("")
const urls = ref<string[]>([])

const getUrl = async () => {
  if (pathToGet.value === "") {
    // No file selected, handle this case as needed
    console.log("No path to get")
    throw new Error("No path to get")
  } else {
    const url =
      (await getImage(pathToGet.value)) ?? (await getVideo(pathToGet.value))
    urls.value.push(url)
  }
}
</script>

<template>
  <v-text-field
    v-model="pathToGet"
    label="Path of file to get test input"
    class="mt-4"
  ></v-text-field>
  <v-btn
    block
    @click="getUrl"
  >
    Get Presigned URLs
  </v-btn>
  <ul>
    <li
      v-for="url in urls"
      :key="url"
    >
      <a :href="url">{{ url }}</a>
    </li>
  </ul>
</template>
