<script setup>
const editDialog = ref({})
const disableDialog = ref({})
const deleteDialog = ref({})
definePageMeta({
  layout: "admin",
  middleware: "admin",
})
</script>

<template>
  <h1 class="mb-4">Admin Panel - Users</h1>
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
          <th class="text-left">Thumbnail</th>
          <th class="text-left">User Name</th>
          <th class="text-left">Email</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="n in 9"
          :key="n"
        >
          <td>
            <v-avatar
              class="ma-2"
              color="grey-darken-1"
              size="large"
            >
              <span class="text-h6">AN</span>
            </v-avatar>
          </td>
          <td>USER NAME</td>
          <td>EMAIL</td>
          <td class="text-right">
            <v-btn
              class="ms-2"
              variant="outlined"
              size="small"
            >
              View
            </v-btn>
            <v-btn
              class="ms-2"
              variant="outlined"
              size="small"
            >
              Edit
              <v-dialog
                v-model="editDialog[n]"
                activator="parent"
                scrollable
                width="auto"
              >
                <v-card>
                  <v-card-title>Select Role</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-radio-group
                      v-model="dialogm1"
                      column
                    >
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
                      @click="editDialog[n] = false"
                    >
                      Save
                    </v-btn>
                    <v-btn
                      color="black"
                      variant="text"
                      @click="editDialog[n] = false"
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
                v-model="disableDialog[n]"
                activator="parent"
                width="auto"
              >
                <v-card>
                  <v-card-text>
                    Are you sure you want to disable course TITLE?
                  </v-card-text>
                  <v-card-actions
                    class="d-flex justify-center align-center pb-4"
                  >
                    <v-btn
                      color="red"
                      variant="outlined"
                      >Yes</v-btn
                    >
                    <v-btn
                      color="black"
                      variant="outlined"
                      @click="disableDialog[n] = false"
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
                v-model="deleteDialog[n]"
                activator="parent"
                width="auto"
              >
                <v-card>
                  <v-card-text>
                    Are you sure you want to delete USER?
                  </v-card-text>
                  <v-card-actions
                    class="d-flex justify-center align-center pb-4"
                  >
                    <v-btn
                      color="red"
                      variant="outlined"
                      >Yes</v-btn
                    >
                    <v-btn
                      color="black"
                      variant="outlined"
                      @click="deleteDialog[n] = false"
                      >No</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
