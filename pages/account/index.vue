<!-- Index.vue -->

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <AccountSetting
          :user-data="userData"
          :update-password-callback="updatePasswordCallback"
        />
      </v-col>
      <v-col cols="6">
        <v-dialog v-model="editAccountDialog">
          <v-container fluid>
            <v-row justify="center">
              <FormAccountSettingForm
                :user-data="userData"
                :save-changes-callback="updatePasswordCallback"
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

        <!-- Display the profile picture on the right side -->
        <div class="profile-picture-container">
          <img
            v-if="profilePictureUrl !== null"
            :src="profilePictureUrl"
            alt="Profile Picture"
            class="profile-picture"
          />
          <img
            v-else
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/1200px-Anonymous_emblem.svg.png"
            alt="Default Profile Picture"
            class="default-profile-picture"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { UserData } from "~/types"
const authStore = useAuthStore()

if (authStore.isAdmin) setPageLayout("admin")
else setPageLayout("default")

definePageMeta({
  middleware: ["user"],
  layout: false,
})

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

const profilePictureUrl = computed(() => {
  // Generate a data URL from the profile picture File object
  if (userData.value.profilePicture) {
    const reader = new FileReader()
    reader.readAsDataURL(userData.value.profilePicture)
    return reader.result as string
  }
  return null
})
</script>

<style scoped>
/* Container styles */

.v-container {
  padding: 20px;
}

/* Card styles */
.v-card {
  width: 100%; /* Increase the width to make the form wider */
  max-width: 800px; /* Adjust the max-width if needed */
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

/* Card title styles */
.text-h5 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

/* Form input styles */
.v-text-field,
.v-select,
.v-file-input {
  width: 100%;
  margin-bottom: 20px;
}

/* Error message styles */
.error-message {
  color: red;
  margin-top: 10px;
}

/* Profile picture container styles */
.profile-picture-container {
  text-align: center;
  margin-top: 20px;
}

/* Profile picture styles */
.profile-picture,
.default-profile-picture {
  max-width: 100%;
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

/* Default profile picture styles */
.default-profile-picture {
  opacity: 0.7;
}

/* Button styles */
.text-capitalize {
  text-transform: capitalize;
}

/* Success alert styles */
.v-alert[type="success"] {
  background-color: #dff0d8;
  color: #3c763d;
  border-color: #d6e9c6;
  margin-bottom: 20px;
}

/* Close button on success alert */
.v-alert .v-btn {
  color: #3c763d;
}
/* Profile picture styles with circular frame */
.profile-picture {
  max-width: 100%;
  width: 50px;
  height: 50px;
  border-radius: 50%; /* Creates a circular frame */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}
</style>
