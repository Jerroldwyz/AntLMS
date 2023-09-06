<!-- AccountSetting.vue -->

<template>
  <v-card width="80%">
    <form>
      <v-card-title class="text-h5"> Account Settings </v-card-title>

      <!-- Additional form fields for account settings -->
      <v-text-field
        v-model="userData.id"
        label="ID"
        disabled
      ></v-text-field>
      <v-text-field
        v-model="userData.name"
        label="Full Name"
      ></v-text-field>
      <v-text-field
        v-model="userData.email"
        label="Email"
        disabled
      ></v-text-field>
      <v-select
        v-model="userData.gender"
        :items="['Male', 'Female', 'Other']"
        label="Gender"
      ></v-select>

      <!-- Add a new input field for profile picture -->
      <v-file-input
        v-model="profilePicture"
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
const props = defineProps(["userData", "updatePasswordCallback"])

const currentPassword = ref("")
const newPassword = ref("")
const confirmPassword = ref("")
const errorMessage = ref("")
const profilePicture = ref([] as File[]) // Initialize as an empty array of Files

const closeDialog = () => {
  currentPassword.value = ""
  newPassword.value = ""
  confirmPassword.value = ""
  errorMessage.value = ""
  profilePicture.value = [] // Reset the profile picture selection
  props.updatePasswordCallback(null) // Passing null to indicate cancel
}

const saveChanges = () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match"
    return
  }

  if (currentPassword.value === "") {
    errorMessage.value = "Please provide your current password"
    return
  }

  // Here, you can add a check to validate the current password
  // If the current password is correct, proceed with the update

  // Clear the error message if everything is valid
  errorMessage.value = ""

  const updatedUserData = {
    ...props.userData,
    profilePicture:
      profilePicture.value.length > 0 ? profilePicture.value[0] : null, // Update with the new profile picture
    newPassword: newPassword.value,
  }
  props.updatePasswordCallback(updatedUserData)
}
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
