<template>
  <v-text-field
    :rules="emailRules"
    @input="$emit('update:email', $event.target.value)"
    label="E-mail"
    class="mt-4"
    required
  ></v-text-field>
</template>

<script setup lang="ts">
defineEmits(["update:email"])

const emailRules = [
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]
</script>
