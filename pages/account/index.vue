<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <AccountSetting :userData="userData" />
      </v-col>
      <v-col cols="6">
        <v-dialog v-model="editAccountDialog">
          <v-container fluid>
            <v-row justify="center">
              <AccountSettingForm
                :userData="userData"
                :saveChanges="handleAccountSuccess"
                @close="editAccountDialog = false"
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
import AccountSetting from "././components/AccountSetting.vue"
import AccountSettingForm from "././components/AccountSettingForm.vue"

const editAccountDialog = ref(false)
const accountUpdatedAlert = ref(false)
const userData = ref({
  name: "John Doe",
  email: "johndoe@example.com",
  username: "johndoe123"
})

const handleAccountSuccess = (updatedUserData: userData) => {
  // Update the user data with the updatedUserData
  userData.value = updatedUserData
  accountUpdatedAlert.value = true
}
</script>
