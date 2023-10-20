<script>
import {
  fetchAllUsers,
  fetchUser,
  updateUser as updateUserInHelpers,
  deleteUser,
} from "~~/utils/user-helpers"

definePageMeta({
  layout: "admin",
})

export default {
  setup() {
    const editDialog = ref({})
    const searchQuery = ref("")
    const users = ref([])

    const toggleEditDialog = (userId) => {
      editDialog.value[userId] = !editDialog.value[userId]
    }

    const updateUserInDatabase = async (user) => {
      try {
        console.log("Updating user:", user) // Debugging line

        const userId = user.uid // Get the user's ID try

        const updatedUserData = {
          uid: user.uid,
          email: user.email,
          name: user.name,
          // lastName: user.lastName,
        }

        await updateUserInHelpers(userId, updatedUserData) // Call the updateUser function
        editDialog.value[userId] = false // Close the edit dialog
      } catch (e) {
        console.error("Error updating user:", e)
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
        const filtered = users?.value.filter((user) => {
          const lowerCaseUsername = user.uid ? user.uid.toLowerCase() : ""
          const lowerCaseFullName = user.name ? user.name.toLowerCase() : ""
          // const lowerCaseLastName = user.name ? user.name.toLowerCase() : ""
          const lowerCaseEmail = user.email ? user.email.toLowerCase() : ""

          return (
            lowerCaseUsername.includes(query) ||
            lowerCaseFullName.includes(query) ||
            // lowerCaseLastName.includes(query) ||
            lowerCaseEmail.includes(query)
          )
        })
        return filtered
      }
    })

    onMounted(async () => {
      try {
        const response = await fetchAllUsers()
        if (response.ok) {
          const userData = await response.json() // Parse the JSON response
          users.value = userData
        } else {
          console.warn("Request failed with status:", response.status)
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
      updateUserInDatabase,
    }
  },
}
</script>

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
            <th class="text-left">Full Name</th>

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
              <span v-if="!editDialog[user?.uid]">{{ user?.uid }}</span>
              <v-text-field
                v-else
                v-model="user.uid"
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
              <span v-if="!editDialog[user?.uid]">{{ user?.name }}</span>
              <v-text-field
                v-else
                v-model="user.name"
                label="Full Name"
                variant="outlined"
                density="compact"
                autofocus
              ></v-text-field>
            </td>
            <!-- <td>
              <span v-if="!editDialog[user?.uid]">{{ user?.lastName }}</span>
              <v-text-field
                v-else
                v-model="user.lastName"
                label="Last Name"
                variant="outlined"
                density="compact"
                autofocus
              ></v-text-field>
            </td> -->

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
