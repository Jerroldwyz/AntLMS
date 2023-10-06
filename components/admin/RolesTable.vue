<script setup lang="ts">
const roles = await getRoles()
const availablePermissions = await getPermissions()

// This is required for computed property to work
const reactiveElements = reactive({
  searchString: "",
  roleList: roles,
})

const { searchString, roleList } = toRefs(reactiveElements)

const filteredRoleList = computed(() => {
  if (searchString.value === "") {
    return roleList.value
  } else {
    return roleList.value.filter((role: any) =>
      role.name.toLowerCase().includes(searchString.value.toLowerCase()),
    )
  }
})

const newDialogue = ref(false)
const newRoleName = ref("")
const newRolePermissionIds = ref([])
const valid = ref(false)

const createNewRole = async () => {
  if (valid.value) {
    createRole(newRoleName.value, newRolePermissionIds.value)
    roleList.value = await getRoles()
    newDialogue.value = false
  }
}

// Internals handled by roles table item
const deleteRoles = async (roleIdToRemove: number) => {
  roleList.value = await getRoles()
}
</script>

<template>
  <div>
    <v-text-field
      v-model:model-value="searchString"
      clearable
      label="Search"
      type="text"
      variant="outlined"
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
          <v-form
            v-model="valid"
            @submit.prevent="createNewRole"
          >
            <v-card-title>Create new Role</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-text-field
                  v-model:model-value="newRoleName"
                  class="mx-4 mt-4"
                  :rules="[(v: string) => !!v || 'Name is required']"
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
                type="submit"
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
          </v-form>
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
