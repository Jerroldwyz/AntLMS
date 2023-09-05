<template>
  <v-text-field
    :value="email"
    :rules="emailRules"
    @input="$emit('update:email', $event.target.value)"
    label="E-mail"
    class="mt-4"
    required
  ></v-text-field>
</template>

<script setup lang="ts">
defineProps(["email"])
defineEmits(["update:email"])

const emailRules = ref([
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
])
</script>
