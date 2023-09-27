<template>
  <v-text-field
    :rules="emailRules"
    :label="props.label ?? 'E-mail'"
    class="mt-4"
    required
    @update:model-value="emit('update:email', $event)"
  ></v-text-field>
</template>

<script setup lang="ts">
const props = defineProps(["email", "label"])
const emit = defineEmits(["update:email"])

const emailRules = [
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]
</script>
