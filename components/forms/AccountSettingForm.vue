<template>
  <v-card width="40%">
    <form>
      <v-card-title class="text-h5"> Account Settings </v-card-title>
      
      <!-- Additional form fields for account settings -->
      <v-text-field v-model="userData.name" label="Full Name"></v-text-field>
      <v-text-field v-model="userData.email" label="Email"></v-text-field>
      <v-text-field v-model="userData.username" label="Username"></v-text-field>
      <v-text-field v-model="currentPassword" label="Current Password" type="password"></v-text-field>
      <v-text-field v-model="newPassword" label="New Password" type="password"></v-text-field>
      <v-text-field v-model="confirmPassword" label="Confirm New Password" type="password"></v-text-field>
      
      <p class="error-message">{{ errorMessage }}</p>
      
      <v-card color="grey-lighten-3">
        <v-container>
          <v-row justify="end">
            <v-btn class="text-capitalize" variant="text" @click="closeDialog"> Cancel </v-btn>
            <v-btn class="text-capitalize" color="blue-darken-2" @click="saveChanges"> Save Changes </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </form>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue"

const props = defineProps(["userData", "saveChangesCallback"])

const currentPassword = ref("")
const newPassword = ref("")
const confirmPassword = ref("")
const errorMessage = ref("")

const closeDialog = () => {
  currentPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
  errorMessage.value = "";
  props.saveChangesCallback(null); // Passing null to indicate cancel
}

const saveChanges = () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match";
    return;
  }
  
  // Clear the error message if passwords match
  errorMessage.value = "";

  const updatedUserData = { ...props.userData, newPassword: newPassword.value }
  props.saveChangesCallback(updatedUserData);
}
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
