<script setup lang="ts">
const managers = await getManagers()
const availableRoles = await getRoles()

let managerList = toRaw(managers.value)
// TODO I would rather use computed value here but it does not want to work lol
const filteredManagerList = ref(managerList)

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
          <th class="text-left">User Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Role</th>
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
