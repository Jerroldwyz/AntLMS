<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
})
</script>

<template>
  <h1 class="mb-4">Admin Panel - Site Admins</h1>

  <div>
    <AdminManagersTable></AdminManagersTable>
  </div>
</template>
