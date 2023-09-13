<script setup>
const props = defineProps(["managers"])

const managers = props.managers
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
    <v-table fixed-header>
      <thead>
        <tr>
          <th class="text-left">User Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Role</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <AdminManagersTableItem
          v-for="manager in managers"
          :key="manager.id"
          :manager="manager"
        >
        </AdminManagersTableItem>
      </tbody>
    </v-table>
  </div>
</template>
