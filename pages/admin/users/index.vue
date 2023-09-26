<template>
  <div>
    <h1 class="mb-4">Admin Panel - Users</h1>
    <v-text-field
      v-model="searchQuery"
      clearable
      label="Search"
      type="text"
      variant="outlined"
    >
      <template #prepend>
        <v-tooltip location="bottom"> Filter users </v-tooltip>
      </template>
    </v-text-field>

    <div>
      <v-table fixed-header>
        <thead>
          <tr>
            <!-- <th class="text-left">Profile Picture</th> -->
            <th class="text-left">User Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">First Name</th>
            <th class="text-left">Last Name</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.uid"
          >
            <!-- <td>
              <v-avatar
                class="ma-2"
                color="grey-darken-1"
                size="large"
              >
                <span class="text-h6">{{ user?.username[0] }}</span>
              </v-avatar>
            </td> -->
            <td>
              <span v-if="!editDialog[user?.uid]">{{ user?.username }}</span>
              <v-text-field
                v-else
                v-model="user.username"
                label="Username"
                variant="outlined"
                density="compact"
                autofocus
              ></v-text-field>
            </td>
            <td>
              <span v-if="!editDialog[user?.uid]">{{ user?.email }}</span>
              <v-text-field
                v-else
                v-model="user.email"
                label="Email"
                variant="outlined"
                density="compact"
                autofocus
              ></v-text-field>
            </td>
            <td>
              <span v-if="!editDialog[user?.uid]">{{ user?.firstName }}</span>
              <v-text-field
                v-else
                v-model="user.firstName"
                label="First Name"
                variant="outlined"
                density="compact"
                autofocus
              ></v-text-field>
            </td>
            <td>
              <span v-if="!editDialog[user?.uid]">{{ user?.lastName }}</span>
              <v-text-field
                v-else
                v-model="user.lastName"
                label="Last Name"
                variant="outlined"
                density="compact"
                autofocus
              ></v-text-field>
            </td>

            <td class="text-right">
              <v-btn
                class="ms-2"
                variant="outlined"
                size="small"
                :color="editDialog[user?.uid] ? 'success' : ''"
                @click="toggleEditDialog(user?.uid)"
              >
                {{ editDialog[user?.uid] ? "Save" : "Edit" }}
              </v-btn>

              <v-btn
                class="ms-2"
                variant="outlined"
                size="small"
                color="red"
                @click="confirmDeleteUser(user?.uid)"
              >
                Delete
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue"
import {
  fetchAllUsers,
  fetchUser,
  updateUser,
  deleteUser,
} from "../../../utils/user-helpers" // Import your user-related functions

export default {
  setup() {
    const editDialog = ref({})
    const searchQuery = ref("")
    const users = ref([])

    const toggleEditDialog = (userId) => {
      editDialog.value[userId] = !editDialog.value[userId]
    }
    const handleEdit = async (user) => {
      if (editDialog.value[user.uid]) {
        // Save changes
        try {
          await updateUser(user.uid, {
            // Update user properties
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          })
          toggleEditDialog(user.uid) // Toggle edit mode off
        } catch (e) {
          console.error("Error updating user:", e)
        }
      } else {
        // Enter edit mode
        toggleEditDialog(user.uid)
      }
    }

    const confirmDeleteUser = async (userId) => {
      try {
        await deleteUser(userId) // Call the deleteUser function
        users.value = users.value.filter((user) => user.uid !== userId) // Remove the user from the local list
      } catch (e) {
        console.error("Error deleting user:", e)
      }
    }
    const filteredUsers = computed(() => {
      const query = searchQuery.value.trim().toLowerCase()
      if (query === "") {
        return users?.value
      } else {
        return users?.value.filter(
          (user) =>
            user.username.toLowerCase().includes(query) ||
            user.firstName.toLowerCase().includes(query) ||
            user.lastName.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query),
        )
      }
    })

    onMounted(async () => {
      try {
        const response = await fetchAllUsers()
        if (response.ok) {
          const userData = await response.json() // Parse the JSON response
          console.log(userData) // Log the user data
          users.value = userData
        } else {
          console.warn("No user data found in the response.")
        }
      } catch (e) {
        console.error("Error fetching user data:", e)
      }
    })

    return {
      editDialog,
      searchQuery,
      users,
      toggleEditDialog,
      confirmDeleteUser,
      filteredUsers,
    }
  },
}
</script>
