<script setup lang="ts">
const managers = await getManagers()
const availableRoles = await getRoles()

let managerList = toRaw(managers.value)
// TODO I would rather use computed value here but it does not want to work lol
const filteredManagerList = ref(managerList)

const newDialogue = ref(false)
const newManagerName = ref("")
const newManagerEmail = ref("")
const newManagerRole = ref(-1)

const updateSearch = (searchString: string) => {
  if (searchString === "") {
    filteredManagerList.value = managerList
  } else {
    filteredManagerList.value = managerList.filter(
      (manager: any) =>
        manager.name.toLowerCase().includes(searchString.toLowerCase()) ||
        manager.email.toLowerCase().includes(searchString.toLowerCase()) ||
        manager.roles[0]?.name
          .toLowerCase()
          .includes(searchString.toLowerCase()),
    )
  }
}

const deleteManager = (managerUidToDelete: string) => {
  managerList = managerList.filter(
    (manager: any) => manager.uid !== managerUidToDelete,
  )
}

const updateManager = (modifiedManager: any) => {
  const managerToUpdate = managerList.findIndex(
    (manager: any) => manager.uid === modifiedManager.uid,
  )
  managerList[managerToUpdate] = modifiedManager
}

const createNewManager = () => {
  const role = availableRoles.value.find(
    (role: any) => role.name === newManagerRole.value,
  )
  createManager(newManagerName.value, newManagerEmail.value, role.id)
  newDialogue.value = false
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
          <v-card-title>Create new Manager</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-text-field
                v-model:model-value="newManagerName"
                label="Name"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model:model-value="newManagerEmail"
                label="Email"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-radio-group v-model="newManagerRole">
                <v-radio
                  v-for="role in availableRoles"
                  :key="role.id"
                  :label="role.name"
                  :value="role.name"
                >
                </v-radio>
              </v-radio-group>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="createNewManager"
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
          <th class="text-left">User Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Manager</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <AdminManagersTableItem
          v-for="manager in filteredManagerList"
          :key="manager.uid"
          :manager="manager"
          :available-roles="availableRoles"
          @delete:manager="deleteManager"
          @update:manager="updateManager"
        >
        </AdminManagersTableItem>
      </tbody>
    </v-table>
  </div>
</template>
