<template>
  <QuillEditor
    v-model:content="editor"
    theme="snow"
    content-type="html"
  />
  <v-btn
    variant="elevated"
    @click="emit('close', editor)"
    >Close Editor</v-btn
  >
</template>

<script setup>
import { QuillEditor } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"
const props = defineProps(["data"])
const emit = defineEmits(["close"])
const editor = ref("")
</script>
