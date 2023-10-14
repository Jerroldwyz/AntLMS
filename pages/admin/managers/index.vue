<script setup>
definePageMeta({
  layout: "admin",
  middleware: "02-admin",
})
</script>

<template>
  <h1 class="mb-4">Admin Panel - Site Admins</h1>

  <div>
    <AdminManagersTable></AdminManagersTable>
  </div>
</template>
