components/form/Input.vue
<script setup lang="ts">
const props = defineProps<{
  label?: string
  accept?: string
  modelValue: File[]
}>()
defineEmits(["update:modelValue"])

const label = props.label ?? "Image Input"
const mimeAccept = props.accept ?? "image/*"
</script>

<template>
  <v-file-input
    :model-value="props.modelValue"
    :label="label"
    :accept="mimeAccept"
    @change="$emit('update:modelValue', [...$event.target.files])"
  ></v-file-input>
</template>
