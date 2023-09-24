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
    console.log(selectedFile.value[0])
    const path = await uploadImage(selectedFile.value[0], "image")
    emit("upload-status", path)
  }
}
</script>

<template>
  <v-file-input
    v-model="selectedFile"
    :label="label"
    :accept="mimeAccept"
    class="mt-4"
  ></v-file-input>
  <v-btn
    block
    @click="uploadFile"
    >Upload File</v-btn
  >
</template>
