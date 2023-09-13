<script setup lang="ts">
const pathToDelete = ref<string>("")

const deleteFile = async () => {
  if (pathToDelete.value == "") {
    // No file selected, handle this case as needed
    console.log("No path to delete")
    throw new Error("No path to delete")
  } else {
    await deleteFileFromS3(pathToDelete.value)
  }
}
</script>

<template>
  <v-text-field
    label="Path of file to delete"
    class="mt-4"
    v-model="pathToDelete"
  ></v-text-field>
  <v-btn
    @click="deleteFile"
    block
  >
    Delete File from S3
  </v-btn>
</template>
