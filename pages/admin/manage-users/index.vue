<template>
  <h1 class="mb-4">Admin Panel - Users</h1>
  <v-text-field
    clearable
    label="Search"
    type="text"
    variant="outlined"
  >
    <template v-slot:prepend>
      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <v-icon
            v-bind="props"
            icon="mdi-help-circle-outline"
          ></v-icon>
        </template>
        Filter users
      </v-tooltip>
    </template>
  </v-text-field>

  <div>
    <v-table fixed-header>
      <thead>
        <tr>
          <th class="text-left">Profile Picture</th>
          <th class="text-left">User Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">First Name</th>
          <th class="text-left">Last Name</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td>
            <v-avatar
              class="ma-2"
              color="grey-darken-1"
              size="large"
            >
              <span class="text-h6">{{ user.username[0] }}</span>
            </v-avatar>
          </td>
          <td>
            <span v-if="!editDialog[user.id]">{{ user.username }}</span>
            <v-text-field
              v-else
              v-model="user.username"
              label="Username"
              outlined
              dense
              autofocus
            ></v-text-field>
          </td>
          <td>
            <span v-if="!editDialog[user.id]">{{ user.email }}</span>
            <v-text-field
              v-else
              v-model="user.email"
              label="Email"
              outlined
              dense
              autofocus
            ></v-text-field>
          </td>
          <td>
            <span v-if="!editDialog[user.id]">{{ user.firstName }}</span>
            <v-text-field
              v-else
              v-model="user.firstName"
              label="First Name"
              outlined
              dense
              autofocus
            ></v-text-field>
          </td>
          <td>
            <span v-if="!editDialog[user.id]">{{ user.lastName }}</span>
            <v-text-field
              v-else
              v-model="user.lastName"
              label="Last Name"
              outlined
              dense
              autofocus
            ></v-text-field>
          </td>

          <td class="text-right">
            <v-btn
              class="ms-2"
              variant="outlined"
              size="small"
              @click="toggleEditDialog(user.id)"
              :color="editDialog[user.id] ? 'success' : ''"
            >
              {{ editDialog[user.id] ? "Save" : "Edit" }}
            </v-btn>

            <v-btn
              class="ms-2"
              variant="outlined"
              size="small"
              @click="confirmDeleteUser(user)"
              color="red"
            >
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  setup() {
    const editDialog = ref({})
    const users = [
      {
        id: 1,
        username: "user1",
        email: "user1@example.com",
        firstName: "John",
        lastName: "Doe",
        // ... other user properties ...
      },
      // Add more user objects from api
      {
        id: 2,
        username: "user2",
        email: "user2@example.com",
        firstName: "James",
        lastName: "Smith",
        // ... other user properties ...
      },
    ]

    const toggleEditDialog = (userId) => {
      editDialog.value[userId] = !editDialog.value[userId]
    }

    const confirmDeleteUser = (user) => {
      if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
        // Implement the delete logic here (e.g., remove the user from the users array)
        // You can also make an API call to delete the user on the server.
        // After deleting the user, you may want to update the UI accordingly.
        const index = users.indexOf(user)
        if (index !== -1) {
          users.splice(index, 1) // Remove the user from the array
        }
      }
    }

    return {
      editDialog,
      users,
      toggleEditDialog,
      confirmDeleteUser,
    }
  },
}
</script>
