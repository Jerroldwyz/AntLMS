<script setup>
const props = defineProps(["managers"])

const managers = props.managers
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
          v-for="manager in managers"
          :key="manager.id"
          :manager="manager"
        >
        </AdminManagersTableItem>
      </tbody>
    </v-table>
  </div>
</template>
