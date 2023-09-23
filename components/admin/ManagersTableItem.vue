<script setup lang="ts">
const props = defineProps(["manager", "availableRoles"])
const emits = defineEmits(["delete:manager", "update:manager"])

const manager = props.manager
const availableRoles = props.availableRoles

const rolesString = ref(manager.roles.map((role: any) => role.name).join(","))

const disableDialog = ref(false)
const deleteDialog = ref(false)
const roleDialog = ref(false)
const newRole = ref(rolesString.value)

const saveNewRoles = () => {
  const role = availableRoles.find((role: any) => role.name === newRole.value)
  const modifiedManager = {
    ...manager,
    roles: [role],
  }
  if (manager.roles.length === 0) {
    createManagerRoleMapping(manager.uid, role.id)
  } else {
    updateManagerRoleMapping(manager.uid, role.id)
  }
  rolesString.value = newRole.value
  emits("update:manager", modifiedManager)
  roleDialog.value = false
}
const deleteManagerNow = () => {
  try {
    deleteManagerById(manager.uid)
    emits("delete:manager", manager.uid)
    deleteDialog.value = false
  } catch (e) {
    alert(e)
  }
}

const disableManagerNow = () => {}
</script>

<template>
  <tr>
    <td>{{ manager.name }}</td>
    <td>{{ manager.email }}</td>
    <td>{{ rolesString }}</td>
    <td class="text-right">
      <v-btn
        class="ms-2"
        variant="outlined"
        size="small"
      >
        Edit Role
        <v-dialog
          v-model="roleDialog"
          activator="parent"
          scrollable
          width="auto"
        >
          <v-card>
            <v-card-title>Select Role</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-radio-group v-model="newRole">
                <v-radio
                  v-for="role in availableRoles"
                  :key="role.id"
                  :label="role.name"
                  :value="role.name"
                >
                </v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="green-darken-1"
                variant="text"
                @click="saveNewRoles"
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
      >
        Disable
        <v-dialog
          v-model="disableDialog"
          activator="parent"
          width="auto"
        >
          <v-card>
            <v-card-text>
              Are you sure you want to disable account of {{ manager.name }}?
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-center pb-4">
              <v-btn
                color="red"
                variant="outlined"
                @click="disableManagerNow"
                >Yes</v-btn
              >
              <v-btn
                color="black"
                variant="outlined"
                @click="disableDialog = false"
                >No</v-btn
              >
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
              Are you sure you want to delete {{ manager.name }}?
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-center pb-4">
              <v-btn
                color="red"
                variant="outlined"
                @click="deleteManagerNow"
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
