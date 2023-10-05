<script setup lang="ts">
const props = defineProps<{
  label?: string
  accept?: string
  modelValue: File[]
}>()
defineEmits(["update:modelValue"])

const label = props.label ?? "Video Input"
const mimeAccept = props.accept ?? "video/*"
</script>

<template>
  <v-file-input
    :model-value="props.modelValue"
    :label="label"
    :accept="mimeAccept"
    @change="$emit('update:modelValue', [...$event.target.files])"
  ></v-file-input>
</template>
