<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <AccountSetting
          :userData="userData"
          :updatePasswordCallback="updatePasswordCallback"
        />
      </v-col>
      <v-col cols="6">
        <v-dialog v-model="editAccountDialog">
          <v-container fluid>
            <v-row justify="center">
              <FormAccountSettingForm
                :userData="userData"
                :saveChangesCallback="updatePasswordCallback"
              />
            </v-row>
          </v-container>
        </v-dialog>
        <v-alert
          v-model="accountUpdatedAlert"
          type="success"
          density="compact"
          title="Account Updated"
          rounded="0"
          closable
          text="Your account settings have been updated."
        ></v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue"

interface UserData {
  id: number
  name: string
  email: string
  gender: string
  // Add profilePicture field
  profilePicture: File | null
}

const editAccountDialog = ref(false)
const accountUpdatedAlert = ref(false)
const userData = ref<UserData>({
  id: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  gender: "Male",
  profilePicture: null, // Initialize profile picture
})

const updatePasswordCallback = (updatedUserData: UserData | null) => {
  if (updatedUserData !== null) {
    userData.value = updatedUserData
    accountUpdatedAlert.value = true
  }
  editAccountDialog.value = false
}
</script>
