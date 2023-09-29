<script setup lang="ts">
const managers = await getManagers()
const availableRoles = await getRoles()

// This is required for computed property to work
const reactiveElements = reactive({
  searchString: "",
  managerList: managers,
})

const { searchString, managerList } = toRefs(reactiveElements)

const filteredManagerList = computed(() => {
  if (searchString.value === "") {
    return managerList.value
  } else {
    return managerList.value.filter(
      (manager: any) =>
        manager.name.toLowerCase().includes(searchString.value.toLowerCase()) ||
        manager.email
          .toLowerCase()
          .includes(searchString.value.toLowerCase()) ||
        manager.roles[0]?.name
          .toLowerCase()
          .includes(searchString.value.toLowerCase()),
    )
  }
})

const newDialogue = ref(false)
const newManagerName = ref("")
const newManagerEmail = ref("")
const newManagerRole = ref(-1)
const valid = ref(false)

const updateManager = async () => {
  managerList.value = await getManagers()
}

const createNewManager = async () => {
  if (valid.value) {
    const role = availableRoles.value.find(
      (role: any) => role.name === newManagerRole.value,
    )
    if (role !== undefined) {
      await createManager(newManagerName.value, newManagerEmail.value, role.id)
    } else {
      await createManager(newManagerName.value, newManagerEmail.value)
    }
    await updateManager()
    newDialogue.value = false
  }
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
            @submit.prevent="createNewManager"
          >
            <v-card-title>Create new Manager</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-text-field
                  v-model:model-value="newManagerName"
                  label="Name"
                  class="mx-4 mt-4"
                  :rules="[(v: string) => !!v || 'Name is required']"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <FormEmailInput
                  v-model:email="newManagerEmail"
                  label="Email"
                  class="mx-4 mt-4"
                ></FormEmailInput>
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
          @delete:manager="updateManager"
          @update:manager="updateManager"
        >
        </AdminManagersTableItem>
      </tbody>
    </v-table>
  </div>
</template>
