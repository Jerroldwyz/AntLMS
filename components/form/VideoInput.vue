<script setup lang="ts">
const props = defineProps(["label", "accept", "file"])
defineEmits(["update:file"])

const label = props.label ?? "Video Input"
const mimeAccept = props.accept ?? "video/*"
</script>

<template>
  <v-file-input
    :model-value="file"
    :label="label"
    :accept="mimeAccept"
    @update:model-value="$emit('update:file', $event)"
  ></v-file-input>
</template>
