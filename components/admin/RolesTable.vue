<script setup lang="ts">
const roles = await getRoles()
const availablePermissions = await getPermissions()

const roleList = ref(roles)

const deleteRoles = (roleIdToRemove: number) => {
  roleList.value = roleList.value.filter(
    (role: any) => role.id !== roleIdToRemove,
  )
}
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
          v-for="role in roleList"
          :key="role.id"
          :role="role"
          :available-permissions="availablePermissions"
          @delete:role="deleteRoles"
        >
        </AdminRolesTableItem>
      </tbody>
    </v-table>
  </div>
</template>
