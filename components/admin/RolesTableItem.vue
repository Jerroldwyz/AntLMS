<script setup>
const props = defineProps(["role"])
const role = props.role

const deleteDialog = ref(false)
const roleDialog = ref(false)
</script>

<template>
  <tr>
    <td>{{ role.name }}</td>
    <td>
      {{ role.permissions }}
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
              <v-row>
                <v-col>
                  <v-checkbox
                    label="EditUser"
                    value="edituser"
                    class="my-2 mx-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    label="DisableUser"
                    value="disableuser"
                    class="my-2 mx-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    label="DeleteUser"
                    value="deleteuser"
                    class="my-2 mx-4"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    label="CreateSiteAdmin"
                    value="createsiteadmin"
                    class="my-2 mx-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    label="EditSiteAdmin"
                    value="editsiteadmin"
                    class="my-2 mx-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    label="DisableSiteAdmin"
                    value="disablesiteadmin"
                    class="my-2 mx-4"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    label="DeleteSiteAdmin"
                    value="deletesiteadmin"
                    class="my-2 mx-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    label="DisableCourse"
                    value="disablecourse"
                    class="my-2 mx-4"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    label="DeleteCourse"
                    value="deletecourse"
                    class="my-2 mx-4"
                    hide-details
                  ></v-checkbox>
                </v-col>
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
