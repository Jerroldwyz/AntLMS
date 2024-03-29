<script setup lang="ts">
const props = defineProps(["role", "availablePermissions"])
const emits = defineEmits(["delete:role", "update:role"])

const role = props.role
const availablePermissions = props.availablePermissions

const permissionsString = ref(
  role.permissions.map((perm: any) => perm.name).join(","),
)

const newPermissionIds = ref(role.permissions.map((perm: any) => perm.id))

const deleteDialog = ref(false)
const roleDialog = ref(false)

const saveNewPermissions = () => {
  updateRolePermissionMappings(role.id, newPermissionIds.value)
  const newPermissionString = availablePermissions
    .filter((perm: any) => newPermissionIds.value.includes(perm.id))
    .map((perm: any) => perm.name)
    .join(",")
  permissionsString.value = newPermissionString
  emits("update:role", newPermissionIds.value)
  roleDialog.value = false
}

const deleteRoleNow = async () => {
  try {
    await deleteRoleById(role.id)
    emits("delete:role", role.id)
    deleteDialog.value = false
  } catch (e) {
    alert(e)
  }
}
</script>

<template>
  <tr>
    <td>{{ role.name }}</td>
    <td class="overflow-auto">
      {{ permissionsString }}
    </td>
    <td class="text-right">
      <v-btn
        class="ms-2"
        variant="outlined"
        size="small"
      >
        Edit Permissions
        <v-dialog
          v-model="roleDialog"
          activator="parent"
          scrollable
          width="auto"
        >
          <v-card>
            <v-card-title>Select Permissions</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row class="flex">
                <v-checkbox
                  v-for="permission in availablePermissions"
                  :key="permission.id"
                  v-model="newPermissionIds"
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
                @click="saveNewPermissions"
              >
                Save
              </v-btn>
              <v-btn
                color="black"
                variant="text"
                @click="roleDialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>

      <v-btn
        class="ms-2"
        variant="outlined"
        size="small"
        color="red"
      >
        Delete
        <v-dialog
          v-model="deleteDialog"
          activator="parent"
          width="auto"
        >
          <v-card>
            <v-card-text>
              Are you sure you want to delete {{ role.name }}?
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-center pb-4">
              <v-btn
                color="red"
                variant="outlined"
                @click="deleteRoleNow"
                >Yes</v-btn
              >
              <v-btn
                color="black"
                variant="outlined"
                @click="deleteDialog = false"
                >No</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </td>
  </tr>
</template>
