<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
})
</script>

<template>
  <h1 class="mb-4">Admin Panel - Manage admin roles</h1>
  <div>
    <AdminRolesTable></AdminRolesTable>
  </div>
</template>
