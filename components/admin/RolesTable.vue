<script setup>
const { roles } = defineProps(["roles"])
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
    <v-table fixed-header>
      <thead>
        <tr>
          <th class="text-left">Role Name</th>
          <th class="text-left">Permissions</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <AdminRolesTableItem
          v-for="role in roles"
          :key="role.id"
          roles="role"
        >
        </AdminRolesTableItem>
      </tbody>
    </v-table>
  </div>
</template>
