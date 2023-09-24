<script setup lang="ts">
const roles = await getRoles()
const availablePermissions = await getPermissions()

let roleList = toRaw(roles.value)

// TODO I would rather use computed value here but it does not want to work lol
const filteredRoleList = ref(roleList)

const updateSearch = (searchString: string) => {
  if (searchString === "") {
    filteredRoleList.value = roleList
  } else {
    filteredRoleList.value = roleList.filter((role: any) =>
      role.name.toLowerCase().includes(searchString.toLowerCase()),
    )
  }
}

const deleteRoles = (roleIdToRemove: number) => {
  roleList = roleList.filter((role: any) => role.id !== roleIdToRemove)
}
</script>

<template>
  <div>
    <v-text-field
      clearable
      label="Search"
      type="text"
      variant="outlined"
      @update:model-value="updateSearch"
    >
    </v-text-field>

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
          v-for="role in filteredRoleList"
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
