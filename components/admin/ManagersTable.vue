<script setup lang="ts">
const props = defineProps(["managers"])

const managers = props.managers
const managerList = ref(managers)

const deleteManagerList = (managerUidToDelete: string) => {
  managerList.value = managerList.value.filter(
    (manager: any) => manager.uid !== managerUidToDelete,
  )
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
          @delete:managerList="deleteManagerList"
        >
        </AdminManagersTableItem>
      </tbody>
    </v-table>
  </div>
</template>
