<!-- AccountSettingForm.vue -->

<template>
  <v-card width="90%">
    <form>
      <v-card-title class="text-h5"> Account Settings </v-card-title>

      <v-text-field
        v-model="newUserData.id"
        label="ID"
        disabled
      ></v-text-field>
      <v-text-field
        v-model="newUserData.name"
        label="Full Name"
      ></v-text-field>
      <v-select
        v-model="newUserData.gender"
        :items="['Male', 'Female', 'Other']"
        label="Gender"
      ></v-select>

      <!-- profile picture -->
      <v-file-input
        v-model="newProfilePicture"
        label="Profile Picture"
        accept="image/*"
      ></v-file-input>

      <v-text-field
        v-model="currentPassword"
        label="Current Password"
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="newPassword"
        label="New Password"
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        label="Confirm New Password"
        type="password"
      ></v-text-field>

      <p class="error-message">{{ errorMessage }}</p>

      <v-card color="grey-lighten-3">
        <v-container>
          <v-row justify="end">
            <v-btn
              class="text-capitalize"
              variant="text"
              @click="closeDialog"
            >
              Cancel
            </v-btn>
            <v-btn
              class="text-capitalize"
              color="blue-darken-2"
              @click="saveChanges"
            >
              Save Changes
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </form>
  </v-card>
</template>

<script setup lang="ts">
import { UserData } from "~/types"

const props = defineProps(["userData", "saveChangesCallback"])

const newUserData: UserData = props.userData

const currentPassword = ref("")
const newPassword = ref("")
const confirmPassword = ref("")
const errorMessage = ref("")
const newProfilePicture = ref([] as File[]) // Initialize as an empty array

const closeDialog = () => {
  currentPassword.value = ""
  newPassword.value = ""
  confirmPassword.value = ""
  errorMessage.value = ""
  newProfilePicture.value = [] // Reset the new profile picture selection
  props.saveChangesCallback(null) // Passing null to indicate cancel
}

const saveChanges = () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match"
    return
  }

  // Clear the error message if everything is valid
  errorMessage.value = ""

  const updatedUserData = {
    ...newUserData,
    profilePicture: newProfilePicture.value, // Use the new profile picture
    newPassword: newPassword.value,
  }
  props.saveChangesCallback(updatedUserData)
}

// Watch for changes in the newProfilePicture and reset the error message
onMounted(() => {
  watch(newProfilePicture, () => {
    errorMessage.value = ""
  })
})
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
