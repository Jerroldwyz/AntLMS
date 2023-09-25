<script setup lang="ts">
const roles = await getRoles()
const availablePermissions = await getPermissions()

let roleList = toRaw(roles.value)

// TODO I would rather use computed value here but it does not want to work lol
const filteredRoleList = ref(roleList)

const newDialogue = ref(false)
const newRoleName = ref("")
const newRolePermissionIds = ref([])

const updateSearch = (searchString: string) => {
  if (searchString === "") {
    filteredRoleList.value = roleList
  } else {
    filteredRoleList.value = roleList.filter((role: any) =>
      role.name.toLowerCase().includes(searchString.toLowerCase()),
    )
  }
}

const createNewRole = () => {
  createRole(newRoleName.value, newRolePermissionIds.value)
  newDialogue.value = false
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

    <v-btn
      class="ms-2 mb-2"
      variant="flat"
      color="orange"
      size="small"
    >
      Add +
      <v-dialog
        v-model="newDialogue"
        activator="parent"
        scrollable
        width="auto"
      >
        <v-card>
          <v-card-title>Create new Role</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-text-field
                v-model:model-value="newRoleName"
                label="Name"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox
                v-for="permission in availablePermissions"
                :key="permission.id"
                v-model="newRolePermissionIds"
                :label="permission.name"
                :value="permission.id"
                class="my-2 mx-4 w-25"
                hide-details
              >
              </v-checkbox>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="createNewRole"
            >
              Save
            </v-btn>
            <v-btn
              color="black"
              variant="text"
              @click="newDialogue = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>

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
