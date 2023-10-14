<script setup>
definePageMeta({
  layout: "admin",
  middleware: "02-admin",
})
</script>

<template>
  <h1 class="mb-4">Admin Panel - Manage admin roles</h1>
  <div>
    <AdminRolesTable></AdminRolesTable>
  </div>
</template>
