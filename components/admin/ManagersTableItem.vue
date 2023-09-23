<script setup lang="ts">
const props = defineProps(["manager"])
const emits = defineEmits(["delete:managerList"])

// const manager = props.manager
const manager = props.manager

const rolesString = manager.roles.map((role: any) => role.name).join(",")

const disableDialog = ref(false)
const deleteDialog = ref(false)
const roleDialog = ref(false)
const dialogm1 = ref("")

const saveNewRoles = () => {}
const deleteManagerNow = () => {
  try {
    deleteManagerById(manager.uid)
    emits("delete:managerList", manager.uid)
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
              <v-radio-group v-model="dialogm1">
                <v-radio
                  label="Admin"
                  value="admin"
                ></v-radio>
                <v-radio
                  label="Manager"
                  value="manager"
                ></v-radio>
                <v-radio
                  label="Staff"
                  value="staff"
                ></v-radio>
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
