<script setup>
const { roles } = defineProps(["roles"])
</script>

<template>
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
          :role="role"
        >
        </AdminRolesTableItem>
      </tbody>
    </v-table>
  </div>
</template>
