<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
})
</script>

<template>
  <h1 class="mb-4">Admin Panel - Manage admin roles</h1>
  <v-text-field
    clearable
    label="Search"
    type="text"
    variant="outlined"
  >
  </v-text-field>

  <div>
    <AdminRolesTable></AdminRolesTable>
  </div>
</template>
