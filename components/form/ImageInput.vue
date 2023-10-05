<script setup lang="ts">
const props = defineProps(["label", "accept", "file"])
defineEmits(["update:file"])

const label = props.label ?? "Image Input"
const mimeAccept = props.accept ?? "image/*"
</script>

<template>
  <v-file-input
    :model-value="file"
    :label="label"
    :accept="mimeAccept"
    @update:model-value="$emit('update:file', $event.target.value)"
  ></v-file-input>
</template>
