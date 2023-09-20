<script setup lang="ts">
const pathToDelete = ref<string>("")

const deleteFile = async () => {
  if (pathToDelete.value === "") {
    // No file selected, handle this case as needed
    console.log("No path to delete")
    throw new Error("No path to delete")
  } else if (!(await deleteImage(pathToDelete.value))) {
    await deleteVideo(pathToDelete.value)
  }
}
</script>

<template>
  <v-text-field
    v-model="pathToDelete"
    label="Path of file to delete"
    class="mt-4"
  ></v-text-field>
  <v-btn
    block
    @click="deleteFile"
  >
    Delete File from S3
  </v-btn>
</template>
