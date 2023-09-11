components/form/Input.vue
<script setup lang="ts">
const props = defineProps(["label", "accept"])
const emit = defineEmits(["upload-status"])

const label = props.label ?? "Image Input"
const mimeAccept = props.accept ?? "image/*"

const selectedFile = ref<File[]>([])

const uploadFile = async () => {
  if (!selectedFile) {
    // No file selected, handle this case as needed
    console.log("No file to upload")
    throw new Error("No file to upload")
  } else {
    const path = await uploadFileToS3(selectedFile.value[0], "image")
    emit("upload-status", path)
  }
}
</script>

<template>
  <v-file-input
    :label="label"
    :accept="mimeAccept"
    class="mt-4"
    v-model="selectedFile"
  ></v-file-input>
  <v-btn
    @click="uploadFile"
    block
    >Upload File</v-btn
  >
</template>
