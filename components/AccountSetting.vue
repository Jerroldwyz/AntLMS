<template>
  <v-card 
    height="100%"
    :elevation="2" 
    rounded="lg"
  > 
    <v-card-item>
      <v-card-title class="text-center"> 
        Account Settings
      </v-card-title>
    </v-card-item>
    
    <!-- Additional sections for account settings (e.g., change password, update profile, etc.) -->
    <v-divider></v-divider>
    <v-card-text>
      <v-subheader>Profile Information</v-subheader>
      <v-text-field v-model="props.userData.name" label="Full Name"></v-text-field>
      <v-text-field v-model="props.userData.email" label="Email"></v-text-field>
      <v-text-field v-model="props.userData.username" label="Username"></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-subheader>Change Password</v-subheader>
      <!-- Include password fields here if needed -->
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

interface UserData {
  name: string;
  email: string;
  username: string;
}

const props = defineProps<{
  userData: UserData;
</script>
