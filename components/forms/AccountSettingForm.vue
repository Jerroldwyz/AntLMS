<template>
    <v-card width="40%">
      <form>
        <v-card-title class="text-h5"> Account Settings </v-card-title>
        
        <!-- Additional form fields for account settings -->
        <v-text-field v-model="userData.name" label="Full Name"></v-text-field>
        <v-text-field v-model="userData.email" label="Email"></v-text-field>
        <v-text-field v-model="userData.username" label="Username"></v-text-field>
        <v-text-field v-model="newPassword" label="New Password" type="password"></v-text-field>
        <v-text-field v-model="confirmPassword" label="Confirm New Password" type="password"></v-text-field>
        
        <v-card color="grey-lighten-3">
          <v-container>
            <v-row justify="end">
              <v-btn class="text-capitalize" variant="text" @click="$emit('close')"> Cancel </v-btn>
              <v-btn class="text-capitalize" color="blue-darken-2" @click="saveChanges"> Save Changes </v-btn>
            </v-row>
          </v-container>
        </v-card>
      </form>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from "vue"
  
  const props = defineProps(["userData", "saveChanges"])
  const newPassword = ref("")
  const confirmPassword = ref("")
  
  const saveChanges = () => {
    if (newPassword !== confirmPassword) {
      // Show an error message or handle password mismatch
      return
    }
  
    const updatedUserData = { ...props.userData, newPassword }
    props.saveChanges(updatedUserData)
  }
  </script>
  