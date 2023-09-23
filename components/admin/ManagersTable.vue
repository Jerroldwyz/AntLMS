<script setup lang="ts">
const managers = await getManagers()
const availableRoles = await getRoles()

const managerList = ref(managers)

const deleteManager = (managerUidToDelete: string) => {
  managerList.value = managerList.value.filter(
    (manager: any) => manager.uid !== managerUidToDelete,
  )
}

const updateManager = (modifiedManager: any) => {
  const managerToUpdate = managerList.value.findIndex(
    (manager: any) => manager.uid === modifiedManager.uid,
  )
  managerList.value[managerToUpdate] = modifiedManager
}
</script>

<template>
  <div>
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
          v-for="manager in managerList"
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
