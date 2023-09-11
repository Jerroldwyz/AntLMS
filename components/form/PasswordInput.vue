<template>
  <v-text-field
    :rules="passwordRules"
    @input="$emit('update:password', $event.target.value)"
    label="Password"
    type="password"
    required
  ></v-text-field>
</template>

<script setup lang="ts">
defineEmits(["update:password"])

const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) =>
    (v && v.length >= 6) || "Password must be more than 6 characters",
]
</script>
