<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
})
</script>

<template>
  <h1 class="mb-4">Admin Panel - Site Admins</h1>
  <v-text-field
    clearable
    label="Search"
    type="text"
    variant="outlined"
  >
  </v-text-field>

  <div>
    <AdminManagersTable :managers="managers"> </AdminManagersTable>
  </div>
</template>
